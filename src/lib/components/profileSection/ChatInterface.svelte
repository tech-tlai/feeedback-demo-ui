<script>
	import ExpandIcon from '$lib/svgComponents/ExpandIcon.svelte';
	import { chatContextStore } from '$lib/stores/globalFilters.js';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { aiResponse } from '$lib/data';

	export let fullResponse =
		"Rahul Sharma is facing challenges in English, particularly in comprehension and grammar accuracy. His performance indicates a need for focused reinforcement in foundational concepts, as inconsistencies in sentence structure and vocabulary usage are affecting his overall scores. Encouraging more structured reading activities and targeted exercises can help build his confidence and improve retention. A gradual, consistent approach to practice will be beneficial in enhancing his understanding and performance over time. With the right support, steady progress is achievable.";

	let displayedText = '';
	let intervalId;

	// robotic word by word effect
	// export function startStreaming() {
	// 	displayedText = '';
	// 	clearInterval(intervalId); // clear previous
	// 	let index = 0;
	// 	const responseSplitIntoWords = fullResponse.split(' ');
	// 	intervalId = setInterval(() => {
	// 		if (index < responseSplitIntoWords.length) {
	// 			displayedText += responseSplitIntoWords[index]+ ' ';
	// 			index++;
	// 		} else {
	// 			clearInterval(intervalId);
	// 		}
	// 	}, 100);
	// }

	// reveal by chunks
	let chunks = [];

	export function startStreaming() {
		const batchSize = 3; // show 2 words per chunk
		chunks = [];
		clearInterval(intervalId);

		let index = 0;
		const words = fullResponse.split(' ');
		intervalId = setInterval(() => {
			if (index < words.length) {
				const nextChunk = words.slice(index, index + batchSize).join(' ');
				chunks = [...chunks, ' ', nextChunk];
				index += batchSize;
			} else {
				clearInterval(intervalId);
			}
		}, 180);
	}

	// version 3
	// export let aiResponse = [];

	// let revealedBlocks = [];

	// export function startStreaming() {
	// 	revealedBlocks = [];
	// 	clearInterval(intervalId);

	// 	let index = 0;
	// 	intervalId = setInterval(() => {
	// 		if (index < aiResponse.length) {
	// 			revealedBlocks = [...revealedBlocks, aiResponse[index]];
	// 			index++;
	// 		} else {
	// 			clearInterval(intervalId);
	// 		}
	// 	}, 600); // reveal a block every 600ms
	// }

	//version 4 - hybrid approach
	// import { tick } from 'svelte';

	// let displayedBlocks = [];

	// const WORDS_PER_CHUNK = 3;
	// const WORD_DELAY = 100; // ms per chunk
	// const BLOCK_DELAY = 500; // ms delay between blocks

	// async function startStreaming() {
	// 	for (const block of aiResponse) {
	// 		if (block.type === 'table') {
	// 			displayedBlocks = [...displayedBlocks, { ...block, reveal: true }];
	// 			await new Promise((resolve) => setTimeout(resolve, BLOCK_DELAY));
	// 		} else {
	// 			const words = block.content.split(' ');
	// 			let revealedText = '';

	// 			for (let i = 0; i < words.length; i += WORDS_PER_CHUNK) {
	// 				const chunk = words.slice(i, i + WORDS_PER_CHUNK).join(' ');
	// 				revealedText += (revealedText ? ' ' : '') + chunk;

	// 				displayedBlocks = [...displayedBlocks, { ...block, content: revealedText, reveal: true }];
	// 				await tick();
	// 				await new Promise((resolve) => setTimeout(resolve, WORD_DELAY));

	// 				// Remove the duplicate blocks in between chunks
	// 				displayedBlocks = displayedBlocks.filter((b, index, arr) => {
	// 					if (b.type !== block.type) return true;
	// 					const lastIndex = arr.map((bb) => bb.type).lastIndexOf(block.type);
	// 					return index === lastIndex;
	// 				});
	// 			}
	// 			await new Promise((resolve) => setTimeout(resolve, BLOCK_DELAY));
	// 		}
	// 	}
	// }

	onDestroy(() => clearInterval(intervalId));

	export let suggestedQueries = [];

	let inputText = '';
	let maxChatBoxHeight = 200; // Set a maximum height for the chat box
	let contentOverflowed = false;
	let chatBoxRef = null; // Reference to the chat box element

	let chatContext;
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

	// onDestroy(() => {
	// 	unsubscribe();
	// });

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
		setTimeout(() => {
			startStreaming();
		}, 1000);
		inputText = '';
	}

	// let listofcharts=[{id:1, name:'Strength Analysis'}, {id:2, name:'Weakness Analysis'}, {id:3, name:'Topic Analysis'}, {id:4, name:'Class Performance'}, {id:5, name:'Class Performance'}, {id:6, name:'Class Performance'}]

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
</script>

<div class="bg-white rounded-lg shadow p-6 h-full flex flex-col justify-end">
	<div
		class="overflow-y-auto text-gray-dark pr-2 max-h-[clamp(200px,45vh,400px)] p-4 leading-8 whitespace-pre-wrap flex-grow flex flex-col justify-end"
	>
		<!-- {displayedText} version 1 -->

		<!-- verions 2 -->
		<div class="max-h-full ">
			{#each chunks as word, i (i)}
				<span in:fade={{ duration: 200 }}>{word}</span>
			{/each}
		</div>

		<!-- verions 3 -->
		<!-- {#each revealedBlocks as block, i (i)}
		<div in:fade={{ duration: 300 }}>
			{#if block.type === 'paragraph'}
				<p class="leading-relaxed">{block.content}</p>

			{:else if block.type === 'code'}
				<pre class="bg-gray-900 text-green-200 p-3 rounded overflow-auto text-sm"><code>{block.content}</code></pre>

			{:else if block.type === 'table'}
				<table class="w-full text-sm border border-gray-300 rounded overflow-hidden">
					{#each block.content as row, ri}
						<tr class={ri === 0 ? 'bg-gray-200 font-semibold' : ''}>
							{#each row as cell}
								<td class="border px-2 py-1">{cell}</td>
							{/each}
						</tr>
					{/each}
				</table>

			{:else if block.type === 'list'}
				<ul class="list-disc pl-5 space-y-1">
					{#each block.content as item}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each} -->

		<!-- version 4 -->
		<!-- {#each displayedBlocks as block (block.content)}
			{#if block.type === 'paragraph'}
				<p transition:fade class="text-gray-800 leading-relaxed">{block.content}</p>
			{:else if block.type === 'list'}
				<ul class="list-disc pl-6 space-y-1">
					{#each block.content.split('\n') as item (item)}
						<li transition:fade>{item}</li>
					{/each}
				</ul>
			{:else if block.type === 'code'}
				<pre transition:fade class="bg-gray-100 p-3 rounded text-sm overflow-auto"><code
						>{block.content}</code
					></pre>
			{:else if block.type === 'table'}
				<table transition:fade class="w-full border border-collapse text-sm">
					{#each block.content as row, i}
						<tr class={i === 0 ? 'bg-gray-200' : ''}>
							{#each row as cell}
								<td class="border px-2 py-1">{cell}</td>
							{/each}
						</tr>
					{/each}
				</table>
			{/if}
		{/each} -->
	</div>
	<div>
		<h2 class="text-2xl font-bold text-center text-black mb-6">What can I help you with today?</h2>
		{#if inputText?.length === 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				{#each suggestedQueries as query}
					<div class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
						<h3 class="font-medium text-gray-800">{query.title}</h3>
						<p class="text-gray-500 text-sm mt-1">{query.query}</p>
					</div>
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
