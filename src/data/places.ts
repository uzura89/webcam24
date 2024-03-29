/**
 * Categories
 */

export const CATEGORY_NATURE = "nature";
export const CATEGORY_CITY = "city";

export const categories = [
  {
    id: CATEGORY_NATURE,
    name: "Nature",
  },
  {
    id: CATEGORY_CITY,
    name: "City",
  },
];

/**
 * Places
 */

// nature
const PLACE_ID_NAMIB_DESERT_WATERHOLE = "namib-desert-waterhole";
const PLACE_ID_DANISH_FOREST = "danish-forest";
const PLACE_ID_INTERNATIONAL_SPACE_STATION = "international-space-station";
const PLACE_ID_NEFL_EAGLE_NEST = "nefl-eagle-nest";
const PLACE_ID_CYULU_HILLS_WATERHOLE = "ol-donyo-lodge-waterhole";
const PLACE_ID_NORTHERN_LIGHTS_CHURCHILL = "northern-lights-churchill";
const PLACE_ID_KENYA_OL_JOGI_WATERHOLE = "kenya-ol-jogi-waterhole";
const PLACE_ID_GORILLA_FOREST_CORRIDOR_KASUGHO =
  "gorilla-forest-corridor-kasugho";
const PLACE_ID_FAIRBANKS_AURORA = "fairbanks-aurora";

// city
const PLACE_ID_TIMES_SQUARE = "times-square";
const PLACE_ID_SHIBUYA_SCRAMBLE_CROSSING = "shibuya-scramble-crossing";
const PLACE_ID_SHINJUKU_KABUKICHO = "shinjuku-kabukicho";
const PLACE_ID_BANGKOK_SUKHUMVIT_ROAD = "bangkok-sukhumvit-road";
const PLACE_ID_ST_PETERSBURG_NEVSKY_AVENUE = "st-petersburg-nevsky-avenue";
const PLACE_ID_KOH_SAMUI_HOOTERS = "koh-samui-hooters";
const PLACE_ID_VENICE_BEACH = "venice-beach";
const PLACE_ID_HEATHROW_AIRPORT = "heathrow-airport";
const PLACE_ID_BIG_BUDDHA_BEACH = "big-buddha-beach";
const PLACE_ID_MICHIGAN_PORT_HURON = "michigan-port-huron";
const PLACE_ID_SHINJUKU_CROSSINGS = "shinjuku-crossings";
const PLACE_ID_NEWYORK_UPPER_EAST_SIDE = "newyork-upper-east-side";
const PLACE_ID_BICYCLE_CROSSING_AMSTERDAM = "bicycle-crossing-amsterdam";

export const places = [
  {
    id: PLACE_ID_NAMIB_DESERT_WATERHOLE,
    youtubeVideoId: "ydYDqZQpim8",
    categoryId: CATEGORY_NATURE,
    description: "Waterhole in the Namib Desert",
    addressSpot: "Namib Desert Waterhole",
    addressRegion: "Namib Desert",
    addressCountry: "Namibia",
    locationLng: 15.9129,
    locationLat: -24.7499,
    gmtOffset: 2,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_TIMES_SQUARE,
    youtubeVideoId: "2E22geZeZDA",
    categoryId: CATEGORY_CITY,
    description: "Times Square in New York",
    addressSpot: "Times Square",
    addressRegion: "New York",
    addressCountry: "USA",
    locationLng: -73.9851,
    locationLat: 40.7589,
    gmtOffset: -4,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_SHIBUYA_SCRAMBLE_CROSSING,
    youtubeVideoId: "Lfl2Nj_QRXU",
    categoryId: CATEGORY_CITY,
    description: "Shibuya Scramble Crossing",
    addressSpot: "Shibuya Scramble Crossing",
    addressRegion: "Tokyo",
    addressCountry: "Japan",
    locationLng: 139.7005,
    locationLat: 35.6591,
    gmtOffset: 9,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_SHINJUKU_KABUKICHO,
    youtubeVideoId: "gFRtAAmiFbE",
    categoryId: CATEGORY_CITY,
    description: "Shinjuku Kabukicho",
    addressSpot: "Shinjuku Kabukicho",
    addressRegion: "Tokyo",
    addressCountry: "Japan",
    locationLng: 139.7005,
    locationLat: 35.6591,
    gmtOffset: 9,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_DANISH_FOREST,
    youtubeVideoId: "F0GOOP82094",
    categoryId: CATEGORY_NATURE,
    description: "Danish Forest",
    addressSpot: "Danish Forest",
    addressRegion: "Denmark",
    addressCountry: "Denmark",
    locationLng: 9.5018,
    locationLat: 56.2639,
    gmtOffset: 2,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_BANGKOK_SUKHUMVIT_ROAD,
    youtubeVideoId: "TfOOzM6mPT4",
    categoryId: CATEGORY_CITY,
    description: "Sukhumvit Road",
    addressSpot: "Sukhumvit Road",
    addressRegion: "Bangkok",
    addressCountry: "Thailand",
    locationLng: 100.5018,
    locationLat: 13.7367,
    gmtOffset: 7,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_ST_PETERSBURG_NEVSKY_AVENUE,
    youtubeVideoId: "h1wly909BYw",
    categoryId: CATEGORY_CITY,
    description: "Nevsky Avenue",
    addressSpot: "Nevsky Avenue",
    addressRegion: "St. Petersburg",
    addressCountry: "Russia",
    locationLng: 30.3351,
    locationLat: 59.9343,
    gmtOffset: 3,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_KOH_SAMUI_HOOTERS,
    youtubeVideoId: "VR-x3HdhKLQ",
    categoryId: CATEGORY_CITY,
    description: "Koh Samui Hooters",
    addressSpot: "Koh Samui Hooters",
    addressRegion: "Koh Samui",
    addressCountry: "Thailand",
    locationLng: 100.5018,
    locationLat: 13.7367,
    gmtOffset: 7,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_INTERNATIONAL_SPACE_STATION,
    youtubeVideoId: "P9C25Un7xaM",
    categoryId: CATEGORY_NATURE,
    description: "International Space Station",
    addressSpot: "International Space Station",
    addressRegion: "Space",
    addressCountry: "Space",
    locationLng: 0,
    locationLat: 0,
    gmtOffset: 0,
    hasAmbientSound: false,
  },
  {
    id: PLACE_ID_VENICE_BEACH,
    youtubeVideoId: "3LXQWU67Ufk",
    categoryId: CATEGORY_CITY,
    description: "Venice Beach",
    addressSpot: "Venice Beach",
    addressRegion: "Los Angeles",
    addressCountry: "USA",
    locationLng: -118.4789,
    locationLat: 33.985,
    gmtOffset: -7,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_NEFL_EAGLE_NEST,
    youtubeVideoId: "rMRM_0t8rjU",
    categoryId: CATEGORY_NATURE,
    description: "Eagle Nest",
    addressSpot: "Eagle Nest",
    addressRegion: "Florida",
    addressCountry: "USA",
    locationLng: -81.6557,
    locationLat: 30.3322,
    gmtOffset: -4,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_CYULU_HILLS_WATERHOLE,
    youtubeVideoId: "39uYW98qOV0",
    categoryId: CATEGORY_NATURE,
    description: "Waterhole at Ol Donyo Lodge",
    addressSpot: "Chyulu Hills Waterhole",
    addressRegion: "Ol Donyo Lodge",
    addressCountry: "Kenya",
    locationLng: 37.8955,
    locationLat: -2.3333,
    gmtOffset: 3,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_HEATHROW_AIRPORT,
    youtubeVideoId: "q0XCGZVzvWk",
    categoryId: CATEGORY_CITY,
    description: "Heathrow Airport",
    addressSpot: "Heathrow Airport",
    addressRegion: "London",
    addressCountry: "UK",
    locationLng: -0.4543,
    locationLat: 51.47,
    gmtOffset: 1,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_NORTHERN_LIGHTS_CHURCHILL,
    youtubeVideoId: "a0i1Kg6fROg",
    categoryId: CATEGORY_NATURE,
    description: "Northern Lights",
    addressSpot: "Northern Lights Churchill",
    addressRegion: "Churchill",
    addressCountry: "Canada",
    locationLng: -94.1549,
    locationLat: 58.768,
    gmtOffset: -5,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_KENYA_OL_JOGI_WATERHOLE,
    youtubeVideoId: "O8xVFhgEv6Q",
    categoryId: CATEGORY_NATURE,
    description: "Waterhole at Ol Jogi",
    addressSpot: "Ol Jogi Waterhole",
    addressRegion: "Ol Jogi",
    addressCountry: "Kenya",
    locationLng: 37.8955,
    locationLat: -2.3333,
    gmtOffset: 3,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_GORILLA_FOREST_CORRIDOR_KASUGHO,
    youtubeVideoId: "yfSyjwY6zSQ",
    categoryId: CATEGORY_NATURE,
    description: "Gorilla Forest Corridor in Kasugho",
    addressSpot: "Gorilla Forest Corridor",
    addressRegion: "Kasugho",
    addressCountry: "Congo",
    locationLng: 29.2,
    locationLat: 0.5,
    gmtOffset: 2,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_FAIRBANKS_AURORA,
    youtubeVideoId: "O52zDyxg5QI",
    categoryId: CATEGORY_NATURE,
    description: "Aurora in Fairbanks",
    addressSpot: "Aurora in Fairbanks",
    addressRegion: "Fairbanks",
    addressCountry: "USA",
    locationLng: -147.7164,
    locationLat: 64.8378,
    gmtOffset: -8,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_BIG_BUDDHA_BEACH,
    youtubeVideoId: "P_zJwpM2g68",
    categoryId: CATEGORY_CITY,
    description: "Big Buddha Beach",
    addressSpot: "Big Buddha Beach",
    addressRegion: "Koh Samui",
    addressCountry: "Thailand",
    locationLng: 100.5018,
    locationLat: 13.7367,
    gmtOffset: 7,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_MICHIGAN_PORT_HURON,
    youtubeVideoId: "6F1ABQXtCmI",
    categoryId: CATEGORY_CITY,
    description: "Port Huron",
    addressSpot: "Port Huron",
    addressRegion: "Michigan",
    addressCountry: "USA",
    locationLng: -82.42,
    locationLat: 42.98,
    gmtOffset: -4,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_SHINJUKU_CROSSINGS,
    youtubeVideoId: "6dp-bvQ7RWo",
    categoryId: CATEGORY_CITY,
    description: "Shinjuku Crossings",
    addressSpot: "Shinjuku Crossings",
    addressRegion: "Tokyo",
    addressCountry: "Japan",
    locationLng: 139.7005,
    locationLat: 35.6591,
    gmtOffset: 9,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_NEWYORK_UPPER_EAST_SIDE,
    youtubeVideoId: "ovLS4Ah4fcM",
    categoryId: CATEGORY_CITY,
    description: "Upper East Side",
    addressSpot: "Manhattan Upper East Side",
    addressRegion: "New York",
    addressCountry: "USA",
    locationLng: -73.9851,
    locationLat: 40.7589,
    gmtOffset: -4,
    hasAmbientSound: true,
  },
  {
    id: PLACE_ID_BICYCLE_CROSSING_AMSTERDAM,
    youtubeVideoId: "PyNuRpZOtAY",
    categoryId: CATEGORY_CITY,
    description: "Bicycle Crossing Amsterdam",
    addressSpot: "Bicycle Crossing Amsterdam",
    addressRegion: "Amsterdam",
    addressCountry: "Netherlands",
    locationLng: 4.8994,
    locationLat: 52.3792,
    gmtOffset: 2,
    hasAmbientSound: false,
  },
];
