# GeoTangle

GeoTangle visualizes global alliances and conflicts. It includes a world map and a relationship graph view.
The app is built with Next.js, React, and D3.js and is ready for deployment on Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## File Structure

```
src/
  components/
    Map.jsx
    NodeTooltip.jsx
    CountrySidePanel.jsx
    CountryRelationshipsPanel.jsx
    ArticleForm.jsx
    RelationshipMap.jsx
    SidePanel.jsx
  data/
    relationships.json
    countryMeta.json
  utils/
    colorUtils.js
    formatter.js
  pages/
    Home.jsx
    Contribute.jsx
    BusinessView.jsx
    api/
      relationships.js
```

## Deploying on Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Set the build command to `npm run build` and the output directory to `.next`.
4. The included `vercel.json` configures the Next.js build on Vercel.

## Data Format

`src/data/relationships.json` contains relationships between countries:

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
