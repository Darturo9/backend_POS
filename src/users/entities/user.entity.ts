import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../role.enum';
import { Address } from '../../addresses/entities/address.entity';
import { Phone } from '../../phones/entities/phone.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 20 })
  role: Role;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  @OneToMany(() => Phone, (phone) => phone.user, { cascade: true })
  phones: Phone[];
}
