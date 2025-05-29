<script>
	import Profile from '$lib/components/profileSection/Profile.svelte';
	import StatisticsSection from '$lib/components/profileSection/StatisticsSection.svelte';
	import ChatHistory from '$lib/components/profileSection/ChatHistory.svelte';
	import ChatInterface from '$lib/components/profileSection/ChatInterface.svelte';
	import ExamSchedule from '$lib/components/profileSection/ExamSchedule.svelte';
	import Achievements from '$lib/components/profileSection/Achievements.svelte';
	import { fetchApi } from '$lib/apiUtils.js';
	import { onMount } from 'svelte';

	// Sample data
	export let profileData = {
		name: 'Kavya Reddy',
		role: 'STUDENT',
		class_: '3',
		id: '321468',
		school: "St. Mary's Higher Secondary School",
		location: 'Trivandrum',
		image: '/kavya_reddy.png'
	};

	const statsData = [
		{
			title: 'MARKS',
			value: '190',
			total: '300',
			icon: '📋',
			color: 'bg-purple-100'
		},
		{
			title: 'CLASS POSITION',
			value: 'Top',
			percentage: '50%',
			icon: '🏅',
			color: 'bg-orange-100'
		},
		{
			title: 'OVERALL POSITION',
			value: 'Top',
			percentage: '70%',
			icon: '🏆',
			color: 'bg-yellow-100'
		},
		{
			title: 'GOALS ACHIEVED',
			value: '9',
			total: '15',
			icon: '🎯',
			color: 'bg-red-100'
		}
	];

	let chatHistory = [];

	const suggestedQueries = [
		{ id: 1, title: 'Subject specific insights', query: 'How did I perform in Mathematics?' },
		{ id: 2, title: 'Analyze weak areas', query: 'Where am I losing marks in Geography?' }
	];

	const achievements = [
		{
			title: 'Achiever of the month',
			metadata: 'Metadata',
			icon: '🏅',
			color: 'bg-purple-100'
		},
		{
			title: 'Mathematics Mid-term',
			target: '85%',
			score: '88%',
			icon: '👍',
			color: 'bg-green-100'
		}
	];

	let chatInterface = null; // Reference to the ChatInterface component

	let selectedChat = null;
	let chatDetails = null;
	let loadingChatDetails = false;
	let chatError = null;

	let pinnedChats = [];

	let selectedTab = 0;

	function handleClick() {
		if (chatInterface) {
			chatInterface.focusChatBox(); // Call the focusChatBox method from ChatInterface
		}
	}

	async function handleChatSelection(e) {
		const chat = e.detail;
		selectedChat = chat;
		chatDetails = null;
		chatError = null;
		if (!chat || (!chat.id && !chat.uuid)) return;
		loadingChatDetails = true;
		try {
			const data = await fetchApi(
				`/apis/student/chat/details/${chat.id || chat.uuid}?title=${chat.text}`,
				{ action: 'fetch', entity: 'chat details' }
			);
			chatDetails = { queryTitle: data.title, response: data.details };
		} catch (err) {
			chatError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}

	async function handleFetchFromSuggestion(e) {
		const suggestion = e.detail;
		chatDetails = null;
		chatError = null;
		loadingChatDetails = true;
		try {
			const data = await fetchApi('/apis/student/chat', {
				method: 'POST',
				body: { title: suggestion.query },
				action: 'fetch',
				entity: 'chat suggestion'
			});
			setChatDetailsAndAddToHistory(data);
		} catch (err) {
			chatError = err.message;
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
		chatError = null;
		loadingChatDetails = true;
		try {
			const data = await fetchApi('/apis/student/chat', {
				method: 'POST',
				body: { title: inputText },
				action: 'fetch',
				entity: 'chat input'
			});
			setChatDetailsAndAddToHistory(data);
		} catch (err) {
			chatError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}

	function handlePinChat(chat) {
		if (!pinnedChats.some((c) => (c.id || c.uuid) === (chat.id || chat.uuid))) {
			const maxOrder =
				pinnedChats.length > 0 ? Math.max(...pinnedChats.map((c) => c.order || 1)) : 1;
			const order = maxOrder + 1;
			console.log('new order-student', order);
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
		console.log('pinnedChats', pinnedChats);
	}

	onMount(async () => {
		try {
			const data = await fetchApi('/apis/student/chat', {
				action: 'fetch',
				entity: 'chat history'
			});
			chatHistory = data;
		} catch (err) {
			console.error('Failed to fetch chat history:', err);
		}
	});
</script>

<main class="min-h-screen">
	<div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
		<!-- Left column -->
		<div class="lg:col-span-3 space-y-5">
			<Profile {...profileData} />
			<ChatHistory
				history={chatHistory}
				on:chatSelected={handleChatSelection}
				selected={selectedChat}
				on:chatMenuAction={handleChatMenuAction}
				{pinnedChats}
				bind:selectedTab
			/>
		</div>

		<!-- Middle column -->
		<div class="lg:col-span-6 space-y-5">
			<div class="flex flex-col gap-4 h-full">
				<div>
					<h2 class="text-base font-medium text-gray-700 mb-4">RECENT RESULT - MID TERM '24</h2>
					<StatisticsSection stats={statsData} />
				</div>
				<ChatInterface
					aiResponse={chatDetails}
					{suggestedQueries}
					bind:this={chatInterface}
					on:fetchFromSuggestion={handleFetchFromSuggestion}
					on:chatInput={handleChatInput}
				/>
			</div>
		</div>

		<!-- Right column -->
		<div class="lg:col-span-3 space-y-5">
			<ExamSchedule />
			<Achievements items={achievements} />
		</div>
	</div>
</main>
