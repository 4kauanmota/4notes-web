<div align="center">

<img src="public/favicon.svg" alt="4notes logo" width="96" />

# 4notes

### ✨ You decide what you need.

Notes, tasks, mind maps, links and a timer in a single app.<br>
Turn on the tools that make sense for you, organize things your way and keep everything in a folder of your own.

**Windows 10 and 11 · Android 7+ · no account and no login**

[Download the latest version](https://github.com/4kauanmota/4notes-app/releases/latest) ·
[Run the site](#run-it-locally) ·
[Deploy to Vercel](#deploy-to-vercel)

<br>

<img src="public/screens/desktop-notes-light-1600.webp" alt="4notes in the Notes module: categories in the sidebar, notes in tabs and a note with a checklist, a numbered list and a code block." width="860" />

</div>

---

This repository is the **4notes presentation and download site** (Nuxt 4, generated as a static site for Vercel). The text below presents the app the same way the site does; the technical part about the site comes after it.

## 🧩 4notes works your way

4notes doesn't impose a method. It offers five tools and leaves the choice to you:

- **Turn on only what you use.** Each module can be enabled or disabled in Configurações › Módulos (Settings › Modules) or by right-clicking the sidebar. Disabling removes the module from the menu **without deleting any data**, and it comes back just as it was when you turn it on again.
- **Arrange the menu.** Change the order of the modules by dragging them and choose whether the menu shows only the icons or the icons with their names.
- **Store it wherever you want.** You choose the workspace folder; everything stays in it, in Markdown and JSON. Create as many workspaces as you like, each with its own data and settings.
- **Light or dark.** The theme follows the system or stays the way you prefer.
- **Use it on your computer and on your phone.** The same interface on Windows and Android, adapted to each screen.

On the site, the **“Monte o seu 4notes”** (“Build your 4notes”) section shows this in practice: turn modules on and off and watch the sidebar change, just like in the app.

## 🛠️ The five tools

| | Module | What you get |
| :-: | --- | --- |
| 📝 | **Notes** | Quick notes in tabs, with real formatting. Categories with a color, icon or photo, automatic folders based on the title, shortcuts to a note's previous and next version, and export to TXT or PDF. |
| ✅ | **Tasks** | Dates, categories and recurring tasks. “Revisar amanhã #estudos” (“Review tomorrow #studies”) already sets the date and the category, and recurrence works even with the app closed. |
| 🧠 | **Mind map** | Ideas as notes linked to each other. Shift + drag connects, dropping on an empty spot creates a connected note and “Reorganizar” (“Reorganize”) tidies up the map while avoiding crossings. |
| 🔗 | **Links** | Paste an address and the site's title and icon arrive on their own. Categories, search, sorting and import of browser bookmarks. |
| ⏱️ | **Timer** | Stopwatch, countdown timer and Pomodoro, with history and statistics. The count comes from the clock, so switching modules or closing the app doesn't get in the way. |

<div align="center">
<img src="public/screens/phone-note-light-360.webp" alt="A note open on the phone." width="180" />
<img src="public/screens/phone-tasks-light-360.webp" alt="Pending tasks on the phone." width="180" />
<img src="public/screens/phone-timer-light-360.webp" alt="A Pomodoro in progress on the phone." width="180" />
</div>

## 🔗 Everything connects, if you want it to

- **Mentions with `@`**: in a note or task, mention notes, maps, tasks, saved links and Timer records. One click opens the item in its module, and renaming through the app updates the mentions.
- **An editor with no symbols on screen**: bold, highlight, colors, lists that renumber themselves, checklists, colored code blocks and pasted images. The file is still plain Markdown.
- **Tutorials with `F1`**: the module's tutorial opens alongside, without taking you away from what you're doing.
- **Updates from the app itself**: when a new version comes out, 4notes lets you know and installs it whenever you want.

## 📁 Your data is your files

No account, no login and no server: 4notes only reads and writes the folder you chose. Backing up means copying the folder, and the files open in any text editor. Each file is written in full, deleting sends things to the Recycle Bin and the most common actions can be undone.

---

# 🌐 About this site

## What's on the page

A single page, in Portuguese, with light and dark themes (it follows the system; the moon/sun button switches it and the choice is saved in the browser). The slogan **“Você decide o que você precisa”** (“You decide what you need”) opens the page and guides the rest: the section right below it lets the visitor build their own 4notes, and the others show the tools they can choose from.

| Section | What it shows |
| --- | --- |
| **Opening** | The brand (the corner of the “4” folds when the page opens), the slogan with a yellow stroke that stretches out, the download buttons and the real app: the computer window and the phone. |
| **Monte o seu 4notes** (`#do-seu-jeito`) | The five modules with switches identical to the ones in the app's Settings, example combinations (Só anotar, Estudos, Projetos, Tudo: “Just notes”, “Studies”, “Projects”, “Everything”) and the choice between “Ícone e nome” (“Icon and name”) and “Só o ícone” (“Icon only”). The sidebar preview turns each module on and off with the connect animation; on the phone it becomes the bottom bar, as in the app. At least one module stays on, as in the app. |
| **Modules** (`#modulos`) | One tool at a time, with a real screenshot, what it's for and what you can do with it. Switches between **Computador** (“Computer”) and **Celular** (“Phone”). You can change modules from the list, with the keyboard arrows or by clicking the sidebar in the screenshot itself. |
| **Features** (`#recursos`) | The symbol-free editor, the app on the phone and on the foldable, and a draggable light × dark comparison. |
| **Mentions and data** (`#conexoes`, `#seus-dados`) | The `@` that links the modules (a real screenshot of the mentions list) and the workspace folder with its files. |
| **Download** (`#baixar`) | Windows and Android: requirements, file size, how to install and what's new in the version. |
| **Closing and footer** | A final call to action (“é só ligar outro módulo”, “just turn on another module”) and the slogan as a signature in the footer. |

All screenshots are of the **real 4notes** (the interface built from the app's code), with a demo workspace — nothing drawn by hand. The menu preview in the “Monte o seu 4notes” section is an interactive demo built into the site, not a screenshot.

## Run it locally

Requirements: **Node.js 22.12+**.

```bash
npm install
npm run dev        # http://localhost:3000, with automatic reload
```

To see the final version, identical to the published one:

```bash
npm run build      # generates the static site in .output/public
npm run preview    # serves the generated folder (npx serve)
```

`npm run typecheck` checks the types (strict TypeScript).

## Deploy to Vercel

1. Push this folder to a GitHub repository (the `.gitignore` already leaves out `node_modules`, `.nuxt`, `.output` and `.vercel`).
2. On Vercel: **Add New… › Project**, choose the repository and confirm. The `vercel.json` already sets the framework (Nuxt) and the command (`npm run build` = `nuxt generate`). There's no need to configure an output directory: Nuxt detects Vercel and generates the format it expects.
3. Done. Every `git push` to the main branch publishes a new version.

**Custom domain (optional).** The address used in the canonical link and in the sharing image (`og:image`) comes automatically from the Vercel production domain. If you connect a custom domain, create the `NUXT_PUBLIC_SITE_URL` environment variable (e.g. `https://4notes.app`) in **Settings › Environment Variables** and publish again.

## Download links

Everything lives in **`app/config/downloads.ts`**:

- `githubRepo: '4kauanmota/4notes-app'` — the same repository the app uses to update itself. When the page opens, the site asks GitHub for the latest version and the buttons start pointing to its `.exe` and `.apk`. **Published a version with `npm run release` in 4notes? The site already shows the new one**, without having to publish the site again.
- `fallback` — the known version (currently **1.6.2**, with its links, sizes and release notes). It's what goes into the generated HTML and what applies if GitHub doesn't respond. Update it every now and then.
- `platforms` — the texts for each option (requirements, description, help).

To use a different download address, fill in `url` in `fallback.windows` / `fallback.android` and leave `githubRepo` empty. Without a `url`, the button appears disabled with “em breve” (“coming soon”).

> The GitHub API allows 60 requests per hour per IP address without logging in. Beyond that, the visitor sees the `fallback` data — which is why it's worth keeping it up to date.

## Replacing the screenshots

The images live in `public/screens/` and the list (with each one's alternative text) in **`app/config/screens.ts`**. File names: `<id>-<light|dark>-<width>.webp`, in WebP.

| Group | Files | Original size | Generated widths |
| --- | --- | --- | --- |
| Computer | `desktop-notes`, `desktop-tasks`, `desktop-mindmap`, `desktop-links`, `desktop-timer`, `desktop-timer-session`, `desktop-settings` | 1280 × 800 window, at 2× (2560 × 1600) | 960, 1600, 2560 |
| Phone | `phone-notes`, `phone-note`, `phone-tasks`, `phone-mindmap`, `phone-links`, `phone-timer` | 390 × 844 screen, at 3× | 360, 720 |
| Foldable (open) | `fold-notes` | 690 × 830 screen, at 2× | 690, 1380 |
| Crops | `crop-editor` (formatting bar), `crop-mention` (the `@` list) | crops of the window at 2× | 765/1530 and 555/1110 |

To replace them, generate the same framing in both themes and replace the files, keeping the names. The module buttons in the sidebar of the computer screenshots must stay in the same place (the clickable areas are in `RAIL_HOTSPOTS`, in `app/config/modules.ts`).

## Structure

```text
4notes-web/
├── app/
│   ├── app.vue                 Shell: header, page, footer, theme and version
│   ├── pages/index.vue         The page (order of the sections)
│   ├── components/
│   │   ├── sections/           One section per file (Hero, Monte o seu 4notes, Modules, Features, Data, Download…)
│   │   └── ui/                 Brand, icons, frames, screenshot in the right theme, download button
│   ├── config/
│   │   ├── downloads.ts        Version, links and download texts
│   │   ├── modules.ts          The five modules (texts, Settings descriptions and screenshots)
│   │   ├── screens.ts          List of screenshots and alternative texts
│   │   └── site.ts             Title, slogan, description and sections
│   ├── composables/            Theme, GitHub version, on-screen entrance
│   ├── lib/                    Icons (the same as the app's) and Markdown for the release notes
│   └── assets/css/             tokens.css (the app's colors) and base.css
├── public/                     Screenshots, icons, sharing image, manifest
├── nuxt.config.ts              Metadata, theme before painting, static generation
└── vercel.json
```

## Visual identity

The official slogan is **“Você decide o que você precisa.”** (“You decide what you need.”). It lives in `app/config/site.ts` (`site.slogan`, used in the footer; the page title and description also include it) and is featured prominently in the opening. In the rest of the site the idea shows up in actions, not in repetition: choosing the modules, switching the theme, the menu and the device.


The site uses the **same tokens as the app** (4notes' `app/assets/css/tokens.css`: purple for actions, yellow for highlights, neutrals leaning toward purple, light and dark themes), the **same typeface family** (Segoe UI Variable on Windows; the system font elsewhere), the **same icons** (`app/lib/icons.ts`) and the **same brand**. The dotted background is the Mind Map's, and the module list mimics the app's sidebar, with the yellow indicator. No font, UI library or icon library is downloaded.

Two small differences, for accessibility: the lightest text gray (`--text-3`) is a little darker in the light theme, and the main buttons in the dark theme use a slightly deeper purple, so the white text has enough contrast.

## Accessibility and performance

- Keyboard navigation (skip-to-content link, visible focus, arrow keys in the module list and in the light × dark comparison), alternative text on every screenshot and AA contrast checked with axe in both themes.
- The system's “Reduce motion” setting turns off the animations (the brand's fold, the slogan's stroke, the screens' entrance, the modules snapping into the menu and the folder that appears line by line).
- The generated HTML already contains all the content; JavaScript comes in for choosing and switching modules, the theme and checking for the latest version. WebP images with responsive sizes and lazy loading, no external fonts.
