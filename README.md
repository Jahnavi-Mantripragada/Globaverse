# GeoTangle

GeoTangle visualizes global alliances and conflicts on an interactive world map.
The app is built with Next.js, React, and D3.js and is ready for deployment on Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deploying on Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Set the build command to `npm run build` and the output directory to `.next`.

## Data Format

`data/relations.json` contains relationships between countries:

```json
{
  "source": "Country A",
  "target": "Country B",
  "type": "alliance" | "conflict",
  "justification": "Why they are allied or in conflict",
  "sources": ["https://example.com"],
  "tags": ["tag1", "tag2"]
}
```

Additional relationships can be added to this file.
