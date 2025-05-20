<script>
	import { QuestionGenerationForm, AiResponse, QuestionEditor } from '$lib/components/qpg';
	import { LegacyDatatable, SkelDataTable } from '$lib';
	import Modal from './Modal.svelte';
	import DeleteQuestionModal from './DeleteQuestionModal.svelte';
	// import { questions } from '$lib/stores/qpgStore.js';
	import { get } from 'svelte/store';

	export let isLoading = false;
	export let questionStore;
	export let title = '';
	export let chatId = '';

	$: questionsArr = questionStore && $questionStore?.data ? $questionStore.data : [];
	$: isQuestionGenerated = questionsArr && questionsArr?.length ? true : false;
	let showEditModal = false;
	let questionToEdit = {};
	let showDeleteModal = false;
	let questionToDelete = null;

	async function openEditModal(e) {
		const questionId = e.detail.id;

		try {
			const response = await fetch(`/apis/qpg/questions/${questionId}`);

			if (!response.ok) {
				throw new Error('Failed to fetch question details');
			}

			const questionData = await response.json();

			questionToEdit = {
				id: questionData.id,
				questionText: questionData.question,
				options: questionData.options,
				difficulty: questionData.difficulty,
				mark: questionData.mark,
				correctAnswer: questionData.correct_answer,
				tags: questionData.tags || [],
				cognitiveValue: questionData.bloom_level || '',
				learningOutcome: questionData.learning_outcome || [],
				type: questionData.type,
				topic: questionData.topic
			};

			showEditModal = true;
		} catch (error) {
			console.error('Error fetching question details:', error);
		}
	}

	function updateQuestion(id, qData) {
		const currentQuestions = questionsArr;
		if (currentQuestions.error) return;
		const questionIndex = currentQuestions?.findIndex((q) => q.id === id);
		if (questionIndex !== -1) {
			const updatedQuestions = [...currentQuestions]
			updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], ...qData };
			questionStore.update((store) => ({ ...store, data: updatedQuestions }));
			console.log('$questions after update', $questionStore);
		}
	}

	function deleteQuestion(id) {
		console.log('id to delete', id);
		const newQuestionArr = questionsArr.filter((q) => q.id !== id)
		questionStore.update((store) => ({ ...store, data: newQuestionArr }));		
		console.log('questions after delete', $questionStore);
	}

	function handleUpdateQuestion(e) {
		const data = e.detail;
		updateQuestion(data.id, data);
	}

	function closeEditModal() {
		questionToEdit = {};
		showEditModal = false;
	}

	function handleDeleteQuestion(e) {
		questionToDelete = e.detail;
		console.log('questionToDelete', questionToDelete);
		showDeleteModal = true;
	}

	function confirmDelete() {
		if (questionToDelete) {
			deleteQuestion(questionToDelete.id);
			showDeleteModal = false;
			questionToDelete = null;
		}
	}

	function cancelDelete() {
		showDeleteModal = false;
		questionToDelete = null;
	}
</script>

<div class="flex-grow flex items-center justify-center h-full">
	{#if !isQuestionGenerated}
		<QuestionGenerationForm on:submit />
	{:else if questionsArr?.length > 0}
		<AiResponse
			{questionStore}
			questions={questionsArr}
			{isLoading}
			{title}
			{chatId}
			on:editQuestion={openEditModal}
			on:deleteQuestion={handleDeleteQuestion}
		/>

		<!-- modal shows only when edit button is clicked -->
		{#if showEditModal}
			<QuestionEditor
				isOpen={showEditModal}
				{closeEditModal}
				{questionToEdit}
				on:updateQuestion={handleUpdateQuestion}
			/>
		{/if}

		<!-- modal shows only when delete button is clicked -->

		<DeleteQuestionModal
			isOpen={showDeleteModal}
			question={questionToDelete}
			on:confirm={confirmDelete}
			on:cancel={cancelDelete}
		/>
	{/if}
</div>
