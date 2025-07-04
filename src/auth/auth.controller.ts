import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from '../users/role.enum';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        return this.authService.login(user);
    }

    @Post('google')
    async googleLogin(@Body() body: { email: string; username: string }) {
        // Buscar usuario por email
        let user = await this.usersService.findByEmail(body.email);
        if (!user) {
            // Crear usuario con rol client y password aleatorio
            user = await this.usersService.create({
                email: body.email,
                username: body.username,
                password: Math.random().toString(36).slice(-8) + Date.now(),
                role: Role.CLIENT,
            });
        }
        return this.authService.login(user);
    }
}
