# Raj Delight

A premium, aesthetic and responsive restaurant website for Raj Delight, Chandausi.

## Current build

- Next.js App Router + TypeScript
- Responsive mobile-first layout
- Premium editorial visual system with Cormorant Garamond + Manrope
- Fresh RD-inspired vector mark based on the user's supplied reference image; the supplied photo is not used as the website logo
- Standalone brand asset at `public/raj-delight-mark.svg`
- Premium finishing layer with restrained ornamental edge rails and responsive decorative details
- Interactive full public menu search and category filtering
- Full currently visible public Zomato menu dataset, including seasonal/Navratri and drinks sections
- Zomato and Swiggy ordering links
- Google Maps directions link
- Public rating snapshot and public listing details
- Gallery placeholders clearly marked as editorial imagery until original restaurant photography is supplied
- SEO metadata, Open Graph metadata, robots and sitemap
- GitHub Actions typecheck + production build validation

## Design workspace

Figma brand and website design workspace:
https://www.figma.com/design/ILFSEpb9nz1Tx7F5dJd9ML

## Public restaurant details used in the current build

Restaurant: Raj Delight Restaurant  
Address: 15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412  
Phone shown by the current Zomato listing: +91 79831 48985  
Public listing hours: 09:30 AM–12:00 AM daily  
Cuisine/categories: North Indian, South Indian, Biryani, Chinese, Fast Food, Street Food, Ice Cream, Beverages  
Public Google rating snapshot: 4.3/5

Prices are intentionally not hard-coded because the current public Zomato menu gates item prices behind login.

## Important content policy for the site

The project does not invent restaurant facts, reviews, prices, opening claims, amenities, or social profiles. Conflicting public information is not silently merged. Original restaurant photography and verified official social URLs can be added once supplied/confirmed by the restaurant.

## Local development

```bash
npm install
npm run dev
```

Checks:

```bash
npm run typecheck
npm run build
```

## Deployment

The intended deployment target is Vercel connected to the GitHub repository `shashanks19102010-hue/Raj-Delight`.
