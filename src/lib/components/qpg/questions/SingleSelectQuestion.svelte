<script>
	import { createEventDispatcher } from 'svelte';

	export let question;
	export let userInput;
	export let showCorrectAnswer = false;

	const dispatch = createEventDispatcher();

	// Track which option is being edited
	let editingOptionId = null;

	function editOption(event, answer) {
		event.preventDefault();
		event.stopPropagation();
		editingOptionId = answer.uuid;
	}

	function saveOptionEdit(answer, event) {
		const newText = event.target.value;
		question.answers = question.answers.map((a) =>
			a.uuid === answer.uuid ? { ...a, answerText: newText } : a
		);
		editingOptionId = null;
		dispatch('editOption', { answers: question.answers, questionId: question.uuid });
	}

	function deleteOption(uuid) {
		const answers = question?.answers?.filter((answer) => answer.uuid !== uuid);
		if (userInput.singleSelect === uuid) {
			userInput.singleSelect = question.answers[0]?.uuid;
		}

		dispatch('deleteOption', { answers, questionId: question.uuid });
	}

	// Function to mark an option as the correct answer
	function markAsCorrect(answer) {
		// First, set all answers to incorrect
		question.answers = question.answers.map((a) => ({ ...a, correct: false }));

		// Then set the selected answer as correct
		question.answers = question.answers.map((a) =>
			a.uuid === answer.uuid ? { ...a, correct: true } : a
		);

		dispatch('updateCorrectAnswer', {
			questionId: question.uuid,
			answerId: answer.uuid,
			answers: question.answers
		});
	}
</script>

<div class="space-y-4">
	{#each question.answers as answer (answer.uuid)}
		<div class="group flex items-center gap-4 text-sm">
			<label
				class="flex flex-grow cursor-pointer items-center gap-2 rounded-sm px-2 {showCorrectAnswer &&
				answer.correct
					? 'bg-green-200 font-medium text-green-800'
					: userInput?.singleSelect === answer.uuid && !showCorrectAnswer
						? 'bg-blue-100 font-medium text-blue-800'
						: ''}"
			>
				<input
					type="radio"
					name="question-{question.uuid}"
					value={answer.uuid}
					bind:group={userInput.singleSelect}
					class="hidden"
				/>
				<div
					class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border {showCorrectAnswer &&
					answer.correct
						? 'border-green-800'
						: 'border-[#323232]'}"
				>
					{#if (showCorrectAnswer && answer.correct) || (!showCorrectAnswer && userInput.singleSelect === answer.uuid)}
						<div
							class="h-2.5 w-2.5 rounded-full {showCorrectAnswer && answer.correct
								? 'bg-green-800'
								: 'bg-[#323232]'}"
						></div>
					{/if}
				</div>

				{#if editingOptionId === answer.uuid}
					<!-- Edit mode -->
					<input
						type="text"
						value={answer.answerText}
						class="flex-grow rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
						on:blur={(e) => saveOptionEdit(answer, e)}
						on:keydown={(e) => e.key === 'Enter' && saveOptionEdit(answer, e)}
						autofocus
					/>
				{:else}
					<!-- Display mode -->
					<span class="option-text flex-grow rounded px-2 py-1">
						{answer.answerText}
					</span>
				{/if}
			</label>

			<div class="flex gap-2">
				{#if showCorrectAnswer}
					<!-- Mark as correct button -->
					<button
						on:click={() => markAsCorrect(answer)}
						class="cursor-pointer text-gray-400 opacity-0 transition-opacity hover:text-green-500 group-hover:opacity-100 {answer.correct
							? 'text-green-500 opacity-100'
							: ''}"
						title="Mark as correct answer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M20 6L9 17l-5-5" />
						</svg>
					</button>
				{/if}

				<button
					on:click={(e) => editOption(e, answer)}
					class="cursor-pointer text-gray-400 opacity-0 transition-opacity hover:text-blue-500 group-hover:opacity-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
					</svg>
				</button>

				<button
					on:click={() => deleteOption(answer.uuid)}
					class="cursor-pointer text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M3 6h18"></path>
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
					</svg>
				</button>
			</div>
		</div>
	{/each}
</div>
