# Wedding Planner

A personal event planning desktop app built with Electron + React. Manage your budget, guests, venues, photographers, seating, checklist, and vendors — all from one local app with data persisted to disk. Supports multiple event types: weddings, baptisms, receptions, birthdays, parties, and anniversaries.

---

## Version History

### v1.0 — Electron Preview

The initial version was a minimal Electron shell wrapping a single `wedding_planner.jsx` file. React and Babel were loaded via CDN so the UI could be previewed without a build step.

**What it included:**

- Electron window rendering `index.html` + `wedding_planner.jsx`
- React UI powered by CDN React + in-browser Babel transpilation
- No data persistence — all state was in-memory and lost on reload
- Basic setup: `npm install` + `npm start`

**What it lacked:**

- No way to save changes
- All sample data was hardcoded inside the JSX file

---

### v1.1 — Data Layer + localStorage Persistence

v1.1 introduced a proper data layer so changes survive reloads.

**What changed:**

- Sample data extracted from the JSX into separate `data/*.json` files:
  `venues`, `photographers`, `budget`, `guests`, `tables`, `checklist`, `vendors`, `nav`, `meta`
- `dataStore.js` helper loads JSON files at startup and writes edits back via `localStorage`
- When running via Electron, edits are written back to the `data/*.json` files on disk through a secure IPC bridge (`preload.js` + `ipcMain.handle("write-data-file", ...)`)
- Added `nvm` setup instructions to the README
- If `index.html` is opened directly in a browser (not Electron), changes are saved to `localStorage` only and do not modify files on disk

**Architecture:**

```
Renderer (React) → window.electronAPI.writeDataFile() → preload IPC → main.js → data/*.json
```

---

### v1.2 — REST API Backend

v1.2 replaces the IPC-based write mechanism with a full local REST API server (`server.js`) running on `http://localhost:3001`. The UI now communicates with the backend for all data operations.

**What changed:**

- Added `server.js`: an Express REST API with full CRUD support for all collections
- Added `Start.command`: a double-clickable launcher that starts the API server and opens the Electron window together
- UI now uses `apiPost()` / `apiPatch()` helpers to call the REST API instead of writing through IPC
- Added `body-parser` and `express` as runtime dependencies
- Atomic file writes on the server (write to `.tmp` then rename) to prevent data corruption
- Timestamp-based ID generation (`YYYYMMDDHHMMSS`) with collision avoidance

**API endpoints (`http://localhost:3001/api`):**

| Method   | Path                   | Description                                   |
| -------- | ---------------------- | --------------------------------------------- |
| `GET`    | `/api/:collection`     | Fetch all items in a collection               |
| `POST`   | `/api/:collection`     | Add a new item (auto-generates ID if missing) |
| `PUT`    | `/api/:collection/:id` | Update a single item by ID                    |
| `PUT`    | `/api/:collection`     | Replace the entire collection                 |
| `DELETE` | `/api/:collection/:id` | Delete an item by ID                          |

**Collections:** `venues`, `photographers`, `budget`, `guests`, `tables`, `checklist`, `vendors`, `nav`, `meta`, `timeline`

**Architecture:**

```
Renderer (React) → fetch() → Express server (localhost:3001) → data/*.json
```

---

### v1.3 — Itemized Expense Tracking

v1.3 adds per-category expense line items to the Budget section, so you can log exactly what you paid for — not just how much.

**What changed:**

- Each budget category now stores an `expenses` array in `budget.json`
- New **Add an Expense** form (description, category, amount) logs individual line items; the category's `spent` total updates automatically
- Each category card shows a collapsible expense list (toggle with the **N expenses** button)
- Every expense entry records name, amount, and the date it was added

**No infrastructure changes** — the REST API, IPC bridge, and file layout are the same as v1.2.

---

### v1.4 — Multi-Event Type Support

v1.4 makes the app generic enough to plan any major event, not just weddings.

**What changed:**

- The Overview header label now adapts to the event type stored in `meta.title_type`:
  - `"Wedding Planner"` → **Your Wedding Day**
  - `"Baptism Planner"` → **Your Baptism Day**
  - `"Reception Planner"` → **Your Reception Day**
  - `"Birthday Planner"` → **Your Birthday Day**
  - `"Party Planner"` → **Your Party Day**
  - `"Anniversary Planner"` → **Your Anniversary Day**
  - Any other value → **Your Event Day**
- Set `title_type` in `data/meta.json` to switch the app's event context

**No infrastructure changes** — the REST API and file layout are the same as v1.3.

---

### v1.5 — Bilingual UI + Editable Budget Categories + Custom Checklist Categories

v1.5 adds full Greek/English language support across the entire UI, makes budget category names editable, and lets you manage checklist categories as first-class data.

**Language support:**

- 🇬🇧 / 🇬🇷 flag switcher in the top-right corner of the Overview tab
- Toggles between English and Greek for all static UI text: nav labels, section titles, buttons, form labels, placeholder text, filter chips, status badges, and stat cards
- Selected language is persisted in `data/meta.json` (durable across restarts) and `localStorage` (fast fallback on load)
- Locale-aware date formatting: Greek locale uses `el-GR` month names, English uses `en-US`
- All dynamic user-entered data (names, notes, task text) remains unchanged

**Budget — editable category names:**

- Click any budget category name (e.g. "Venue", "Catering") to edit it inline
- Same interaction pattern as the existing budget/spent amount editing: dashed underline, text input on click, Enter or blur to save, Escape to cancel
- Name change is independent of the budget amount — the two fields have separate edit modes
- Updated name reflects immediately in the category dropdown of the Add Expense form

**Checklist — custom categories:**

- Categories are now stored as first-class data in `checklist.json` alongside tasks
- `checklist.json` format changed from a flat array to `{ "tasks": [...], "categories": [...] }`
- **Add** a new category with the dashed `+ Category` button at the end of the filter chips — type a name and press Enter
- **Delete** any empty category (zero tasks) by clicking the `×` that appears on the right side of its chip
- The category dropdown in the Add Task form automatically reflects the current category list
- On first load, categories derived from existing task data are merged with the stored list for backward compatibility

**No server changes** — `PUT /api/checklist` (full-collection replace) handles the new format transparently.

---

### v1.6 — Event Timeline

v1.6 adds a dedicated **Timeline** tab for scheduling every moment of the event, across multiple days.

**What changed:**

- New **Timeline** tab (🕐) — a vertical time-axis view for planning the day minute by minute
- **Multi-day support** — add as many named days as needed (e.g. "Preparation Day", "Wedding Eve", "Wedding Day"); each day has its own independent event list and can optionally store a date
- **Click to add** — click anywhere on the timeline canvas to place a new event at that time; the time snaps to the nearest interval
- **Event fields** — title, start time, duration (minutes), category, description, and color (10 presets + free-form color picker)
- **Auto-range** — the visible time window is calculated automatically: 2 hours before the earliest event and 2 hours after the latest event ends; no manual start/end time to manage
- **Interval toggle** — switch between 15 / 30 / 60 min grid resolution with a single click; saved to `data/timeline.json`
- **Event summary pills** — a compact strip below the canvas lists every event in chronological order; click any pill to edit
- New collection `timeline` added to the REST API and `data/timeline.json`

**`data/timeline.json` structure:**

```json
{
  "settings": { "interval": 30 },
  "days": [
    {
      "id": "day1",
      "name": "Preparation Day",
      "date": "",
      "events": [
        {
          "id": "1",
          "title": "Bridal Preparation",
          "startTime": "07:00",
          "duration": 120,
          "color": "#B5737F",
          "description": "Hair, makeup, and getting dressed",
          "category": "Preparation"
        }
      ]
    }
  ]
}
```

**No architecture changes** — the existing REST API handles `timeline` as a standard collection via `PUT /api/timeline`.

---

### v1.7 — Per-Venue Editable Menu

v1.7 adds a fully editable catering menu to each venue card, with course grouping and drag-and-drop reordering.

**What changed:**

**Menu per venue:**

- Every venue card now has a collapsible **🍽 Menu** section — a pill badge shows the dish count when there are items
- **Add dishes** via an inline form with three fields: **Course** (e.g. Starter, Main, Dessert), **Dish** name, and optional **Description**
- **Menu grouped by course** — dishes are rendered under bold UPPERCASE rose-coloured section headers; each course is its own visual block
- **Drag & drop** — each item has a `⠿` drag handle; drag onto another item to insert before it (adopting the target's course); drag onto a course section header to append to that course; changes persist immediately via the REST API
- **Description right-aligned** — description text sits on the right side of each dish row and word-wraps as needed
- **Remove** any dish with the `✕` button
- Menu data stored per venue in `data/venues.json` as a `menu` array

**Venue card UI polish:**

- **"Select This Venue"** button moved to the top-right corner of the card (same position as the "✓ Selected" badge it replaces when not yet chosen)
- **Price inline with notes** — the price sits flush-right on the same row as the venue description, always visible even when notes are empty
- **Trash button** moved to the right end of the `🍽 Menu` bar (no longer in the bottom action row)
- Removed the decorative separator line between the badges and notes; tightened vertical spacing throughout the card

**`data/venues.json` — updated schema:**

```json
{
  "id": 1,
  "name": "The Grand Estate",
  "menu": [
    { "id": 1748400000000, "course": "Starter",    "name": "Bruschetta",     "description": "Crispy bread with tomatoes" },
    { "id": 1748400000001, "course": "Main Course", "name": "Grilled Salmon", "description": "With lemon butter sauce" },
    { "id": 1748400000002, "course": "Dessert",     "name": "Panna Cotta",    "description": "" }
  ]
}
```

**No infrastructure changes** — the existing `PUT /api/venues/:id` endpoint handles menu updates transparently.

---

## Features

| Section           | Description                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Overview**      | Dashboard with days-to-wedding countdown, budget progress, guest RSVP summary, task completion, and selected venue/photographer |
| **Budget**        | Set a total budget, add spending categories, track spent vs. budgeted per category with visual progress bars                    |
| **Venues**        | Add venues with capacity, price, rating, and notes; mark one as selected; edit a per-venue catering menu with course grouping and drag-and-drop reordering |
| **Photographers** | Add photographers with style, price, rating; mark one as selected                                                               |
| **Guests**        | Add guests with RSVP status (confirmed / pending / declined), search and filter, dietary notes                                  |
| **Tables**        | Drag-and-drop seating planner — assign guests to named tables                                                                   |
| **Checklist**     | Task list grouped by category with done/undone toggle and progress tracking; add and delete custom categories                   |
| **Vendors**       | Track vendors (florist, catering, etc.) with contact info and status                                                            |
| **Timeline**      | Multi-day event timeline; click to add events, auto-scaled time axis, interval toggle, color-coded event blocks                 |

All sections support soft-delete (trash) with restore — deleted items are hidden but recoverable.

---

## Setup

Install Node with `nvm` if you don't have it:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
# restart your shell or run:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
```

Install dependencies:

```bash
npm install
```

---

## Running the App (v1.7)

v1.7 requires both the API server and the Electron window to be running.

**Option A — double-click launcher (macOS):**

Double-click `Start.command` in Finder. This starts the API server and opens the Electron window automatically.

**Option B — two terminals:**

Terminal 1 — start the API server:

```bash
npm run server
```

Terminal 2 — start the Electron window:

```bash
npm start
```

---

## Data & Persistence

- All data lives in `data/*.json` files.
- The API server reads from and writes to these files on every request.
- Writes are atomic: data is written to a `.tmp` file first, then renamed, so a crash mid-write never corrupts your data.
- Do **not** commit `node_modules/` — run `npm install` locally instead.

---

## Packaging a Native .app (optional)

```bash
npm run dist
```

This uses `electron-builder` to produce a `.dmg` and `.zip` in the `dist/` folder. Requires macOS.

---

## Tech Stack

- **Electron** — desktop shell
- **React** (via CDN) + **Babel** (in-browser) — UI, no build step required
- **Express** — local REST API server
- **JSON files** — flat-file database
