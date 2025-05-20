<script>
	import QuestionOption from './QuestionOption.svelte';
	import QuestionSettings from './QuestionSettings.svelte';
	import Modal from './Modal.svelte';
	import QuestionText from './QuestionText.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let isOpen = false;
	export let closeEditModal = () => {};
	export let questionText = 'Which gas is essential for breathing?';
	export let questionToEdit = {};

	$: ({ id, topic, correctAnswer, options } = questionToEdit);
	
	
	// these varaibles are used to bind to input fields in QuestionSettings component. Thus, had to take them out of the reactive block above
	let cognitiveValue = questionToEdit.cognitiveValue;
	let learningOutcome = questionToEdit.learningOutcome;
	let difficulty = questionToEdit.difficulty;
	let tags = questionToEdit.tags;

	

	// Option functions
	function deleteOption(optionKey) {
		options = options.filter((option) => option.option !== optionKey);
	}

	function toggleCorrectOption(option) {
		correctAnswer = option;
	}

	function updateOption(option) {
		options = options.map((ans) => (ans.option == option.option ? option : ans));
	}

	// Form actions
	async function saveChanges() {
		let payload = {
			id,
			type: 'MCQ',
			topic,
			question: questionText,
			options,
			correct_answer: options.find((option) => option.isCorrect) || {},
			mark: 1, // Assuming mark is fixed, update if dynamic
			tags,
			learning_outcome: learningOutcome,
			bloom_level: cognitiveValue,
			difficulty: difficulty.toLowerCase()
		};

		async function editQuestion(qId, qPayload) {
			try {
				const response = await fetch(`/apis/qpg/questions/${qId}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(qPayload)
				});

				if (!response.ok) {
					dispatch('updateQuestion', payload); // temporary frontend fix
					throw new Error('Failed to update question');
				}

				const result = await response.json();
				console.log('Question updated successfully:', result);
				dispatch('updateQuestion', payload); // temporary frontend fix
				closeEditModal();
			} catch (error) {
				console.error('Error updating question:', error);
			}
		}

		await editQuestion(id, payload);
	}

	function cancel() {
		closeEditModal();
	}

	function handleQText(e) {
		questionText = e.detail.questionText;
	}
</script>

<Modal {isOpen} title="Edit question" closeModal={closeEditModal}>
	<div class="bg-white max-w-5xl mx-auto">
		<div class="grid grid-cols-12">
			<!-- Question and options section -->
			<div class="col-span-6 pr-4">
				<!-- Question -->
				<div class="mb-6">
					<QuestionText {questionText} on:updateQText={handleQText} />
				</div>

				<!-- Options -->
				<div class="mb-6">
					{#each options as choice (choice.option)}
						<QuestionOption
							{correctAnswer}
							option={choice}
							onDelete={() => deleteOption(choice.option)}
							onToggleCorrect={() => toggleCorrectOption(choice)}
							onUpdateOption={() => updateOption(choice)}
						/>
					{/each}
				</div>

				<!-- Learning outcome -->
				<div class="mt-6">
					<h3 class="font-medium mb-2">Learning outcome :</h3>
					<p class="text-gray-700">
						{learningOutcome && learningOutcome?.length > 0 ? learningOutcome?.join(',') : ''}
					</p>
				</div>
			</div>

			<!-- Settings section -->
			<div class="col-span-6">
				<QuestionSettings bind:difficulty bind:tags bind:cognitiveValue />
			</div>
		</div>
	</div>
	<!-- Footer with action buttons -->
	<div class="flex justify-end p-6 border-t border-gray-200 bg-gray-50" slot="action-buttons">
		<button
			class="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			on:click={cancel}
		>
			Cancel
		</button>
		<button
			class="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			on:click={saveChanges}
		>
			Save changes
		</button>
	</div>
</Modal>
