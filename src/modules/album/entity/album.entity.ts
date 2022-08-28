import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ArtistEntity } from 'src/modules/artist/entity/artist.entity';

@Entity('album')

export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;
}