# Overhuset landing page

This is a SvelteKit project is a landing page for Overhuset. It's written in TypeScript and styled with TailwindCSS. The app is hosted on Vercel and meetups are managed through a shared Google Sheet.

## Features

- Built with **SvelteKit** and **TypeScript** for modern, reactive, and type-safe components.
- **Bun** as runtime and package manager.
- Styled using **TailwindCSS** for rapid UI development.
- Component library: **Skeleton** for simple and reusable components.
- Meetup management with a shared **Google Sheet**. (should probably be )
- Company-specific components allow companies to personalize their own subpage.

## Pages

- **/kompetanse**: This page showcases events. Data for the events come from the shared Google Sheet. Events include fields like title, description, location, company, date, time, links to presentations, and registration.
- **/company/[name]**: Each company has its dedicated component that they can freely edit. This provides a personalized space for companies to showcase themselves.

## Setup

### Prerequisites

- Ensure you have Node.js and bun installed.
- A `.env` file with the secret "SHEET_ID" is required for the /kompetanse pages to access its data in the Google Sheet. If you need this for local development, please ask for this.

### Local Development

1. Clone the repository:

```bash
   git clone [repo-url] overhuset
   cd overhuset
```

2. Install dependencies:

```bash
   bun install
```

3. Run the application:

```bash
   bun dev
```

The app should now be running on `http://localhost:5173`.

4. Build the application locally:

```bash
  bun run build
```

5. Preview build locally:

```bash
  bun preview

```

The production-worthy app should now be running on `http://localhost:4173`.

## Deployment

The application is hosted on **Vercel**. Any merges into the main branch will trigger a deployment to the live environment.

## Contributing

If you're a company and wish to update your component, navigate to `/src/lib/components/companies/[your-company-name].svelte` and edit the corresponding Svelte file.

## Support

For any questions or issues, please open an issue on this repository or contact the maintainers.
