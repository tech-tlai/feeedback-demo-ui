<script>
	import ProfileSection from '$lib/components/profileSection/ProfileSection.svelte';
	import StudentRow1 from '$lib/components/student/StudentRow1.svelte';
	import StudentRow2 from '$lib/components/student/StudentRow2.svelte';
	import StudentRow3 from '$lib/components/student/StudentRow3.svelte';
	import StudentTopicWiseAnalysis from '$lib/components/student/StudentTopicWiseAnalysis.svelte';
	import PerfHistorySection from '$lib/components/student/PerfHistorySection.svelte';
	import GoalsSection from '$lib/components/student/GoalsSection.svelte';
	import { onDestroy } from 'svelte';
	import { chatContextStore } from '$lib/stores/globalFilters.js';
	import { page } from '$app/stores';
	import { studentUploadedFiles } from '$lib/stores/studentUploadState';

	let dashboardLoading = true;
	let dashboardError = null;
	let analyisWtStudId = {};
	let analyisWtSubAndStudId = [];
	let analyisWtStudIdError = null;
	let analyisWtSubAndStudIdError = null;

	let perfAnalysis = {};
	let strengthAnalysis = {};
	let progressReport = [];
	let progressTrend =[];
	let percentileTrend =[];


	onDestroy(() => {
		chatContextStore.set(null);
	});

	let profileData = {
		name: 'Kavya Reddy',
		role: 'STUDENT',
		class_: '3',
		id: '321468',
		school: "St. Mary's Higher Secondary School",
		location: 'Trivandrum',
		image: '/kavya_reddy.png'
	};

	$: studentId = $page.params.studentId;
	$: studentName = $page.url.searchParams.get('name') || '';
	$: studentClass = $page.url.searchParams.get('class') || profileData.class_;
	$: profilePic = $page.url.searchParams.get('img') || profileData.image;

	// Generic function to POST form data to a given API route with custom params
	async function postFormDataToApi(apiRoute, params = {}) {
		try {
			let files = $studentUploadedFiles;
			let fetchOptions = {
				method: 'POST',
				headers: {},
				body: undefined
			};
			if (files && files.length > 0) {
				const formData = new FormData();
				formData.append('excel_file', files[0]);
				Object.entries(params).forEach(([key, value]) => {
					formData.append(key, value || '');
				});
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

	async function fetchAnalysisWithStudentId() {
		return await postFormDataToApi('/apis/student/upload', { student_id: studentId });
	}

	async function fetchAnalysisWithStudentIdAndSubject() {
		return await postFormDataToApi('/apis/student/upload', {
			student_id: studentId,
			subject: subject
		});
	}

	async function fetchAllDashboardData() {
		dashboardLoading = true;
		dashboardError = null;
		analyisWtStudIdError = false;
		analyisWtSubAndStudIdError = false;

		try {
			const [respWithStudId, respWithStudIdAndSubj] = await Promise.allSettled([
				fetchAnalysisWithStudentId(),
				fetchAnalysisWithStudentIdAndSubject()
			]);

			if (respWithStudId.status === 'fulfilled') {
				analyisWtStudId = respWithStudId.value || {};
				perfAnalysis = analyisWtStudId?.llm_performance_analysis || {};
				strengthAnalysis = analyisWtStudId?.topic_analysis || {};
				progressReport = analyisWtStudId?.progressReports || [];
				progressTrend = analyisWtStudId?.progressTrends || [];
			} else {
				analyisWtStudId = {};
				analyisWtStudIdError = respWithStudId.reason?.message || 'Failed to load chart data';
			}
			
			if (respWithStudIdAndSubj.status === 'fulfilled') {
				analyisWtSubAndStudId = respWithStudIdAndSubj.value || [];
				percentileTrend = analyisWtSubAndStudId?.percentileTrends || [];
			} else {
				analyisWtSubAndStudId = [];
				analyisWtSubAndStudIdError =
					respWithStudIdAndSubj.reason?.message || 'Failed to load performance trend';
			}
		} catch (err) {
			dashboardError = err.message || 'Failed to load dashboard data';
		} finally {
			dashboardLoading = false;
		}
	}
</script>

<div class="w-full space-y-8 bg-gray-50 p-4">
	<div class="mx-auto flex max-w-[1400px] flex-col gap-5">
		<ProfileSection
			profileData={{ ...profileData, name: studentName, class_: studentClass, image: profilePic }}
		/>
		<StudentRow1 {progressReport} apiError={analyisWtStudIdError}/>
		<StudentRow2  {progressTrend} progressTrendError={analyisWtStudIdError} {percentileTrend} percentileTrendError={analyisWtSubAndStudId}/>
		<StudentRow3 apiError={analyisWtStudIdError} {perfAnalysis} />
		<StudentTopicWiseAnalysis apiError={analyisWtStudIdError} {strengthAnalysis} />
		<PerfHistorySection />
		<GoalsSection />
	</div>
</div>
