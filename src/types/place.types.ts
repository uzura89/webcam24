export type PlaceType = {
  id: string;
  youtubeVideoId: string;
  categoryId: string;
  description: string;
  addressSpot: string;
  addressRegion: string;
  addressCountry: string;
  locationLng: number;
  locationLat: number;
  gmtOffset: number;
  hasAmbientSound: boolean;
};

export type LocationType = {
  lng: number;
  lat: number;
};

/**
 * Data Formatter
 */

export const getLocationFromPlace = (place: PlaceType): LocationType => {
  return {
    lng: place.locationLng,
    lat: place.locationLat,
  };
};
