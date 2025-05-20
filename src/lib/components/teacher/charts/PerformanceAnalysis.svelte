<script>
	import { Card, Datatable, TextualAnalysis } from '$lib';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';

	export let  roomForImprovement = [
		
	];
	export let  achievement = [
		
	];
	export let  suggestions = [
	];
	
	const chartTitle = 'Performance Analysis';

	// const resposne = {
	// 	achievement: {
	// 		feedback: [{ id: 1, text: 'Consistent pass percentage above 80% in the last 5 tests.' }]
	// 	},
	// 	roomForImprovement: {
	// 		feedback: [{ id: 1, text: 'Spelling mistakes in Homophone words.' }]
	// 	},
	// 	suggestions: {
	// 		feedback: [
	// 			{
	// 				id: 1,
	// 				text: 'Introduce short weekly paragraph writing activities to build writing skills gradually.'
	// 			}
	// 		]
	// 	}
	// };

	function setContextInChatBox() {
		const context = {
			type: 'performance',
				title:`${$selectedClassStore?`${$selectedClassStore} -`:''} ${chartTitle}`,
		};
		chatContextStore.set(context);
	}
</script>

<Card>
	<div class="flex justify-between items-center text-sm">
		<!-- 'Performance Analysis' -->
		<h4 class="text-black text-sm font-bold mb-4">{chartTitle}</h4>
		<button class="flex gap-2 items-center text-link font-medium" on:click={setContextInChatBox}>
			Explore with AI <FilterIcon size={16} /></button
		>
	</div>
	<div class="chart-meta text-gray-dark text-sm mb-4">
		<!-- <span>Date: {''}</span> -->
		<span>{$selectedClassStore.fullClassName ?$selectedClassStore.fullClassName :''}</span>
	</div>
	<div class="grid grid-cols-3 gap-4">
		<TextualAnalysis type="success" feedbackText={achievement}/>
		<TextualAnalysis
			type="warning"
			title="Room for Improvement"
			feedbackText={roomForImprovement}
		/>
		<TextualAnalysis type="info" title="Suggestions" feedbackText={suggestions} />
	</div>
</Card>
