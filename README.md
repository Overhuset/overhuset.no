# Overhuset landing page

Overhuset's official landing page to showcase our services, partners, and events. This project, built using SvelteKit, is styled with TailwindCSS, and hosted on Vercel. We manage our meetups through a shared Google Sheet.

## Features

- Built with **SvelteKit** and **TypeScript** for modern, reactive, and type-safe components.
- **Bun** as runtime and package manager.
- Styled using **TailwindCSS** for rapid UI development.
- Component library: **Skeleton** for simple and reusable components.
- Meetup management with a shared **Google Sheet**[^1].
- Company-specific components allow companies to personalize their own subpage.
- Support for building custom constellation based pages for "rammeavtaler"

[^1]: This should probably be expanded into a separate service if we want to scale this service.

## Pages

- **/kompetanse**: This page showcases events. Data for the events come from the shared Google Sheet. Events include fields like title, description, location, company, date, time, links to presentations, and registration.
- **/company/[name]**: Each company has its dedicated component that they can freely edit. This provides a personalized space for companies to showcase themselves.

## Setup

### Prerequisites

- Ensure you have Node.js and bun installed.
- A `.env` file with the following secrets required for the /kompetanse pages to access its data in the Google Sheet.

```env
POSTEN_SHEET_ID=<long id>
POSTEN_SHEET_TAB_GID=<not as long id>
OVERHUSET_SHEET_ID=<long id>
OVERHUSET_SHEET_TAB_GID=<not as long id>
```

If you intend to work on the kompetanse pages locally, please ask for these ids. Otherwise, you shouldn't need them.

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

If you have any suggestions for improving the web page, please open an issue. Then fork this repository, make your changes and open a pull request.

If you're a company and wish to update your component, navigate to `/src/lib/components/companies/[your-company-name].svelte` and edit the corresponding Svelte file.

In `/src/lib/components/companies/index.ts` there is a map of all the companies and their corresponding logoUrl (placed in /static/companies/), webpage url and more.

## Support

For any questions or issues, please open an issue on this repository or contact the maintainers.
