import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
    const app = await NestFactory.create(SeederModule);
    const seeder = app.get(SeederService)
    await seeder.onModuleInit(); // <-- Esto borra y sincroniza la base de datos
    await seeder.seed()
    await app.close()
}
bootstrap();
