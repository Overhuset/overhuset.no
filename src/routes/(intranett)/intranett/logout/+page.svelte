<script lang="ts">
	import { goto } from '$app/navigation';

 
	async function handleSignOut() {
		const response = await fetch('/intranett/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
 
		if (response.ok) {
			goto('/intranett', {
				replaceState: true,
				invalidateAll: true
			});
		}
	}
</script>


<div>
<h1>.. or sign out</h1>

	<button on:click={handleSignOut}>sign out </button>

	
</div>
