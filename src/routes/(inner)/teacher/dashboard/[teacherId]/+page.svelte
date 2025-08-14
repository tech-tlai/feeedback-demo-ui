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
	let perfTrendError = null;
	let sectionWiseError = null;
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

	$: if (isMounted && teacherId) {
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
		selectedClassSubjFilterIndex = e.detail.index;
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
		chartDataError = null;
		perfTrendError = null;
		sectionWiseError = null;

		try {
			const [chartRes, perfRes, sectionRes] = await Promise.allSettled([
				fetchChartData(),
				fetchPerfApi(),
				fetchStudentDistributionApi()
			]);

			// Chart Data
			if (chartRes.status === 'fulfilled') {
				// fetchChartData sets state directly
			} else {
				chartDataError = chartRes.reason?.message || 'Failed to load chart data';
			}

			// Perf Trend
			if (perfRes.status === 'fulfilled') {
				perfTrend = perfRes.value || [];
			} else {
				perfTrend = [];
				perfTrendError = perfRes.reason?.message || 'Failed to load performance trend';
			}

			// Section Wise
			if (sectionRes.status === 'fulfilled') {
				sectionWiseData = sectionRes.value || {};
			} else {
				sectionWiseData = {};
				sectionWiseError = sectionRes.reason?.message || 'Failed to load section wise data';
			}
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
			<AnimLoader
				active={true}
				size={'large'}
				loaderType={'bars'}
				description="Loading performance data..."
			/>
		</div>
	{:else}
		<div class="mx-auto flex max-w-[1400px] flex-col gap-5">
			<TeacherProfileSection
				profileData={{ ...profileData, name: teacherName, subject: teacherSubject }}
				{chartDataError}
				{allClassesSummary}
			/>
			<GlobalFilters {tabs} on:tabSelected={handleTabSelected} {selectedClassSubjFilterIndex} />
			<TeacherRow1 {perfSummary} {learningOutcomes} {perfTrend} {perfTrendError} {chartDataError} />
			<TeacherRow2
				{topPerformers}
				{studentsAtRisk}
				{perfAnalysis}
				{chartDataError}
				{sectionWiseData}
				{sectionWiseError}
			/>

			<TopicWiseAnalysisSection {strengthAnalysis} {chartDataError} />
			<ScoreDistributionSection {avgMaxMin} {chartDataError} {sectionWiseData} {sectionWiseError} />
		</div>
	{/if}
</div>
