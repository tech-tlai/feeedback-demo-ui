<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import { ChatSection } from '$lib/components/qpg';
	import { createEventDispatcher } from 'svelte';
	import QuestionGenerationForm from '$lib/components/qpg/QuestionGenerationForm.svelte';

	// State for sidebar expansion
	export let isExpanded = true;

	const dispatch = createEventDispatcher();
	// Tabs configuration

	// Toggle sidebar expansion
	function toggleSidebar() {
		isExpanded = !isExpanded;
	}
</script>

<!-- Sidebar -->
<div
	class={`h-full bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 ${isExpanded ? 'w-80' : 'w-16'}`}
>
	<!-- Top section with logo -->
	<div class="p-4 flex items-center">
		<div class="text-blue-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 3l4 4 4-4 4 4 4-4v14a2 2 0 01-2 2H7a2 2 0 01-2-2V3z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 8h4" />
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12h4" />
			</svg>
		</div>
		{#if isExpanded}
			<span class="ml-2 font-semibold text-gray-800">Smart QPG</span>
		{/if}
	</div>

	<!-- Tabs section -->
	{#if isExpanded}
		<ChatSection on:submit/>
	{/if}

	<!-- Bottom section with document icon -->
	<div class="p-4 flex justify-center w-full">
		<div class="text-blue-500 w-8 ml-auto">
			<button on:click={toggleSidebar}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 -960 960 960"
					fill="currentColor"
					><path
						d="M460-320v-320L300-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z"
					/></svg
				>
			</button>
		</div>
	</div>
</div>
