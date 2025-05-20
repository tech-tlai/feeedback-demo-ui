<script>
	import { Card, PackedBubbleChart, StrengthWeaknessNotfn } from '$lib';
	// import  from '$lib/PackedBubbleChart.svelte';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';

	export let title = '';
	export let chartSentiment = 'positive';
	export let chartType = 'strengths';
	export let keywords = [];
	export let showNewKeywordsMsg = false;
	export let dataForChart = {
		name: 'Global Markets',
		children: [
			{ name: 'Software Development', value: 1180 },
			{ name: 'Hardware Manufacturing', value: 120 },
			{ name: 'Artificial Intelligence', value: 160 },
			{ name: 'Cloud Services', value: 140 },
			{ name: 'Cybersecurity', value: 110 },
			{ name: 'Blockchain', value: 90 },
			{ name: 'Frontend', value: 9 },
			{ name: 'Backend', value: 20 }
		]
	};

	$: newKeywords =
		keywords && Array.isArray(keywords) && keywords?.length > 0
			? keywords?.filter((keyword) => keyword.isNew)?.map((keyword) => keyword.name)
			: [];

	$: chartActionWord = chartType === 'strengths' ? 'Sharpen strengths' : 'Work on My Weaknesses';

	function setContextInChatBox() {
		const context = {
			type: chartType,
			title: `${$selectedClassStore ? `${$selectedClassStore} -` : ''} ${title}`
		};
		chatContextStore.set(context);
	}
</script>

<Card>
	<div class="h-full text-sm">
		<div class="flex justify-between items-center  mb-4">
			<h4 class="text-black  font-bold ">{title}</h4>
			<button class="flex gap-2 items-center text-link font-medium" on:click={setContextInChatBox}>
				Explore with AI <FilterIcon size={16} /></button
			>
		</div>
		<div class=" text-gray-dark  mb-4 flex gap-4">
			<span>{$selectedClassStore.fullClassName ?$selectedClassStore.fullClassName :''}</span>
			<!-- <span>Date: {'date'}</span> -->
		</div>
		<div class="grid grid-cols-6 ">
			<div class="col-span-3 place-items-center">
				<p
					class="${chartType === 'strengths'
						? ' text-green-dark'
						: ' text-red-dark '} font-semibold mb-4 capitalize"
				>
					Key {chartType}
				</p>
				<div class="flex flex-wrap gap-3 mb-8 justify-center">
					{#each keywords as keyword}
						<div
							class={`flex items-center gap-2 rounded-lg ${chartType === 'strengths' ? 'bg-green-light text-green-dark' : 'bg-red-light text-red-dark '} px-5 py-2   ${keyword.value > keyword.threshold ? 'font-semibold' : ''}`}
						>
							{keyword.name}
							{#if keyword.isNew}
								<span class="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded font-bold"
									>NEW</span
								>
							{/if}
						</div>
					{/each}
				</div>
				{#if showNewKeywordsMsg}
					<StrengthWeaknessNotfn msgType={chartType} {newKeywords} />
					<div class="mt-4">
						<button class="text-link" on:click={setContextInChatBox}>{chartActionWord}</button>
					</div>
				{/if}
			</div>
			<div class="col-span-3 place-items-end">
				<PackedBubbleChart data={dataForChart} {chartSentiment} />
			</div>
		</div>
	</div>
</Card>
