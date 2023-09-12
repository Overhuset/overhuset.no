import { client } from '$lib/svelteClient';

export async function load({ params }) {
	const data = await client.fetch(`*[_type == "company"]`);

	if (data) {
		return {
			pets: data
		};
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
