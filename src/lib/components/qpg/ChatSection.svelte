<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import SkelChatHistory from '$lib/components/loadingSkeletons/SkelChatHistory.svelte';
	import { LegacyTabs } from '$lib';
	import { ChatHistory, PinnedChats } from '$lib/components/qpg';
	import { createEventDispatcher } from 'svelte';
	import QuestionGenerationForm from '$lib/components/qpg/QuestionGenerationForm.svelte';
	import { onMount } from 'svelte';
	import { chatHistoryStore, pinnedChatStore } from '$lib/stores/qpgStore.js';

	let tabs = [
		{
			id: 1,
			text: 'Create',
			component: QuestionGenerationForm,
			clicked: false,
			textDisplay: 'Create'
		},
		{ id: 2, text: 'ChatHistory', component: ChatHistory, clicked: false, textDisplay: 'History' },
		{ id: 3, text: 'Pinned', component: PinnedChats, clicked: false, textDisplay: 'Pinned' }
	];

	let activeTabText = tabs[1]?.text;
	let componentToRender = tabs[1];

	function handleActiveTab(e) {
		activeTabText = e.detail;
		let [matchedObj] = activeTabText
			? tabs?.filter((tab) =>
					tab?.text?.toLowerCase().trim().includes(activeTabText?.toLowerCase().trim())
				)
			: [componentToRender];
		componentToRender = matchedObj;
	}

	let historyItems = [
		// { subject: 'Social science', count: '50 Qs', topic: 'Geography' },
	];

	let chatHistoryLoading = false;
	let error = null;

	// async function fetchHistory() {
	// 	chatHistoryLoading = true;
	// 	error = null;
	// 	try {
	// 		const response = await fetch('/apis/qpg/questions/history');
	// 		if (!response.ok) throw new Error('Failed to fetch question generation history');

	// 		historyItems = await response.json();
	// 		console.log('historyitems', historyItems);
	// 	} catch (err) {
	// 		error = err.message;
	// 	} finally {
	// 		chatHistoryLoading = false;
	// 	}
	// }

	onMount(() => {
		//    historyItems = $chatHistoryStore
	});
</script>

<LegacyTabs bind:tabs on:handleActiveTab={handleActiveTab} {activeTabText} />

<!-- Content based on active tab -->
<div class="flex-grow overflow-y-auto">
	<svelte:component
		this={componentToRender.component}
		historyItems={$chatHistoryStore}
		pinneItems={$pinnedChatStore}
		orientation="vertical"
		on:submit
	/>
</div>
