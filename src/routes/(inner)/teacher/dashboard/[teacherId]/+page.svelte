<script>
	import TeacherProfileSection from '$lib/components/teacher/TeacherProfileSection.svelte';
	import GlobalFilters from '$lib/components/teacher/GlobalFilters.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import TeacherRow1 from '$lib/components/teacher/TeacherRow1.svelte';
	import TeacherRow2 from '$lib/components/teacher/TeacherRow2.svelte';
	import ScoreDistributionSection from '$lib/components/teacher/ScoreDistributionSection.svelte';
	import { SectionWiseScore, PerformanceAnalysis, TopicWiseAnalysisSection } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import { chatContextStore, selectedClassStore } from '$lib/stores/globalFilters.js';
	import { page } from '$app/stores';
	import { fetchApi } from '$lib/apiUtils.js';
	import SkelDataTable from '$lib/components/loadingSkeletons/SkelDataTable.svelte';
	import { teacherUploadedFiles } from '$lib/stores/teacherUploadStore.js';

	$: teacherId = $page.params.teacherId;
	$: teacherName = $page.url.searchParams.get('name') || teacherId;
	$: teacherSubject = $page.url.searchParams.get('subject') || '';

	const profileData = {
		name: 'Sandeep Sharma',
		role: 'TEACHER',

		id: '321468',
		school: "St. Mary's Higher Secondary School",
		location: 'Trivandrum',
		image: '/sandeep_pic.png'
	};

	let chartData = null;
	let chartDataLoading = true;
	let chartDataError = null;
	let retryKey = 0;
	let allClassesSummary = [];
	let tabs = [];
	let perfSummary = {};
	let learningOutcomes = [];
	let topPerformers = [];
	let studentsAtRisk = [];
	let perfAnalysis = {};
	let avgMaxMin = {};
	let strengthAnalysis = {};
	let sectionWiseData = {};
	let perfTrend = [];

	async function fetchChartData() {
		try {
			const { className, teacherId, subject } = $selectedClassStore;
			console.log(
				'DASHBOARD====',
				'className:',
				className,
				'teacherId:',
				teacherId,
				'subject:',
				subject
			);
			// const classSubject = `class=${className}&&division=${division}&&sub=${subject}`;

			chartDataLoading = true;
			chartDataError = null;

			// Prepare FormData if files exist
			let fetchOptions = {
				method: 'POST',
				headers: {},
				body: undefined
			};
			let files = $teacherUploadedFiles;
			console.log('files in dashboard page', files);
			if (files && files.length > 0) {
				const formData = new FormData();
				formData.append('excel_file', files[0]);
				formData.append('class_name', className || '');
				formData.append('teacher_id', teacherId || '');
				formData.append('subject', subject || '');
				fetchOptions.body = formData;
				// Remove Content-Type header so browser sets it for multipart
			}
			// else {
			// 	fetchOptions.method = 'GET';
			// }

			const res = await fetch(`/apis/teacher/upload`, {
				method: 'POST',
				...fetchOptions
			});

			if (!res.ok) {
				throw new Error('Something went wrong');
			}
			const chartData = await res.json();
			allClassesSummary = chartData?.all_classes_summary || [];
			perfSummary = chartData?.performance_summary || {};
			learningOutcomes = chartData?.learning_outcomes || [];
			topPerformers = chartData?.top_performers || [];
			studentsAtRisk = chartData?.students_at_risk || [];
			perfAnalysis = chartData?.llm_performance_analysis || [];
			avgMaxMin = chartData?.average_max_min || [];
			strengthAnalysis = chartData?.topic_analysis || [];
			(sectionWiseData = chartData?.section_wise_data || {}),
				(perfTrend = chartData?.perf_trend || {});
			tabs = allClassesSummary
				.flatMap((cls) =>
					(cls.subjects || []).map((subj) => {
						// Extract class and division from className (e.g., 'Class 7 A')
						const match = cls.className.match(/Class\s+(\d+)\s*([A-Z])/i);
						const classNum = match ? match[1] : '';
						const division = match ? match[2] : '';
						return {
							id: `${classNum}${division}-${subj.subject}`,
							text: `Class ${classNum}${division} ${subj.subject}`,
							class: classNum,
							division,
							subject: subj.subject
						};
					})
				)
				.map((tab, i) => ({ ...tab, id: i + 1 }));

			// const initialSelectedTab = tabs.length > 0 ? tabs[0] : null;

			// if (initialSelectedTab) {
			// 	const { class: className, division, subject } = initialSelectedTab;

			// 	selectedClassStore.set({
			// 		className,
			// 		division,
			// 		subject,
			// 		fullClassName: `${className}${division} ${subject}`
			// 	});
			// }
		} catch (err) {
			chartDataError = err.message;
		} finally {
			chartDataLoading = false;
		}
	}

	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});

	$: if (isMounted ) {
		fetchChartData();
	}

	function handleRetry() {
		retryKey += 1;
		// fetchChartData();
	}

	onDestroy(() => {
		chatContextStore.set(null);
		selectedClassStore.set('');
	});
</script>

<div class="w-full space-y-8 bg-gray-50 p-4">
	{#if chartDataLoading}
		<div class="flex items-center justify-center min-h-screen w-full">
			<!-- <SkelDataTable /> -->
			Loading performance data...
		</div>
	{:else if chartDataError}
		<div
			class="flex flex-col items-center justify-center min-h-[40vh] w-full bg-red-50 rounded-lg border border-red-200 p-8"
		>
			<p class="text-red-600 text-lg font-semibold mb-4 flex items-center gap-2">
				<svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
					/></svg
				>
				Error loading chart data: {chartDataError}
			</p>
			<button
				class="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
				on:click={handleRetry}
			>
				Retry
			</button>
		</div>
	{:else}
		<div class="mx-auto flex max-w-[1400px] flex-col gap-5">
			<TeacherProfileSection
				profileData={{ ...profileData, name: teacherName, subject: teacherSubject }}
				{allClassesSummary}
			/>
			<GlobalFilters {tabs} />
			<TeacherRow1 {perfSummary} {learningOutcomes} {perfTrend} />
			<TeacherRow2 {topPerformers} {studentsAtRisk} {perfAnalysis} {sectionWiseData} />
			<TopicWiseAnalysisSection {strengthAnalysis} />
			<ScoreDistributionSection {avgMaxMin} />
		</div>
	{/if}
</div>
