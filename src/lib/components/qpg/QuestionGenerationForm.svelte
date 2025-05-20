<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { questions, chatHistoryStore } from '$lib/stores/qpgStore.js';
	import { goto } from '$app/navigation';
	import DownArrow from '$lib/svgComponents/DownArrow.svelte';
	import AiIcon from '$lib/svgComponents/AI_icon.svelte';
	import { Spinner } from '$lib/components/qpg';

	const dispatch = createEventDispatcher();

	export let orientation = 'horizontal';

	// Form state
	let description = 'Science class test chapter 2';
	let subject = 'Science';
	let category = 'Factual';
	let numberOfQuestions = 10;
	let keywords = 'Air, Water, Metals';
	let topic = 'Elements on earth';
	let model = '';

	// File upload handling
	let fileInput;
	let selectedFile = null;
	let questionType = 'MCQ';

	let isLoading = false;
	let errorMessage = '';

	function handleFileSelect() {
		fileInput.click();
	}

	function onFileSelected(event) {
		const file = event.target.files[0];
		if (file) {
			selectedFile = file;
			console.log('selectedFile', selectedFile);
		}
	}

	function buildQuestionsData(result) {
		const questionsArr = result.data.map((item, index) => ({
			id: index, // temporary till apis are ready
			question: item.question,
			options: item.options,
			combinedOptions: item.options.map((opt) => `${opt.option}: ${opt.value}`).join(', '),
			type: item.type,
			topic: item.topic,
			mark: item.mark,
			difficulty: item.difficulty,
			correctAnswer: item.correct_answer,
			answerText: `Ans: ${item.correct_answer.option}) ${item.correct_answer.value}`
		}));

		const questionsData = {
			id: result.id,
			title: result.title,
			data: questionsArr
		};

		return questionsData;
	}

	function buildChatHistory(
		result,
		questionType,
		numberOfQuestions,
		category,
		subject,
		keywords,
		topic
	) {
		return {
			id: result.id,
			title: result.title || 'Placeholder title',
			question_type: questionType,
			num_questions: numberOfQuestions,
			question_category: category,
			subject_name: subject,
			keywords: keywords,
			topic: topic
		};
	}

	function appendFormFields(formData) {
		formData.append('num_questions', numberOfQuestions);
		formData.append('question_type', questionType);
		formData.append('question_category', category);
		formData.append('subject_name', subject);
		formData.append('model', model);
		formData.append('description', description);

		if (keywords) {
			formData.append('keywords', keywords);
		}
		if (topic) {
			formData.append('topic', topic);
		}
		if (selectedFile) {
			formData.append('file', selectedFile);
		}
	}

	async function handleSubmit() {
		isLoading = true;
		errorMessage = '';
		const formData = new FormData();

		try {
			appendFormFields(formData);
			const obj = Object.fromEntries(formData.entries());
			const response = await fetch('/apis/qpg/questions/create', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Failed to fetch API');
			}

			const result = await response.json();
			const title = result.title || 'Temporary title';
			const questionsDataResult = buildQuestionsData(result);
			questions.set(questionsDataResult);

			console.log('questions', $questions);
			const chatHistory = buildChatHistory(
				result,
				questionType,
				numberOfQuestions,
				category,
				subject,
				keywords,
				topic
			);
			chatHistoryStore.update((data) => [...data, chatHistory]);
			goto(`/qp-generator?title=${title}&&id=${result.id}`);
		} catch (error) {
			errorMessage = error.message;
			console.error('Error preparing form data:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-4 text-sm">
	{#if orientation === 'horizontal'}
		<h1 class="text-xl font-bold text-center mb-6">Generate Questions</h1>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>
		<!-- Description field -->
		<div class="mb-4">
			<label for="description" class="block text-sm font-medium text-gray-700 mb-1">
				Describe this set of questions
			</label>
			<input
				type="text"
				id="description"
				bind:value={description}
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
			/>
		</div>

		<div class="flex flex-col md:flex-row gap-6 mb-4">
			<!-- File upload area -->
			{#if orientation === 'horizontal'}
				<div class="w-1/2">
					<div
						class="border border-gray-200 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-full cursor-pointer"
						on:click={handleFileSelect}
					>
						<!-- Upload icon -->
						<div class="text-blue-500 mb-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="17 8 12 3 7 8"></polyline>
								<line x1="12" y1="3" x2="12" y2="15"></line>
							</svg>
						</div>
						<p class="text-center font-medium">Upload your textbook content</p>
						<p class="text-center text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX</p>
						<input
							type="file"
							bind:this={fileInput}
							on:change={onFileSelected}
							accept=".pdf,.doc,.docx"
							class="hidden"
						/>
					</div>
				</div>
			{/if}

			<!-- Form fields -->
			<div class="${orientation === 'horizontal' ? 'w-1/2' : 'w-full'} space-y-4">
				{#if orientation === 'vertical'}
					<div class="mb-4">
						<label for="file-upload" class="block text-sm font-medium text-gray-700 mb-1">
							Upload your textbook content
						</label>
						<input
							type="file"
							id="file-upload"
							accept=".pdf,.doc,.docx"
							on:change={onFileSelected}
							class="block border border-gray-300 rounded px-3 py-2 text-sm"
						/>
					</div>
				{/if}
				<!-- Subject field -->
				<div>
					<label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
						Select subject <span class="text-red-500">*</span>
					</label>
					<div class="relative">
						<select
							id="subject"
							bind:value={subject}
							class="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
						>
							<option>Science</option>
							<option>Maths</option>
							<option>English</option>
						</select>
						<div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
							<DownArrow />
						</div>
					</div>
				</div>

				<!-- Category field -->
				<div>
					<label for="category" class="block text-sm font-medium text-gray-700 mb-1">
						Select Question Category <span class="text-red-500">*</span>
					</label>
					<div class="relative">
						<select
							id="category"
							bind:value={category}
							class="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
						>
							<option>Factual</option>
							<option>Conceptual</option>
							<option>Application</option>
							<option>Analysis</option>
						</select>
						<div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
							<DownArrow />
						</div>
					</div>
				</div>

				<!-- Number of questions field -->
				<div>
					<label for="numberOfQuestions" class="block text-sm font-medium text-gray-700 mb-1">
						Number of Questions <span class="text-red-500">*</span>
					</label>
					<input
						type="number"
						id="numberOfQuestions"
						bind:value={numberOfQuestions}
						min="1"
						max="50"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<!-- Keywords field -->
				<div>
					<label for="keywords" class="block text-sm font-medium text-gray-700 mb-1">
						Enter keywords (optional)
					</label>
					<input
						type="text"
						id="keywords"
						bind:value={keywords}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<!-- Topic field -->
				<div>
					<label for="topic" class="block text-sm font-medium text-gray-700 mb-1">
						Topic (optional)
					</label>
					<input
						type="text"
						id="topic"
						bind:value={topic}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>

		<!-- Model selection -->

		<!-- Error message -->
		{#if errorMessage}
			<div class="text-red-500 text-sm mb-4">{errorMessage}</div>
		{/if}

		<div class="flex justify-center items-center mt-6 mb-4">
			<span class="text-xs text-gray-500 mr-2">Model</span>
			<div class="relative inline-block w-24">
				<select
					id="model"
					bind:value={model}
					class="w-full px-3 py-1 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
				>
					<option value="">Default</option>
					<option value="gpt-4">GPT-4</option>
					<option value="gpt-3.5">GPT-3.5</option>
				</select>
				<div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
					<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
		</div>
		<!-- Generate button -->
		<div class="flex justify-center">
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center gap-2"
				disabled={isLoading}
			>
				{#if isLoading}
					<Spinner color={'#FF8800'} />
					Loading...
				{:else}
					<AiIcon />
					Generate with AI
				{/if}
			</button>
		</div>
	</form>
</div>
