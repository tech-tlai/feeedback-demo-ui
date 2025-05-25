<script>
	// Import your existing components
	import ProfileCard from '$lib/components/profileSection/Profile.svelte';
	import ChatHistory from '$lib/components/profileSection/ChatHistory.svelte';
	import { OtherClassSummary } from '$lib';
	import ChatInterface from '$lib/components/profileSection/ChatInterface.svelte';
	import AllClassesSummary from '$lib/components/teacher/AllClassesSummary.svelte';
	import { fetchApi } from '$lib/apiUtils.js';
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

	const chatHistory = [
		{ uuid: 1, text: 'How did Class 10 perform in the end-term exam?' },
		{ uuid: 2, text: 'What are the weak areas in Mathematics for Class 7?' },
		{ uuid: 3, text: 'Which students from Class 5 showed the most improvement in English?' },
		{ uuid: 4, text: 'What can be done to improve vocabulary for Class 3A?' }
		// Add more as needed, incrementing the id
	];

	const pinnedChats = 12;
	const suggestedQueries = [
		{
			id: 1,
			title: 'Subject specific insights',
			query: 'How does class 5 perform in Mathematics?'
		},
		{ id: 2, title: 'Analyze weak areas', query: 'Weaknesses of class 3 students in English.' }
	];

	// Helper function to determine score color
	function getScoreColor(status) {
		if (status === 'success') return 'bg-green-light text-green-dark';
		if (status === 'warning') return 'bg-orange-light text-orange-dark';
		return 'bg-gray-light text-gray-dark';
	}

	let selectedChat = null;
	let chatDetails = null;
	let loadingChatDetails = false;
	let chatError = null;

	async function handleChatSelection(e) {
		const chat = e.detail;
		selectedChat = chat;
		chatDetails = null;
		chatError = null;
		if (!chat || (!chat.id && !chat.uuid)) return;
		loadingChatDetails = true;
		try {
			const data = await fetchApi(`/apis/teacher/chat/details/${chat.id || chat.uuid}`);
			chatDetails = { queryTitle: data.title, response: data.details };
		} catch (err) {
			chatError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}

	async function handleFetchFromSuggestion(e) {
		const suggestion = e.detail;
		console.log('suggestion', suggestion);
		chatDetails = null;
		chatError = null;
		loadingChatDetails = true;
		try {
			const data = await fetchApi(`/apis/teacher/chat/suggestions/${suggestion.id}`);
			chatDetails = { queryTitle: data.query, response: data.response };
		} catch (err) {
			chatError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}

	async function handleChatInput(e) {
		const inputText = e.detail;
		chatDetails = null;
		chatError = null;
		loadingChatDetails = true;
		try {
			const data = await fetchApi('/apis/teacher/chat', {
				method: 'POST',
				body: { title: inputText }
			});
			chatDetails = { queryTitle: data.title, response: data.response };
		} catch (err) {
			chatError = err.message;
		} finally {
			loadingChatDetails = false;
		}
	}
</script>

<div class="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
	<!-- Left column -->
	<div class="lg:col-span-3 space-y-4">
		<ProfileCard {...profileData} />

		<ChatHistory
			history={chatHistory}
			pinnedCount={pinnedChats}
			on:chatSelected={handleChatSelection}
			selected={selectedChat}
		/>
	</div>

	<!-- Main Content Area -->
	<div class="lg:col-span-9 space-y-5 h-full">
		<div class="flex flex-col gap-4 h-full">
			<!-- Horizontal Scrollable Class Cards -->
			<!--  -->
			<AllClassesSummary />
			<div class=" flex-grow">
				<ChatInterface
					aiResponse={chatDetails}
					{suggestedQueries}
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
