import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('favorite')
export class FaforitesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  typeId: string;
}