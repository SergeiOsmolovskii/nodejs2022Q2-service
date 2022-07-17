import { IAlbum } from "../album/album.interface";
import { IArtist } from "../artist/artist.interface";
import { ITrack } from "../track/track.interface";

export interface IFavoritesIds {
  artistsIds: string[];
  albumsIds: string[];
  tracksIds: string[];
}

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
