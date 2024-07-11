# Overhuset landing page

Overhuset's official landing page to showcase our services, partners, and
events. This project, built using SvelteKit, is styled with TailwindCSS, and
hosted on Vercel. We manage our meetups through a shared Google Sheet.

## Features

- Built with **SvelteKit** and **TypeScript** for modern, reactive, and
  type-safe components.
- **Bun** as runtime and package manager.
- Styled using **TailwindCSS** for rapid UI development.
- Component library: **Skeleton** for simple and reusable components.
- Meetup management with a shared **Google Sheet**[^1].
- Company-specific components allow companies to personalize their own subpage.
- Support for building custom constellation based pages for "rammeavtaler"

[^1]: This should probably be expanded into a separate service if we want to
scale this service.

## Pages

- **/kurs_og_seminarer**: This page showcases events. Data for the events come from the
  shared Google Sheet. Events include fields like title, description, location,
  company, date, time, links to presentations, and registration.
- **/konsulentselskap/[name]**: Each company has its dedicated component that they can
  freely edit. This provides a personalized space for companies to showcase
  themselves.
- /intranett: Separate route for everything related to Overhuset's intranet.
  Requires Google authentication from a whitelisted domain to access anything.

### Adding new intranet pages

The intranet pages are based on a simple Markdown parser that reads a Markdown
file (.md) and displays it on the page.

In order to add new items to the list, a new .md file needs to be added to the
projects article folder. In this case: `/static/intranett-articles/articles`.

1. Create file in /static/intranett-articles/articles named `<filename>.md`.
2. Add some markdown to the file Example markdown:

```markdown
# This is a header

## This is a second level header

This is a paragraph
```

3. In order to add it the navigation tree, edit the file
   `/src/lib/config/intranettTree.ts`. Add an object to the array at the desired
   position that matches the type, set status to `draft` to ensure it doesn't
   appear in the menu yet. Example:

```ts
[
  // ... rest of items
  {
    title: "Example title",
    slug: "example-title",
    markdow: "example.md",
    status: "draft",
  },
  // Rest
];
```

4. Commit changes and push.
5. When ready to "publish" the article and have it appear in the navigation
   tree, change status from `draft` -> `published`.

## Setup

### Prerequisites

- Ensure you have Node.js and bun installed.
- A `.env` file with the following secrets required for the /kompetanse pages to
  access its data in the Google Sheet, and login to work

```env
POSTEN_SHEET_ID=<long id>
POSTEN_SHEET_TAB_GID=<not as long id>
OVERHUSET_SHEET_ID=<long id>
OVERHUSET_SHEET_TAB_GID=<not as long id>

REDIRECT_URI

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

AZURE_CLIENT_ID
AZURE_CLIENT_SECRET
AZURE_TENANT

POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE


```

If you intend to work on the kompetanse pages locally, please ask for these ids.
Otherwise, you shouldn't need them.

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
// in later versions of bun, .env file might not be read, unless specified
bun --env-file=.env dev
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

The application is hosted on **Vercel**. Any merges into the main branch will
trigger a deployment to the live environment.

## Contributing

If you have any suggestions for improving the web page, please open an issue.
Then fork this repository, make your changes and open a pull request.

If you're a company and wish to update your component, navigate to
`/src/lib/components/companies/[your-company-name].svelte` and edit the
corresponding Svelte file.

In `/src/lib/components/companies/index.ts` there is a map of all the companies
and their corresponding logoUrl (placed in /static/companies/), webpage url and
more.

## Support

For any questions or issues, please open an issue on this repository or contact
the maintainers.
