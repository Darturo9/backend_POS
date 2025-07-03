import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  number: string;

  @ManyToOne(() => User, (user) => user.phones, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;
}
