<script>
	import MainContent from '$lib/components/qpg/MainContent.svelte';
	import { genHistoryStore } from '$lib/stores/qpgStore';
	import { onMount } from 'svelte'; // Import onMount
	import { page } from '$app/stores';

	export let data;
	export let isLoading = true;


	onMount(() => {
		if (data && data.history) {
			genHistoryStore.set({ data: data.history });
			isLoading = false;
		} else {
			console.warn('data.history is undefined or null.');
			isLoading = false;
		}
	});
</script>

<div>

	<MainContent {isLoading} questionStore={genHistoryStore} />
</div>
