<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
	import { LegacyDatatable, SearchBar, Button, SkelDataTable } from '$lib';
	import { pinnedChatStore } from '$lib/stores/qpgStore.js';
	import { get } from 'svelte/store';

	const dispatch = createEventDispatcher();

	export let questionStore = {};

	$: console.log('questionStore in AI resposne', $questionStore);

	$: questions = $questionStore.data && $questionStore.data?.length > 0 ? $questionStore.data : [];
	$: console.log('questions arr in AI Resposne', questions);
	// export let title = '';
	$: ({ title = 'Temporary title', id: chatId } = $questionStore ? $questionStore : {});
	export let isLoading = false;

	let tableData = [];
	let searchValue = '';
	let isMounted = false;

	let customRenderers = {
		// Renders channel thumbnail, name and description
		question: (data) => `
      <div >
    <p class="text-black mb-2 font-medium">${data.question?.questionText}</p>
  <div class="flex items-start">
    <span class="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">${data.type}</span>
    <span class="text-black">${data.answerText}</span>
  </div>
</div>
    `
	};

	let actionConfig = [
		{ actionName: 'view', actionIconName: 'visibility' },
		{ actionName: 'edit', actionIconName: 'edit' },
		{ actionName: 'delete', actionIconName: 'delete' }
	];

	let tableHeadersDisplay = [
		{ key: 'question', name: 'Question', width: '45%' },
		{ key: 'combinedOptions', name: 'Options', width: '40%' },
		// { key: 'type', name: 'Type' },
		// { key: 'topic', name: 'Topic' },
		{ key: 'difficulty', name: 'Level' }
		// { key: '', name: 'Actions' },
	];

	async function createTableData() {
		if (!questions?.error && questions?.length > 0 && isMounted)
			// Format data for display
			tableData = questions?.map((questionDetails) => ({
				...questionDetails,
				question: {
					questionText: questionDetails?.question,
					type: questionDetails?.type,
					correctAnswer: questionDetails?.correct_answer
				},

				options: questionDetails?.options,
				difficulty: questionDetails?.difficulty
			}));
		else {
			tableData = [];
		}
	}

	function handleTableAction(event) {
		const { actionName, actionData } = event.detail;

		if (actionName === 'delete') {
			// showDeletionModal = true;
			// selectedItemForDeletion = actionData;
			dispatch('deleteQuestion', actionData);
		}
		if (actionName === 'edit') {
			// goto(`channels/${actionData?.uuid}/details/edit`);
			dispatch('editQuestion', actionData);
		}
		if (actionName === 'view') {
			goto(`channels/${actionData?.uuid}/details`);
		}
	}

	function sendSearchValueToDatatable(e) {
		searchValue = e.detail;
	}

	function handlePinChat() {
		const isPinned = get(pinnedChatStore).some((item) => item.chatId === chatId);
		pinnedChatStore.update((chat) => {
			if (isPinned) {
				return chat.filter((item) => item.chatId !== chatId);
			} else {
				return [...chat, { chatId, title }];
			}
		});
	}

	function findPinnedStatus(pinnedChats) {
		if (pinnedChats.find((item) => item.chatId == chatId)) {
			return true;
		} else {
			return false;
		}
	}

	$: isPinnedChat = findPinnedStatus($pinnedChatStore);
	$: createTableData(isMounted, questions);

	onMount(() => {
		isMounted = true;
	});
</script>

<div class="px-8 w-full">
	{#if isLoading}
		<SkelDataTable />
	{:else if questions?.length > 0}
		<h1 class="text-2xl font-semibold text-center mb-6 text-black">{title}</h1>
		<div class="mb-4 flex items-center gap-4">
			<div class="flex-grow">
				<SearchBar
					on:handleSearchValue={sendSearchValueToDatatable}
					placeholder={'Search by question'}
					searchButton={false}
				/>
			</div>

			<Button
				btnType="custom"
				customClass={'bg-accent-blue text-white text-sm font-medium px-6 py-2 shadow-sm rounded-[4px]'}
				>+ Add question</Button
			>
			<Button
				btnType="custom"
				on:click={handlePinChat}
				customClass={'bg-blue-50 text-black text-sm font-medium px-6 py-2 shadow-sm rounded-[4px] shadow-md border border-accent-blue'}
				>{isPinnedChat ? 'Unpin chat' : '📌 Pin chat'}</Button
			>
		</div>
		<div classs="w-full bg-white">
			<LegacyDatatable
				{tableHeadersDisplay}
				{tableData}
				{customRenderers}
				{searchValue}
				entriesPerPage={10}
				showPagination={true}
				actionConfigObject={actionConfig}
				on:tableActionClick={handleTableAction}
				headerTheme="custom"
				customTheme={{ headerBg: 'bg-white', headerText: 'text-black', bodyText: 'text-black' }}
			/>
		</div>
	{:else}
		<p>No questions available to display.</p>
	{/if}
</div>
