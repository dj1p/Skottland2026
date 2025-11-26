# 🏌️ Skottland 2026 - golf.austheim.app

Nettside for golfturen til Skottland 2026.

## 📁 Prosjektstruktur

```
golf-app/
├── public/
│   └── images/           # 👈 ALLE BILDER HER
├── src/
│   ├── data/
│   │   ├── types.ts      # TypeScript types (ikke endre)
│   │   ├── trips.ts      # Eksporterer turen
│   │   └── trip2026.ts   # 👈 REDIGER TURDATA HER
│   ├── pages/
│   │   └── TripPage.tsx  # Hovedsiden
│   └── ...
├── Dockerfile
└── package.json
```

## ✏️ Redigere Innhold

### Alt redigeres i `src/data/trip2026.ts`

**Overnatting:**
```typescript
accommodation: {
  name: 'Airlie House',
  description: 'Endre beskrivelsen her...',
  photos: [
    { src: '/images/home-entrance.jpg', alt: 'Airlie House', caption: 'Inngangspartiet' },
    // Legg til eller fjern bilder her
  ],
}
```

**Golfbaner:**
```typescript
courses: [
  {
    name: 'Montrose 1562 Course',
    teeTime: 'TBC',           // Endre til f.eks. "08:30" når bekreftet
    greenfee: '£130',         // Oppdater pris
    websiteUrl: 'https://...', // Link til klubbens nettside
    photos: [
      { src: '/images/montrose1562---1.jpeg', alt: 'Montrose', caption: 'Historisk links' },
    ],
  },
]
```

**Tee-tider:**
- `teeTime: 'TBC'` = Vises med gul farge (ikke bekreftet)
- `teeTime: '08:30'` = Vises med grønn farge (bekreftet)

**Middager:**
```typescript
dinner: {
  chefs: ['Tor', 'Klaus'],
  description: 'Pizza-kveld!',
  menu: 'Hjemmelaget pizza fra Ooni...',
}
```

## 📸 Legge til/Endre Bilder

1. **Legg bilder i `public/images/`**
2. **Referer i trip2026.ts:**
   ```typescript
   photos: [
     { src: '/images/ditt-bilde.jpg', alt: 'Beskrivelse', caption: 'Bildetekst' },
   ]
   ```

**Bildesteder:**
- `accommodation.photos` - Bilder av huset
- `courses[].photos` - Bilder av hver golfbane

## 🔄 Bytte Golfbane

For å bytte f.eks. søndagens bane fra Forfar til Newmachar:

1. Åpne `src/data/trip2026.ts`
2. Finn søndagens schedule (date: '30')
3. Endre course-objektet:
   ```typescript
   {
     name: 'Newmachar GC – Hawkshill Course',
     type: 'heathland',
     par: 72,
     yards: 6573,
     // osv...
   }
   ```
4. Legg til nye bilder i `public/images/`
5. Oppdater photos-arrayet

## 🚀 Deploy

Push til GitHub → Coolify auto-deployer

```bash
git add .
git commit -m "Oppdatert innhold"
git push
```

## 📝 Hurtigreferanse

| Hva | Hvor |
|-----|------|
| Endre tekst/info | `src/data/trip2026.ts` |
| Legge til bilder | `public/images/` + referanse i trip2026.ts |
| Endre tee-tider | `courses[].teeTime` |
| Endre greenfee | `courses[].greenfee` |
| Legge til aktiviteter | `schedule[].activities` |
| Endre kokker | `schedule[].dinner.chefs` |

---

Laget med ❤️ for golfgutta
