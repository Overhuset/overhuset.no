import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    console.log("URL=", url.pathname);
    // Sjekker om URL-en ender med '/'
    if (url.pathname.endsWith('/')) {
        console.log("Redirecting to", url.pathname.slice(0, -1));
        const newLocation = url.pathname.slice(0, -1); // Fjerner skråstrek fra slutten
        return new Response(undefined, {
            status: 301, // Permanent redirect, bruk 302 for en midlertidig redirect hvis det er ønskelig
            headers: {
                'Location': newLocation,
                // Sørg for å inkludere alle nødvendige CORS-headers hvis dette er relevant
            }
        });
    }
};