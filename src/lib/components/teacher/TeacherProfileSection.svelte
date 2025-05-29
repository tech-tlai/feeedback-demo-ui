<script>
	// Import your existing components
	import { onMount } from 'svelte';
	import ProfileCard from '$lib/components/profileSection/Profile.svelte';
	import ChatHistory from '$lib/components/profileSection/ChatHistory.svelte';
	import { OtherClassSummary } from '$lib';
	import ChatInterface from '$lib/components/profileSection/ChatInterface.svelte';
	import AllClassesSummary from '$lib/components/teacher/AllClassesSummary.svelte';
	import { fetchApi } from '$lib/apiUtils.js';
	import { getErrorMessage } from '$lib/utils';
	export let profileData = {
		name: 'Sabdeep Sharma',
		role: 'TEACHER',
		//   class_: '10',
		id: '321468',
		school: "St. Mary's Higher Secondary School",
		location: 'Trivandrum',
		image: '/sandeep_pic.png'
	};
	// Sample class data for the horizontal scrollable area
	export let classes = [];

	let chatHistory = [];
	let pinnedChats = [];
	let selectedTab = 0;
	let chatInterface = null;

	let loadingChatHistory = false;
	let chatHistoryError = null;
	let loadingChatDetails = false;
	let chatDetailsError = null;

	const suggestedQueries = [
		{
			id: 1,
			title: 'Subject specific insights',
			query: 'How does class 5 perform in Mathematics?'
		},
		{ id: 2, title: 'Analyze weak areas', query: 'Weaknesses of class 3 students in English.' }
	];

	let selectedChat = null;
	let chatDetails = null;

	async function handleChatSelection(e) {
		const chat = e.detail;
		selectedChat = chat;
		chatDetails = null;
		chatDetailsError = null;
		if (!chat || (!chat.id && !chat.uuid)) return;
		loadingChatDetails = true;
		try {
			const data = await fetchApi(
				`/apis/teacher/chat/details/${chat.id || chat.uuid}?title=${chat.text}`,
				{ action: 'fetch', entity: 'chat details' }
			);
			chatDetails = { queryTitle: data.title, response: data.details };
		} catch (err) {
			chatDetailsError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}

	async function handleFetchFromSuggestion(e) {
		const suggestion = e.detail;
		chatDetails = null;
		chatDetailsError = null;
		loadingChatDetails = true;
		try {
			const data = await fetchApi(`/apis/teacher/chat`, {
				method: 'POST',
				body: { title: suggestion.query },
				action: 'fetch',
				entity: 'chat suggestion'
			});
			setChatDetailsAndAddToHistory(data);
		} catch (err) {
			chatDetailsError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}

	function addNewChatToHistory(data) {
		const newChat = { uuid: data.id, text: data.title };
		chatHistory = [...chatHistory, newChat];
		selectedChat = newChat;
	}

	function setChatDetailsAndAddToHistory(data) {
		chatDetails = { queryTitle: data.title, response: data.response };
		addNewChatToHistory(data);
	}

	async function handleChatInput(e) {
		const inputText = e.detail;
		chatDetails = null;
		chatDetailsError = null;
		loadingChatDetails = true;
		try {
			const data = await fetchApi('/apis/teacher/chat', {
				method: 'POST',
				body: { title: inputText },
				action: 'fetch',
				entity: 'chat input'
			});
			setChatDetailsAndAddToHistory(data);
		} catch (err) {
			chatDetailsError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}

	function handlePinChat(chat) {
		if (!pinnedChats.some((c) => (c.id || c.uuid) === (chat.id || chat.uuid))) {
			const maxOrder = pinnedChats.length > 0 ? Math.max(...pinnedChats.map(c => c.order || 1)) : 1;
			const order = maxOrder + 1;
			pinnedChats = [...pinnedChats, { ...chat, order }];
			selectedTab = 1;
		}
	}

	function handleUnpinChat(chat) {
		pinnedChats = pinnedChats.filter((c) => (c.id || c.uuid) !== (chat.id || chat.uuid));
	}

	function handleChatMenuAction(e) {
		const { chat, action } = e.detail;
		switch (action) {
			case 'pin':
				handlePinChat(chat);
				break;
			case 'unpin':
				handleUnpinChat(chat);
				break;
			// Add more actions as needed
			default:
				console.log('Unknown chat menu action:', action, chat);
		}
	}

	async function fetchChatHistory() {
		loadingChatHistory = true;
		chatHistoryError = null;
		try {
			const data = await fetchApi('/apis/teacher/chat', {
				action: 'fetch',
				entity: 'chat history'
			});
			
			chatHistory = data;
		} catch (err) {
			chatHistoryError = err.message;
		} finally {
			loadingChatHistory = false;
		}
	}

	onMount(() => {
		fetchChatHistory();
	});
</script>

<div class="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
	<!-- Left column -->
	<div class="lg:col-span-3 space-y-4">
		<ProfileCard {...profileData} />

		<ChatHistory
			history={chatHistory}
			on:chatSelected={handleChatSelection}
			selected={selectedChat}
			on:chatMenuAction={handleChatMenuAction}
			{pinnedChats}
			bind:selectedTab
			loadingHistory={loadingChatHistory}
			historyError={chatHistoryError}
			loadingDetails={loadingChatDetails}
			detailsError={chatDetailsError}
		/>
	</div>

	<!-- Main Content Area -->
	<div class="lg:col-span-9 space-y-5 h-full">
		<div class="flex flex-col gap-4 h-full">
			<!-- Horizontal Scrollable Class Cards -->
			<AllClassesSummary />
			<div class=" flex-grow">
				<ChatInterface
					aiResponse={chatDetails}
					{suggestedQueries}
					bind:this={chatInterface}
					on:fetchFromSuggestion={handleFetchFromSuggestion}
					on:chatInput={handleChatInput}
				/>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(body) {
		font-family: 'Roboto', sans-serif;
	}
</style>
