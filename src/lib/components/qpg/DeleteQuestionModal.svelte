<script>
	import Modal from './Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import QuestionOption from './QuestionOption.svelte';

	export let isOpen = false;
	export let question = null;

	let deleteConfirmInput = '';
	let deleteError = '';
	const dispatch = createEventDispatcher();

	function handleCancel() {
		deleteConfirmInput = '';
		deleteError = '';
		dispatch('cancel');
	}

	function handleDelete() {
		if (deleteConfirmInput.trim().toLowerCase() === 'confirm') {
			dispatch('confirm');
			deleteConfirmInput = '';
			deleteError = '';
		} else {
			deleteError = "Please type 'confirm' to delete.";
		}
	}
</script>

<Modal {isOpen} on:cancel={handleCancel} title={'Delete question'} type="danger" closeModal={handleCancel}>
	<div class="">
		<p class="text-red-600  mb-4">Are you sure you want to delete this question?</p>
		{#if question}
			<div class="mb-4">
				<p class="font-medium mb-2">Q. {question.question.questionText}</p>
				{#each question.options as opt, i}
					<QuestionOption
						option={opt}
						correctAnswer={question.correctAnswer}
						readonly={true}
					/>
				{/each}
			</div>
		{/if}
		<div class="mb-2 font-medium">Please type 'confirm' to delete</div>
		<input
			type="text"
			class="w-full border rounded px-3 py-2 mb-2"
			placeholder="Please type 'confirm' to delete"
			bind:value={deleteConfirmInput}
		/>
		{#if deleteError}
			<div class="text-red-600 text-sm mb-2">{deleteError}</div>
		{/if}
	</div>
	<div slot="action-buttons" class="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
		<button
			on:click={handleCancel}
			class="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
		>
			Cancel
		</button>
		<button
			on:click={handleDelete}
			class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 disabled:bg-gray-600 "
			disabled={deleteConfirmInput.trim().toLowerCase() !== 'confirm'}
		>
			Delete
		</button>
	</div>
</Modal>
