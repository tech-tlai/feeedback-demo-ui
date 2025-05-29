<script>
	import { clickOutside } from '$lib/utils';
    import { createEventDispatcher } from 'svelte';

	export let menuItems = [{id:1, label:"label", value:'value'}]; // Array of { label, value }
	
	const dispatch = createEventDispatcher();

	let open = false;

	function toggleMenu() {
            
		open = !open;
	}

    $:console.log('menu clicked',open)
	function closeMenu() {
		open = false;
	}

	function handleClick(item) {
		dispatch('select', {  item });
		closeMenu();
	}
</script>

<div class="relative" >
	<!-- Kebab icon -->
	<button on:click={toggleMenu} class="p-1 rounded hover:bg-gray-200">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<circle cx="12" cy="5" r="1.5" />
			<circle cx="12" cy="12" r="1.5" />
			<circle cx="12" cy="19" r="1.5" />
		</svg>
	</button>

	{#if open}
		<div class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
			<ul class="text-sm text-gray-700">
				{#each menuItems as item}
					<li>
						<button
							class="w-full px-4 py-2 hover:bg-gray-100 text-left"
							on:click={() => handleClick(item)}
						>
							{item.label}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>