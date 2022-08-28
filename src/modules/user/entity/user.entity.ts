import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity('user')

export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn({default: 1})
  version: number;
  
  @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP()" })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP()" })
  updatedAt: number;

  toResponse() {
    const { id, login, createdAt, updatedAt, version } = this;
    return { id, login, createdAt: +new Date(createdAt), updatedAt: +updatedAt, version };
  }
}