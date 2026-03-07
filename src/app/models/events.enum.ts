// src/app/models/events.enum.ts ← adăugăm câteva ocazii lipsă

export enum Eveniment {
    OFFICE         = 'office',
    BUSINESS       = 'business',
    DAILY          = 'daily',
    PARTY          = 'party',
    DATE           = 'date',
    WEDDING        = 'wedding',
    HOLIDAY        = 'holiday',
    GYM            = 'gym',        // ← nou
    BRUNCH         = 'brunch',     // ← nou
    EVENING        = 'evening',    // ← nou
    CASUAL_OUTING  = 'outing',     // ← nou
    BEACH          = 'beach',      // ← nou
}
export const EVENIMENTE_LISTA = Object.values(Eveniment);