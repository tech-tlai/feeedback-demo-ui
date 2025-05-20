<script>
	import { onMount } from 'svelte';
	import { formatDateDDMonthShortYear } from '$lib/utils';
	export let headers = [
		{ key: 'name', label: 'Subject' },
		{ key: 'examName', label: 'Exam' },
		{ key: 'classAvg', label: 'Class Avg.' },
		{ key: 'marks', label: 'Marks' },
		{ key: 'totalMarks', label: 'Total Marks' },
		{ key: 'highest', label: 'Highest' },
		{ key: 'goalAchieved', label: 'Goal Achieved' },
		{ key: 'feedback', label: 'Feedback' }
	];

	let subjectsData = [];
	let isLoading = true;
	let error = null;
	const STUDENT_ID = 1;

	onMount(async () => {
		try {
			const response = await fetch(`/apis/student/progress-report/${STUDENT_ID}`);
			if (!response.ok) {
				throw new Error('Failed to fetch progress report');
			}

			const data = await response.json();
			subjectsData = data.map((sub) => {
				return { ...sub, date: formatDateDDMonthShortYear(sub.date) };
			});
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	});

	function getMarkStatusColor(mark, totalMark) {
		const percentage = (mark / totalMark) * 100;
		if (percentage >= 80) return 'bg-green-100 text-green-700';
		if (percentage >= 60) return 'bg-yellow-100 text-yellow-700';
		return 'bg-red-100 text-red-700';
	}
</script>

<div class="container mx-auto text-sm">
	{#if isLoading}
		<p>Loading...</p>
	{:else if error}
		<p class="text-red-500">Error: {error}</p>
	{:else}
		<div class="overflow-x-auto rounded-lg shadow-sm">
			<table class="min-w-full text-sm text-left text-gray-dark bg-white">
				<thead class="bg-violet-100 text-gray-dark">
					<tr>
						{#each headers as header}
							<th class="py-3 px-4 font-semibold whitespace-nowrap">{header.label}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each subjectsData as subject}
						<tr class="border-t border-gray-light hover:bg-gray-50">
							{#each headers as header}
								<td class="py-3 px-4 align-top">
									{#if header.key === 'name'}
										<div class="font-medium text-black">{subject.subject}</div>
										<div class="text-xs text-gray-500">{subject.date}</div>
									{:else if header.key === 'marks'}
										<span
											class={`inline-block py-1 px-2 rounded-full text-xs ${getMarkStatusColor(subject.marks, subject.totalMarks)}`}
										>
											{subject.marks}
										</span>
									{:else if header.key === 'goalAchieved'}
										{#if subject.goalAchieved === true}
											<span
												class="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-4 w-4 text-green-600"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fill-rule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clip-rule="evenodd"
													/>
												</svg>
											</span>
										{:else if subject.goalAchieved === false}
											<span
												class="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-4 w-4 text-red-600"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fill-rule="evenodd"
														d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
														clip-rule="evenodd"
													/>
												</svg>
											</span>
										{:else}
											<span class="text-gray-500 text-xs">NA</span>
										{/if}
									{:else if header.key === 'feedback'}
										<div class="max-w-xs text-sm">{subject.feedback}</div>
									{:else}
										{subject[header.key]}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
