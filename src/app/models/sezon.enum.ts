//src/app/models/sezon.enum.ts
export enum Sezon {
  VARA = 'Vară',
  IARNA = 'Iarnă',
  PRIMAVARA = 'Primăvară',
  TOAMNA = 'Toamnă',
  PRIMAVARA_TOAMNA = 'Primăvară/Toamnă',
  PRIMAVARA_VARA = 'Primăvară/Vară',
  TOAMNA_IARNA = 'Toamnă/Iarnă',
  IARNA_PRIMAVARA = 'Iarnă/Primăvară',
  ALL_SEASON = 'All Season'
}
export const SEZOANE_LISTA = Object.values(Sezon);
