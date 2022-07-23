import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('user')

export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // login: string;

  // @Column()
  // password: string;

  // @Column()
  // version: number;

  // @Column({ type: 'bigint', nullable: true })
  // test: number;
  
  // @Column({ type: 'bigint', nullable: true })
  // created: number;

  // @Column({ type: 'bigint', nullable: true })
  // updatedAt: number;

  // toResponse(): IUser {
  //   const { id, login, createdAt, updatedAt, version } = this;
  //   return { id, login, createdAt, updatedAt, version };
  // }
}