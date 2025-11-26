# 🏌️ Golf Trip App - golf.austheim.app

Nettside for årlige golfturer. Enkel å oppdatere med nye turer.

## 📁 Prosjektstruktur

```
golf-app/
├── src/
│   ├── data/           # 👈 REDIGER TURDATA HER
│   │   ├── types.ts    # TypeScript types (ikke endre)
│   │   ├── trips.ts    # Eksporterer alle turer
│   │   ├── trip2025.ts # 2025 turdata
│   │   └── trip2026.ts # 2026 turdata
│   ├── pages/
│   │   ├── HomePage.tsx   # Forside med alle turer
│   │   └── TripPage.tsx   # Individuell tur-side
│   ├── components/     # Gjenbrukbare komponenter
│   ├── styles/
│   │   └── index.css   # Global styling
│   ├── App.tsx         # Routing
│   └── main.tsx        # Entry point
├── Dockerfile          # For Coolify deployment
├── nginx.conf          # Nginx config for SPA
└── package.json
```

## ✏️ Hvordan redigere innhold

### Legge til ny tur (f.eks. 2027)

1. **Kopier en eksisterende turfil:**
   ```bash
   cp src/data/trip2026.ts src/data/trip2027.ts
   ```

2. **Rediger `src/data/trip2027.ts`:**
   - Oppdater `year: 2027`
   - Oppdater alle detaljer (overnatting, program, etc.)

3. **Legg til i `src/data/trips.ts`:**
   ```typescript
   import { trip2027 } from './trip2027'
   
   export const trips: Trip[] = [
     trip2027,  // Legg til her
     trip2026,
     trip2025,
   ].sort((a, b) => b.year - a.year)
   ```

### Redigere eksisterende tur

Åpne den relevante filen i `src/data/` og rediger:

- **Overnatting:** `accommodation` objektet
- **Program:** `schedule` arrayet (dag for dag)
- **Middager:** `dinner` objektet i hver dag
- **Golfbaner:** `courses` arrayet i hver dag
- **Restauranter:** `restaurants` arrayet

### Eksempel på golfbane-data

```typescript
{
  name: 'Montrose 1562 Course',
  type: 'links',        // links | parkland | heathland | coastal
  par: 71,
  yards: 6585,
  established: 1562,
  designer: 'Old Tom Morris, Willie Park Jr., Harry Colt',
  greenfee: '£100-125',
  ranking: '#43 Scotland',
  description: 'En av verdens eldste golfbaner...',
  distanceFromHouse: '~25 min',
  timeOfDay: 'morning', // morning | afternoon
}
```

## 🚀 Deployment til Coolify

### Option 1: GitHub Integration (Anbefalt)

1. Push koden til GitHub repository
2. I Coolify:
   - Create new application
   - Connect GitHub repository
   - Build Pack: `Dockerfile`
   - Domain: `golf.austheim.app`

### Option 2: Manual Deploy

```bash
# Bygg Docker image
docker build -t golf-austheim-app .

# Kjør lokalt for testing
docker run -p 3000:80 golf-austheim-app
```

### Coolify Settings

- **Build Pack:** Dockerfile
- **Port:** 80
- **Health Check Path:** /

## 🛠️ Lokal utvikling

```bash
# Installer dependencies
npm install

# Start dev server
npm run dev

# Bygg for produksjon
npm run build

# Preview produksjonsbygg
npm run preview
```

## 🔗 URL-struktur

- `/` - Forsiden (alle turer)
- `/2026` - 2026 turen
- `/2025` - 2025 turen
- osv.

## 📝 Tips

- **Farger:** Hver dag har en `color` property: `amber`, `emerald`, `rose`, `blue`, `stone`
- **Banetyper:** `links`, `parkland`, `heathland`, `coastal`
- **isUpcoming:** Sett til `true` for fremtidige turer, `false` for gjennomførte
- **Bilder:** Kan legges til i `public/` mappen og refereres i koden

## 🔄 Oppdatere etter turen

1. Sett `isUpcoming: false` i turfilen
2. Legg til eventuelle bilder/minner
3. Push til GitHub → automatisk deploy

---

Laget med ❤️ for golfgutta
