<script>
	import { Tabs, ChatItem, ContextMenu,SkelChatHistory } from '$lib';

	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let history = [];
	export let pinnedChats = [];
	export let pinnedCount = 0;
	export let loadingHistory = false;
	export let historyError = null;
	export let loadingDetails = false;
	export let detailsError = null;
	const dispatch = createEventDispatcher();

	export let selectedTab = 0;
	export let selected;

	const tabs = [
		{ label: 'Chat History', icon: '📚' },
		{ label: 'Pinned Chats', icon: '📌' }
	];

	function handleChatSelect(chat) {
		dispatch('chatSelected', chat);
	}

	const chatHistMenuItems = [{ id: 1, label: 'Pin', value: 'pin' }];

	const pinnedChatMenuItems = [{ id: 1, label: 'Unpin', value: 'unpin' }];

	function handleMenuSelect(event, chat) {
		const { item } = event.detail;
		dispatch('chatMenuAction', { chat, action: item.value });
	}

	$: history = history && history.length ? [...history].sort((a, b) => b.uuid - a.uuid) : history;
	$: pinnedChats =
		pinnedChats && pinnedChats.length
			? [...pinnedChats].sort((a, b) => b.order - a.order)
			: pinnedChats;

</script>

<div class="bg-white rounded-lg shadow p-4">
	<Tabs
		tabs={tabs.map((tab, index) => {
			return { id: index, text: tab.label };
		})}
		icons={tabs.map((tab) => tab.icon)}
		bind:selectedIndex={selectedTab}
	/>

	{#if loadingHistory}
		<SkelChatHistory/>
	{:else if historyError}
		<div class="flex justify-center items-center text-red-500 text-center py-2 h-64">{historyError}</div>
	{:else}
		<div class="space-y-3 mt-4 h-[clamp(300px,320px,384px)] overflow-y-auto relative">
			{#if selectedTab === 0}
				{#each history as chat}
					<div
						class="flex justify-between items-center w-full rounded-lg hover:bg-gray-50 relative"
						class:bg-gray-100={selected &&
							(selected.id || selected.uuid) === (chat.id || chat.uuid)}
						in:fade={{ duration: 250 }}
					>
						<ChatItem {chat} {selected} onSelect={handleChatSelect} />
						<ContextMenu
							menuItems={chatHistMenuItems}
							on:select={(e) => handleMenuSelect(e, chat)}
						/>
					</div>
				{/each}
				{#if loadingDetails}
					<div class="absolute">
						<span class="loader mr-2"></span> Loading chat details...
					</div>
				{:else if detailsError}
					<div class="text-red-500 text-center py-2">{detailsError}</div>
				{/if}
			{:else if pinnedChats?.length === 0}
				<div class="text-gray-500 text-sm text-center">No pinned chats.</div>
			{:else}
				{#each pinnedChats as chat}
					<div
						class="flex justify-between items-center w-full rounded-lg hover:bg-gray-50 relative"
						in:fade={{ duration: 250 }}
					>
						<ChatItem {chat} {selected} onSelect={handleChatSelect} />
						<ContextMenu
							menuItems={pinnedChatMenuItems}
							on:select={(e) => handleMenuSelect(e, chat)}
						/>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	.loader {
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
