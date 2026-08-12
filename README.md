# Deep-Sky FOV Planner

A single self-contained web app for planning astrophotography framing: search a Messier / NGC / IC object, pick a camera and one or more telescope focal lengths, and see the resulting field of view drawn to scale on real sky imagery.

It also includes a "Tonight's Best Deep-Sky Objects" panel: enter (or auto-detect) your observing location and a date, and it ranks the Messier/NGC/IC catalog by peak altitude during astronomical darkness, with an altitude-vs-time graph (rise/transit/set, twilight shading) for whichever object you select — similar to Telescopius' visibility charts. Location is requested via the browser's geolocation prompt on first load; if denied or unavailable, enter latitude/longitude manually — it's remembered locally after that.

## Files

- `index.html` — page structure
- `style.css` — styling
- `app.js` — all application logic (catalogs, FOV math, map drawing)

All three files must stay together in the same folder — `index.html` loads the other two by relative path.

## Running it

Double-click `index.html` (or open it from your browser's File > Open). No install, no server, no build step. An internet connection is required each time you use it, since it pulls live sky imagery and resolves object names through the CDS Sesame service.

## Moving to another computer

Copy this entire folder — that's it. Nothing else on the system needs to be installed.

## Using it from an iPhone/iPad later

This is a static web app with no backend, so any static web host works:

1. Upload this folder to a free static host (GitHub Pages, Netlify, Cloudflare Pages, etc.)
2. Open the resulting URL in Safari on your iPhone/iPad

No code changes are needed for this.

## Equipment configured

**Cameras**
- ZWO ASI585MC Pro — 11.2 × 6.3 mm sensor, 3840×2160 px, 2.9 µm pixels
- ZWO ASI2600MC Pro — 23.5 × 15.7 mm sensor, 6248×4176 px, 3.76 µm pixels

**Telescope focal lengths (mm)**
270, 260, 446, 348, 495, 600

To change any of this, edit the `SENSORS` or `FOCAL_LENGTHS`/`FL_COLORS` objects near the top of `app.js`.
