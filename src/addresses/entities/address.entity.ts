import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 60 })
  city: string;

  @Column({ length: 20 })
  postalCode: string;

  @Column({ length: 60 })
  country: string;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;
}
