<script>
	import { createEventDispatcher } from "svelte";

	export let difficulty = 'Easy';
	export let tags = ['Environment', 'Living things', 'Basic science', 'Nature'];
	export let cognitiveValue = 'Knowledge';


  const dispatch = createEventDispatcher()
	let tagInput = '';

	function addTag(e) {
		if (tagInput.trim() && !tags.includes(tagInput.trim())) {
			tags = [...tags, tagInput.trim()];
			tagInput = '';
		}
	}

	function removeTag(tag) {
		tags = tags.filter((t) => t !== tag);
	}

 
</script>

<div class="p-6 border-l border-gray-200">
	<h2 class="text-base font-bold mb-6">Settings</h2>

	<div class="mb-6">
		<label for="difficulty" class="block text-sm font-medium text-gray-700 mb-1">Difficulty:</label>
		<div class="relative">
			<select
				id="difficulty"
				bind:value={difficulty}
				class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
			>
				<option value={'easy'}>Easy</option>
				<option value={'medium'}>Medium</option>
				<option value={'hard'}>Hard</option>
			</select>
		</div>
	</div>

	<div class="mb-6">
		<label for="tags" class="block text-sm font-medium text-gray-700 mb-1">Tags:</label>
		<div class="flex flex-wrap gap-2 mb-2">
			{#each tags as tag}
				<div
					class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
				>
					{tag}
					<button
						type="button"
						class="ml-1.5 inline-flex text-gray-400 hover:text-gray-600"
						on:click={() => removeTag(tag)}
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
							/>
						</svg>
					</button>
				</div>
			{/each}
		</div>
		<div class="flex">
			<input
				type="text"
				id="tags"
				placeholder="Search tags"
				bind:value={tagInput}
				on:keydown|stopPropagation={(e) => e.key === 'Enter' && addTag()}
				class="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			/>
		</div>
	</div>

	<div class="mb-6">
		<span class="block text-sm font-medium text-gray-700 mb-2">Cognitive value</span>
		<div class="flex items-center gap-4 flex-wrap">
			<label class="inline-flex items-center">
				<input
					type="radio"
					class="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
					name="cognitive-value"
					value="Knowledge"
					checked={cognitiveValue === 'Knowledge'}
					on:change={() => (cognitiveValue = 'Knowledge')}
				/>
				<span class="ml-2 text-sm text-gray-700">Knowledge</span>
			</label>
			<label class="inline-flex items-center">
				<input
					type="radio"
					class="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
					name="cognitive-value"
					value="Application"
					checked={cognitiveValue === 'Application'}
					on:change={() => (cognitiveValue = 'Application')}
				/>
				<span class="ml-2 text-sm text-gray-700">Application</span>
			</label>
			<label class="inline-flex items-center">
				<input
					type="radio"
					class="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
					name="cognitive-value"
					value="Understanding"
					checked={cognitiveValue === 'Understanding'}
					on:change={() => (cognitiveValue = 'Understanding')}
				/>
				<span class="ml-2 text-sm text-gray-700">Understanding</span>
			</label>
		</div>
	</div>
</div>
