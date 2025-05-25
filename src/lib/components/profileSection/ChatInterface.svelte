<script>
	import ExpandIcon from '$lib/svgComponents/ExpandIcon.svelte';
	import { chatContextStore } from '$lib/stores/globalFilters.js';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let aiResponse = {};
	export let suggestedQueries = [];

	const dispatch = createEventDispatcher();

	let displayedText = '';
	let intervalId;
	let chunks = [];

	let inputText = '';
	let maxChatBoxHeight = 200; // Set a maximum height for the chat box
	let contentOverflowed = false;
	let chatBoxRef = null; // Reference to the chat box element

	let chatContext;

	function splitIntoSentences(text) {
		return text.match(/[^\.!\?]+[\.!\?]+/g) || [];
	}

	let showHeader = false;

	let chatTitle = '';
	let aiText = '';

	$: {
		if (typeof aiResponse === 'object' && aiResponse !== null) {
			chatTitle = aiResponse.queryTitle || '';
			aiText = aiResponse.response || '';
		} else {
			chatTitle = '';
			aiText = aiResponse || '';
		}
	}

	export function startStreaming(response) {
		let text = '';
		if (typeof response === 'object' && response !== null) {
			text = response.response || '';
		}
		const batchSize = 3;
		clearInterval(intervalId);
		chunks = [];
		showHeader = false;
		const sentences = splitIntoSentences(text.trim());
		let index = 0;

		intervalId = setInterval(() => {
			if (index < sentences.length) {
				const nextChunk = sentences[index].trim() + '';
				chunks = [...chunks, nextChunk];
				index++;
			} else {
				clearInterval(intervalId);
				showHeader = true;
			}
		}, 400);
	}

	function triggerChat() {
		if (aiResponse && Object?.keys(aiResponse).length > 0) {
			startStreaming(aiResponse);
		}
	}

	export function focusChatBox() {
		if (chatBoxRef) {
			setTimeout(async () => {
				// chatBoxRef.scrollIntoView({ behavior: 'smooth' })
				// chatBoxRef.focus();
			}, 500);
			chatBoxRef.scrollIntoView({ behavior: 'smooth', block: 'center' });

			const handleScrollEnd = () => {
				setTimeout(() => {
					chatBoxRef.focus();
				}, 50);
				window.removeEventListener('scrollend', handleScrollEnd);
			};

			window.addEventListener('scrollend', handleScrollEnd);
		}
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		dispatch('chatInput', inputText);
		inputText = '';
	}

	// auto-resize function
	function autoResize(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			handleFormSubmit(event);
			return;
		}

		const textarea = event.target;
		textarea.style.height = 'auto'; // reset
		textarea.style.height =
			textarea.scrollHeight <= maxChatBoxHeight
				? textarea.scrollHeight + 'px'
				: maxChatBoxHeight + 'px'; // set to scroll height
		contentOverflowed = textarea.scrollHeight > maxChatBoxHeight;
	}
	function removeContext() {
		$chatContextStore = null;
	}
	
	function setInputFromSuggestion(suggestion) {
		// inputText = suggestion.query;
		// chatBoxRef.focus();
		dispatch('fetchFromSuggestion', suggestion);
	}

	$: triggerChat(aiResponse);
	onMount(() => {
		const unsubscribe = chatContextStore.subscribe((value) => {
			chatContext = value;
			if (chatContext) {
				focusChatBox();
			}
		});

		return () => {
			unsubscribe();
		};
	});

	onDestroy(() => clearInterval(intervalId));
</script>

<div class="bg-white rounded-lg shadow p-6 h-full flex flex-col justify-between">
	<h3 class="text-black text-center font-semibold">
		&nbsp;
		{#if showHeader}
			<span in:fade={{ duration: 250 }}> {chatTitle} </span>
		{/if}
	</h3>
	<div
		class="overflow-y-auto text-gray-dark pr-2 max-h-[clamp(200px,40vh,400px)] p-4 leading-8 whitespace-pre-wrap flex-grow flex flex-col "
	>
		<!-- {displayedText} version 1 -->

		<!-- verions 2 -->

		<div class="max-h-full">
			<!-- {#each chunks as chunk, i (i)}
				<span in:fade={{ duration: 200 }} class="inline-block mr-1">{chunk}</span>
			{/each} -->

			{#each chunks as sentence, i (i)}
				<span in:fade={{ duration: 250 }} class="mb-2 mr-1">{sentence}</span>
			{/each}
		</div>
	</div>

	<div>
		<h2 class="text-2xl font-bold text-center text-black mb-6">What can I help you with today?</h2>
		{#if inputText?.length === 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				{#each suggestedQueries as query}
					<button
						class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
						on:click={() => setInputFromSuggestion(query)}
					>
						<h3 class="font-medium text-gray-800">{query.title}</h3>
						<p class="text-gray-500 text-sm mt-1">{query.query}</p>
					</button>
				{/each}
			</div>
		{/if}
		{#if chatContext}
			<div class="flex items-center gap-2 flex-wrap mb-2">
				<div class="bg-blue-100 text-accent-blue rounded-full px-3 py-1 flex items-center text-sm">
					@{chatContext.title}
					<button
						on:click={removeContext}
						class="ml-2 text-purple-600 hover:text-purple-900 focus:outline-none"
					>
						&times;
					</button>
				</div>
			</div>
		{/if}
		<div class="relative">
			<!-- <input 
        type="text" 
        placeholder="Explore your performance. Explore yourself..." 
        class="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      /> -->
			<div
				class="relative w-full border rounded-lg focus-within:ring-2 focus-within:ring-purple-500"
			>
				{#if contentOverflowed}
					<button
						class="absolute right-3 top-2 text-gray-dark hover:bg-gray-light hover:text-black p-2 rounded-lg"
						><ExpandIcon /></button
					>
				{/if}
				<form action="" on:submit={handleFormSubmit}>
					<textarea
						bind:this={chatBoxRef}
						bind:value={inputText}
						placeholder="Explore your performance. Explore yourself..."
						rows="1"
						on:keydown={autoResize}
						class=" w-full p-4 pr-12 rounded-lg focus:outline-none resize-none {contentOverflowed
							? 'overflow-auto'
							: 'overflow-hidden'} leading-relaxed"
					></textarea>
				</form>
			</div>

			<!-- <button class="absolute right-2 bottom-2 bg-accent-blue text-white p-2 rounded-full">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 -rotate-45"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M14 5l7 7m0 0l-7 7m7-7H3"
				/>
			</svg>
		</button> -->
		</div>
	</div>
</div>
