import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaforitesEntity } from '../entity/favorite.entity';
import { AlbumService } from 'src/modules/album/service/album.service';
import { ArtistService } from 'src/modules/artist/service/artist.service';
import { TrackService } from 'src/modules/track/service/track.service';

@Injectable()
export class FavoritesService {

  constructor(
    @InjectRepository(FaforitesEntity)
    private readonly favoritiesRepository: Repository<FaforitesEntity>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) { }

  public async getFavorites() {
    const favorites = await this.favoritiesRepository.find();

    const artistsIds = favorites.filter(favorite => favorite.type === 'artist').map(favorite => favorite.typeId);
    const artists = (await this.artistService.getArtists()).filter(artist => artistsIds.includes(artist.id));

    const albumsIds = favorites.filter(favorite => favorite.type === 'album').map(favorite => favorite.typeId);
    const albums = (await this.albumService.getAlbums()).filter(album => albumsIds.includes(album.id));

    const tracksIds = favorites.filter(favorite => favorite.type === 'track').map(favorite => favorite.typeId);
    const tracks = (await this.trackService.getTracks()).filter(track => tracksIds.includes(track.id));

    return { artists, albums, tracks };
  }

  public async addFavorite(type: string, id: string) {
    if (type === 'artist') {
      const artist = (await this.artistService.getArtists()).find(artist => artist.id === id);
      if (!artist) throw new UnprocessableEntityException(`Artist with id ${id} not found`);
      await this.favoritiesRepository.save({ type: 'artist', typeId: artist.id });
      return artist
    }

    if (type === 'album') {
      const album = (await this.albumService.getAlbums()).find(album => album.id === id);
      if (!album) throw new UnprocessableEntityException(`Album with id ${id} not found`);
      await this.favoritiesRepository.save({ type: 'album', typeId: album.id });
      return album;
    }

    if (type === 'track') {
      const track = (await this.trackService.getTracks()).find(track => track.id === id);
      if (!track) throw new UnprocessableEntityException(`Track with id ${id} not found`);
      await this.favoritiesRepository.save({ type: 'track', typeId: track.id });
      return track;
    }
  }

  public async deleteFavorite(type: string, id: string): Promise<void> {

    if (type === 'artist') {
      const currentArtist = await this.favoritiesRepository.findOneBy({ typeId: id });
      if (!currentArtist) throw new UnprocessableEntityException(`Artist with ${id} not found`);
      await this.favoritiesRepository.remove(currentArtist);
    }

    if (type === 'album') {
      const currentAlbum = await this.favoritiesRepository.findOneBy({ typeId: id });
      if (!currentAlbum) throw new UnprocessableEntityException(`Album with ${id} not found`);
      await this.favoritiesRepository.remove(currentAlbum);
    }

    if (type === 'track') {
      const currentTrack = await this.favoritiesRepository.findOneBy({ typeId: id });
      if (!currentTrack) throw new UnprocessableEntityException(`Track with ${id} not found`);
      await this.favoritiesRepository.remove(currentTrack);
    }
  }
}