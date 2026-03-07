// src/app/models/fit.enum.ts  ← ÎNLOCUIEȘTE vechiul fișier complet

export enum Fit {
  OVERSIZED  = 'oversized',   // larg, relaxed, wide leg, balloon
  REGULAR    = 'regular',     // standard, straight, dreaptă
  FITTED     = 'fitted',      // cambrat, mulat, slim, rib, corset
  CROPPED    = 'cropped',     // crop top, scurt
  FLARED     = 'flared',      // evazat, flared
  JOGGER     = 'jogger',      // sport, elastic la bază
  SKINNY     = 'skinny',      // colanți, strâmt
}

// FitPreference rămâne pentru UI (preferința utilizatorului)
export enum FitPreference {
  OVERSIZED  = 'Oversized & Relaxed',
  FITTED     = 'Fitted & Sharp',
  MIX_MATCH  = 'Mix & Match'
}

// Mapare FitPreference → Fit[] compatibile (pentru scoring)
export const FIT_COMPATIBILITY: Record<FitPreference, Fit[]> = {
  [FitPreference.OVERSIZED]: [Fit.OVERSIZED, Fit.REGULAR],
  [FitPreference.FITTED]:    [Fit.FITTED, Fit.SKINNY, Fit.CROPPED],
  [FitPreference.MIX_MATCH]: [Fit.OVERSIZED, Fit.FITTED, Fit.REGULAR, Fit.CROPPED, Fit.FLARED, Fit.JOGGER, Fit.SKINNY],
};

export const FIT_LISTA = Object.values(FitPreference);