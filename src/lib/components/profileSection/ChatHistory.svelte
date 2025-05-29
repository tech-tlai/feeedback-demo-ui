<script>
	import { Tabs, ChatItem, ContextMenu } from '$lib';

	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let history = [];
	export let pinnedChats = [];
	export let pinnedCount = 0;
	const dispatch = createEventDispatcher();

	$: console.log('history', history);

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

	<div class="space-y-3 mt-4 h-[clamp(300px,320px,384px)] overflow-y-auto">
		{#if selectedTab === 0}
			{#each history as chat}
				<div
					class="flex justify-between items-center w-full rounded-lg hover:bg-gray-50 relative"
					class:bg-gray-100={selected && (selected.id || selected.uuid) === (chat.id || chat.uuid)}
					in:fade={{ duration: 250 }}
				>
					<ChatItem {chat} {selected} onSelect={handleChatSelect} />
					<!-- <ContextMenu {chat} on:pin={handleMenuAction} on:delete={handleMenuAction} /> -->
					<ContextMenu menuItems={chatHistMenuItems} on:select={(e) => handleMenuSelect(e, chat)} />
				</div>
			{/each}
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
</div>
