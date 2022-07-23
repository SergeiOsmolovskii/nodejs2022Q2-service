import { IAlbum } from "../album/album.interface";
import { ITrack } from "../track/track.interface";

export interface IFavoritesIds {
  artistsIds: string[];
  albumsIds: string[];
  tracksIds: string[];
}

export interface IFavorites {
  // artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
