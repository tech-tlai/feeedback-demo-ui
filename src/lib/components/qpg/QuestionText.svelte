<script>
	import { createEventDispatcher } from "svelte";

	export let questionText = '';

	$: derivedQText = questionText;

	let questionEditIsOn = false;
	let inputElement = null;

  const dispatch = createEventDispatcher()

	function handleBlur(event) {
		questionEditIsOn = false;
		derivedQText = event.target.value;

		dispatch('updateQText', { questionText: derivedQText });
	}

  function handleKeydown(e){
    if(e.key ==='Enter'){
      questionEditIsOn = false;
			dispatch('updateQText', { questionText: derivedQText });
    }
  }

  function makeQEditable(){
    questionEditIsOn = true;
  }
</script>

<div class="flex items-center mb-4">
	<span class="font-medium mr-2">Q.</span>

	{#if questionEditIsOn}
		<input
			type="text"
			value={derivedQText}
			placeholder="Enter question here"
			id="question-text"
			class="w-3/4 rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
			bind:this={inputElement}
			on:blur={handleBlur}
      on:keydown={handleKeydown}
		/>
	{:else}
		<span class="text-gray-900">{derivedQText}</span>
		<button class="ml-2 text-blue-500 hover:text-blue-700" on:click={makeQEditable}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
				/>
			</svg>
		</button>
	{/if}
</div>
