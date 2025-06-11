<script>
	import { FileUpload, SearchableComboBox } from '$lib';
	import { createEventDispatcher } from 'svelte';
	import { selectedClassStore } from '$lib/stores/globalFilters.js';
	import { goto } from '$app/navigation';

	export let title = 'Card title';
	export let description = 'card description - lorem ipsum';
	export let image = '/placeholder.jpg';
	export let dashboardUrl = '/location';
	// export let highlight = 'Class Reports Updated';
	// export let highlightColor = 'text-blue-600';
	export let buttonText = 'View';
	export let gradient = 'from-blue-400 to-cyan-500';
	export let dataUploadPageUrl = '';
	export let entity = 'student';

	const dispatch = createEventDispatcher();
	// export let fileUploadHelperText='Upload file'

	// let uploadedFile = null;
	// let uploadError = '';

	// function handleFileSelected(e) {
	// 	uploadedFile = e.detail;
	// 	uploadError = '';
	// }

	// Accept a list of entities as a prop
	export let entityList = [];
	// Optionally, accept a label and placeholder for the combobox
	export let comboLabel = '';
	export let comboPlaceholder = '';
	let selectedEntityId = '';
	let selectedEntityName = '';
	let selectedEntity = {};

	function handleButtonClick() {
		if (!selectedEntityId) {
			alert('Please select an entity before proceeding.');
			return;
		}
		// Instead of navigating here, dispatch an event to the parent with the selected entity details
		dispatch('entitySelected', {
			entity,
			selectedEntityId,
			selectedEntityName,
			selectedEntity
		});
	}

	function handleComboBoxChange(e) {
		console.log(e.detail);
		selectedEntity = e.detail.itemDetails;
		selectedEntityId = e.detail.selectedItemId;
		selectedEntityName = e.detail.selectedItemName;

		// dispatch('entitySelected', {
		// 	entity,
		// 	selectedEntityId,
		// 	selectedEntityName,
		// 	selectedEntity
		// });

		// Set selected class details to the selectedClassStore if available
		// if (selectedEntity && selectedEntity.className && selectedEntity.subjects && selectedEntity.subjects.length > 0) {
		// 	selectedClassStore.set({
		// 		className: selectedEntity.className.replace(/[^0-9]/g, ''), // Extract class number
		// 		division: selectedEntity.className.replace(/[^A-Z]/g, ''), // Extract division letter
		// 		subject: selectedEntity.subjects[0],
		// 		fullClassName: `${selectedEntity.className} ${selectedEntity.subjects[0]}`
		// 	});
		// }
		// You can dispatch or use the selected entity as needed
	}

	function handleNavigation() {
		goto(dataUploadPageUrl);
	}
</script>

<div
	class="bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-[100.5%] hover:shadow-xl text-sm"
>
	<div class="h-64 bg-gradient-to-r {gradient} relative overflow-hidden rounded-t-xl">
		<img src={image} alt={title} class="w-full h-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
			<div class="p-4 text-white">
				<!-- <div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
						/>
					</svg>
					<span class="text-sm font-medium">Monitor class performance</span>
				</div> -->
			</div>
		</div>
	</div>
	<div class="p-6">
		<h3 class="text-2xl font-bold text-slate-800 mb-2 text-left">{title}</h3>
		<p class="text-slate-600 mb-4 text-left">
			{description}
		</p>
		<div class=" text-left text-gray-dark my-1">
			<span>Choose {entity} from dataset</span>
		</div>
		<div class="mb-4 flex items-center gap-2 justify-between">
			<div class="flex-grow">
				<SearchableComboBox
					options={entityList}
					label={comboLabel}
					placeholder={comboPlaceholder}
					selectedItemId={selectedEntityId}
					selectedItemName={selectedEntityName}
					on:handleDispatchComboBoxData={handleComboBoxChange}
				/>
			</div>

			<button
				type="button"
				class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-dark disabled:cursor-not-allowed"
				on:click={handleButtonClick}
				disabled={!selectedEntityId}
			>
				{buttonText}
			</button>
		</div>
		{#if dataUploadPageUrl}
			<div class=" border-t border-gray-dark relative text-gray-dark my-8">
				<span class="bg-white inline-block p-2 absolute left-1/2 -top-1/2 -translate-y-1/2">OR</span
				>
			</div>
			<div class="flex items-center justify-center">
				<a href={dataUploadPageUrl}>
					<button
						type="button"
						class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-dark disabled:cursor-not-allowed"
						on:click={handleNavigation}
					>
						Upload new data set
					</button>
				</a>
			</div>
		{/if}
	</div>
</div>
