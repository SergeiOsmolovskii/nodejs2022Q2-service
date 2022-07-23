import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { ArtistEntity } from 'src/modules/artist/entity/artist.entity';
import { AlbumEntity } from 'src/modules/album/entity/album.entity';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  album: AlbumEntity;
}
