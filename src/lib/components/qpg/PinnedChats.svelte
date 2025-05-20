<script>
	export let pinneItems = [];
	import { goto } from '$app/navigation';

	function handleChatHistorySelection(id, title) {
		goto(`/qp-generator/chat-history/${id}?title=${title}`);
	}
</script>

<div class="py-2" {...$$restProps}>
	{#if pinneItems?.length ===0}
		<p class="text-gray-dark  text-sm text-center mt-4">No pinned chats</p>
	{/if}
	{#each pinneItems as item, index}
		<button
			class="w-full text-left px-4 py-4 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors border-b inline-block"
			on:click={() => handleChatHistorySelection(item.id, item.title)}
		>
			<div class="text-black mb-1">{item.title}</div>
			<div class="text-gray-dark ">
				Sub: {item.subject_name}- {item.num_questions} Qs- {item.topic}
			</div>
		</button>
	{/each}
	<!-- <div class="px-4 py-2 text-blue-500 text-sm flex items-center cursor-pointer">
		More
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4 ml-1"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</div> -->
</div>
