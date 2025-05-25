<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import { createEventDispatcher } from 'svelte';

	export let history = [];
	export let pinnedCount = 0;
	const dispatch = createEventDispatcher();

	let selectedTab = 0;
	export let selected;

	const tabs = [
		{ label: 'Chat History', icon: '📚' },
		{ label: 'Pinned Chats', icon: '📌' }
	];

	function handleChatSelect(chat) {
		dispatch('chatSelected', chat);
	}
</script>

<div class="bg-white rounded-lg shadow p-4">
	<Tabs
		tabs={tabs.map((tab, index) => {
			return { id: index, text: tab.label };
		})}
		icons={tabs.map((tab) => tab.icon)}
		bind:selectedIndex={selectedTab}
	/>

	<div class="space-y-3 mt-4 h-[clamp(300px,320px,384px)] overflow-y-auto">
		{#if selectedTab === 0}
			{#each history as chat}
				<button
					class="p-3 text-left rounded-lg text-black text-sm  hover:bg-gray-50 cursor-pointer {selected && ((selected.id || selected.uuid) === (chat.id || chat.uuid)) ? 'bg-gray-100 hover:bg-gray-100' : ''}"
					class:bg-gray-100={selected && ((selected.id || selected.uuid) === (chat.id || chat.uuid))}
					on:click={() => handleChatSelect(chat)}
				>
					{chat.text}
				</button>
			{/each}
		{:else}
			<div class="text-gray-500 text-sm">You have {pinnedCount} pinned chats.</div>
		{/if}
	</div>
</div>
