//src/app/models/weather.enum.ts

export enum Vreme {
  SUNNY = 'Însorit și Cald',
  CLOUDY = 'Înnorat / Răcoros',
  RAINY = 'Ploios / Umed',
  COLD = 'Frig / Vânt',
  SNOWY = 'Zăpadă / Foarte Frig'
}
export const VREME_LISTA = Object.values(Vreme);