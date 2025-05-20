<script>
	export let option = { option: '', value: '', isCorrect: false };
	export let onDelete = () => {};
	export let onToggleCorrect = () => {};
  export let onUpdateOption =()=>{}
	export let correctAnswer = {};
	export let readonly = false;

	let optionEditIsOn = false;

  let inputElement = null;
 

	function handleEditOption(choice) {
		console.log(choice);
		optionEditIsOn = true;
	}

  function handleBlur(e){
    optionEditIsOn = false;
    const value = e.target.value;
    option.value=value;
    onUpdateOption(option)

  }

  function handleKeydown(e){
    if(e.key ==='Enter'){
      optionEditIsOn = false;
			// dispatch('updateQText', { questionText: derivedQText });
       onUpdateOption(option)
    }
  }
</script>

<div
	class="flex items-center py-3 px-4 {option.option === correctAnswer.option
		? 'bg-blue-50'
		: 'hover:bg-gray-50'}"
>
	<div class="flex items-center">
		<span class="mr-2 font-medium">{option.option}.</span>
		<input
			type="radio"
			id="option-{option.option}"
			name="question-option"
			class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
			checked={option.option === correctAnswer.option}
			disabled={readonly}
			on:change={() => {
				if (!readonly) onToggleCorrect(option.option);
			}}
		/>
	</div>

	<div class="flex-grow mx-2">
    {#if optionEditIsOn}
		<input
			type="text"
			value={option.value}
			placeholder="Enter question here"
			id="question-text"
			class="w-3/4 rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
			bind:this={inputElement}
			on:blur={handleBlur}
      on:keydown={handleKeydown}
		/>
    {:else}
		<span class="text-gray-900">{option.value}</span>
    {/if}
	</div>

	{#if option.option === correctAnswer.option}
		<span class="text-blue-500 mr-4">Right answer</span>
	{/if}

	{#if !readonly}
		<div class="flex gap-3">
			<button
				class="text-blue-500 hover:text-blue-700"
				on:click={(e) => {
					handleEditOption(option);
				}}
				aria-label="Delete option"
			>
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
			<button
				class="text-red-500 hover:text-red-700"
				on:click={() => onDelete(option.option)}
				aria-label="Delete option"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	{/if}
</div>
