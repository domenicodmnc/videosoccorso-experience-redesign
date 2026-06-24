# VideoSoccorso Experience Redesign

MVP front-end navigabile per esplorare un redesign dell’esperienza informativa del Pronto Soccorso.

## Avvio

```bash
npm install
npm run dev
```

Per verificare la build di produzione:

```bash
npm run build
npm run preview
```

I dati sono interamente fittizi e vengono salvati nel `localStorage` del browser. Il progetto non usa backend, database o autenticazione reale.

## Percorsi demo

- `/` — Landing pubblica
- `/mobile` — Ricerca ticket paziente
- `/mobile/C12` — Stato paziente demo
- `/display` — Display pubblico
- `/login` — Login dimostrativo
- `/operator` — Dashboard operatore
- `/operator/new` — Nuovo ticket

## Deploy su Vercel

Il progetto include `vercel.json` con il fallback SPA necessario per aprire direttamente percorsi come `/display`, `/project` e `/mobile/C12` senza errori 404.

1. Importa la repository in Vercel.
2. Lascia selezionato il framework **Vite**.
3. Usa `npm run build` come comando di build.
4. Usa `dist` come cartella di output.
5. Avvia il deploy.

Non sono necessarie variabili d’ambiente: l’MVP usa soltanto dati demo e `localStorage`.

## Deploy su GitHub Pages

Il progetto include anche un workflow GitHub Actions dedicato a GitHub Pages. La build usa il percorso base della repository e il routing tramite hash, così tutte le aree restano raggiungibili anche dopo un aggiornamento della pagina.

1. In GitHub apri **Settings → Pages**.
2. In **Build and deployment**, seleziona **GitHub Actions** come sorgente.
3. Esegui il workflow **Deploy to GitHub Pages** oppure pubblica un nuovo commit su `main`.

Il sito sarà disponibile su `https://domenicodmnc.github.io/videosoccorso-experience-redesign/`.
