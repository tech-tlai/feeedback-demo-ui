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
	import { browser } from '$app/environment';
	import AnimLoader from '$lib/components/AnimLoader.svelte';

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
	let dashboardLoading = true;
	let dashboardError = null;
	let selectedClassSubjFilterIndex = 0;


	async function fetchChartData() {
		try {
			const { className, teacherId, subject } = $selectedClassStore;
			chartDataLoading = true;
			chartDataError = null;

			let fetchOptions = {
				method: 'POST',
				headers: {},
				body: undefined
			};
			let files = $teacherUploadedFiles;
			if (files && files.length > 0) {
				const formData = new FormData();
				formData.append('excel_file', files[0]);
				formData.append('class_name', className || '');
				formData.append('teacher_id', teacherId || '');
				formData.append('subject', subject || '');
				fetchOptions.body = formData;
			}

			// Only call the main API here
			const mainRes = await fetch('/apis/teacher/upload', { method: 'POST', ...fetchOptions });
			if (!mainRes.ok) {
				throw new Error('Something went wrong');
			}
			const chartData = await mainRes.json();
			allClassesSummary = chartData?.all_classes_summary || [];
			perfSummary = chartData?.performance_summary || {};
			learningOutcomes = chartData?.learning_outcomes || [];
			topPerformers = chartData?.top_performers || [];
			studentsAtRisk = chartData?.students_at_risk || [];
			perfAnalysis = chartData?.llm_performance_analysis || [];
			avgMaxMin = chartData?.average_max_min || [];
			strengthAnalysis = chartData?.topic_analysis || [];
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

	// $: console.log('selectedClassStore in dashboard page ===', $selectedClassStore);

	$: if (isMounted) {
		fetchAllDashboardData();
	}

	function handleRetry() {
		retryKey += 1;
		fetchAllDashboardData();
	}

	onDestroy(() => {
		chatContextStore.set(null);
		// selectedClassStore.set('');
	});

	// Generic function to POST form data to a given API route
	async function postFormDataToApi(apiRoute) {
		try {
			const { className, teacherId, subject } = $selectedClassStore;
			let files = $teacherUploadedFiles;
			let fetchOptions = {
				method: 'POST',
				headers: {},
				body: undefined
			};
			if (files && files.length > 0) {
				const formData = new FormData();
				formData.append('excel_file', files[0]);
				formData.append('class_name', className || '');
				formData.append('teacher_id', teacherId || '');
				formData.append('subject', subject || '');
				fetchOptions.body = formData;
			}
			const res = await fetch(apiRoute, {
				method: 'POST',
				...fetchOptions
			});
			if (!res.ok) {
				throw new Error('Something went wrong');
			}
			return await res.json();
		} catch (err) {
			throw err;
		}
	}
	function handleTabSelected(e) {
		selectedClassSubjFilterIndex = e.detail.index
		// Call your API or update state here
		fetchAllDashboardData();
	}
	async function fetchPerfApi() {
		return await postFormDataToApi('/apis/teacher/upload/perf-trend');
	}

	async function fetchStudentDistributionApi() {
		return await postFormDataToApi('/apis/teacher/upload/student-distribution');
	}

	async function fetchAllDashboardData() {
		dashboardLoading = true;
		dashboardError = null;
		try {
			const [chartRes, perfRes, sectionRes] = await Promise.all([
				fetchChartData(),
				fetchPerfApi(),
				fetchStudentDistributionApi()
			]);
			// chartRes is undefined because fetchChartData sets state directly
			// perfRes and sectionRes are returned from their respective APIs
			perfTrend = perfRes || [];
			sectionWiseData = sectionRes || {};
		} catch (err) {
			dashboardError = err.message || 'Failed to load dashboard data';
		} finally {
			dashboardLoading = false;
		}
	}
</script>

<div class="w-full space-y-8 bg-gray-50 p-4">
	{#if chartDataLoading || dashboardLoading}
		<div class="flex items-center justify-center min-h-screen w-full">
			<!-- <SkelDataTable /> -->
			<AnimLoader
				active={true}
				size={'large'}
				loaderType={'bars'}
				description="Loading performance data..."
			/>
		</div>
	{:else if chartDataError || dashboardError}
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
				Error loading chart data: {chartDataError || dashboardError}
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
			<GlobalFilters {tabs} on:tabSelected={handleTabSelected} {selectedClassSubjFilterIndex}/>
			<TeacherRow1 {perfSummary} {learningOutcomes} {perfTrend} />
			<TeacherRow2 {topPerformers} {studentsAtRisk} {perfAnalysis} {sectionWiseData} />
			<TopicWiseAnalysisSection {strengthAnalysis} />
			<ScoreDistributionSection {avgMaxMin} />
		</div>
	{/if}
</div>
