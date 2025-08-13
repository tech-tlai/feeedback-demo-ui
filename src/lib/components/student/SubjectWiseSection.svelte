<script>
	import { SectionTitle, Tabs } from '$lib';
	import { AllSubjectsPercentileTrend } from '$lib';
	import StudentRow3 from '$lib/components/student/StudentRow3.svelte';
	import StudentTopicWiseAnalysis from '$lib/components/student/StudentTopicWiseAnalysis.svelte';
	import { studentUploadedFiles } from '$lib/stores/studentUploadState';
	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let subWiseChartsLoading = false;
	export let chartsError = null;
	export let strengthAnalysis = {};
	export let percentileTrend = [];
	let tabs = [
		// { id: 1, text: 'English', subject: 'English' },
		// { id: 2, text: 'Maths', subject: 'Maths' }
	];
	// let selectedSubject = '';
	const dispatch  = createEventDispatcher()

	let selectedClassSubjFilterIndex = 0;
	function handleClassTabSelection(e) {
		const { index, tab } = e.detail;
		if (tab) {
			// selectedSubject = tab.text;
			// const { class: className, division, subject } = tab;
			// selectedClassStore.update((prev) => ({
			// 	...prev,
			// 	className: className + division,
			// 	division,
			// 	subject,
			// 	fullClassName: `${className}${division} ${subject}`
			// }));
		}
		dispatch('tabSelected', e.detail);
	}

	$: allSubjects = $page.url.searchParams.get('subjects') || '';

	$: studentId = $page.params.studentId;
	$: tabs = allSubjects.split(',')?.map((sub, index) => ({ id: index + 1, text: sub }));

	// let analyisWtSubAndStudId = [];

	let analyisWtSubAndStudIdError = null;
	
	// async function postFormDataToApi(apiRoute, params = {}) {
	// 	try {
	// 		const testing = true; // Set to false for production
	// 		if (testing) {
	// 			// Use static file for testing
	// 			const response = await fetch('/7_8_data.xlsx');
	// 			const blob = await response.blob();
	// 			const formData = new FormData();
	// 			formData.append('excel_file', blob, '7_8_data.xlsx');
	// 			Object.entries(params).forEach(([key, value]) => {
	// 				formData.append(key, value || '');
	// 			});
	// 			const res = await fetch(apiRoute, {
	// 				method: 'POST',
	// 				body: formData
	// 			});
	// 			if (!res.ok) {
	// 				throw new Error('Something went wrong');
	// 			}
	// 			return await res.json();
	// 		} else {
	// 			let files = $studentUploadedFiles;
	// 			let fetchOptions = {
	// 				method: 'POST',
	// 				headers: {},
	// 				body: undefined
	// 			};
	// 			if (files && files.length > 0) {
	// 				const formData = new FormData();
	// 				formData.append('excel_file', files[0]);
	// 				Object.entries(params).forEach(([key, value]) => {
	// 					formData.append(key, value || '');
	// 				});
	// 				fetchOptions.body = formData;
	// 			}
	// 			const res = await fetch(apiRoute, {
	// 				method: 'POST',
	// 				...fetchOptions
	// 			});
	// 			if (!res.ok) {
	// 				throw new Error('Something went wrong');
	// 			}
	// 			return await res.json();
	// 		}
	// 	} catch (err) {
	// 		console.log('eeror occured in POST FORM DATA TO API');
	// 		throw err;
	// 	}
	// }

	// async function fetchAnalysisWithStudentId() {
	// 	return await postFormDataToApi('/apis/student/upload', { student_id: studentId });
	// }



	// async function fetchSubjectWiseData() {
	// 	subWiseChartsLoading = true;
	// 	chartsError = null;
	// 	analyisWtSubAndStudIdError = false;

	// 	try {
			
	// 		const res = await postFormDataToApi('/apis/student/upload', {
	// 			student_id: studentId,
	// 			subject: selectedSubject
	// 		});

			
	// 		const respWithStudIdAndSubj = res;
	// 		analyisWtSubAndStudId = respWithStudIdAndSubj || [];
	// 		percentileTrend = analyisWtSubAndStudId?.percentileTrends || [];
	// 		strengthAnalysis = analyisWtSubAndStudId?.topic_analysis || {};
			
	// 	} catch (err) {
	// 		chartsError = err.message || 'Failed to load dashboard data';
	// 		console.error('Dashboard error occured', err);
	// 	} finally {
	// 		subWiseChartsLoading = false;
	// 	}
	// }
	

	let isMounted = false;
	onMount(() => {
		isMounted = true;
		// selectedSubject = $page.url.searchParams.get('sub') || '';
		// fetchSubjectWiseData();
	});

	// $: if (selectedSubject) {
	// 	fetchSubjectWiseData();
	// }
</script>


<div class="flex w-full justify-center my-6">
	<SectionTitle title="Subject Wise Analysis" />
</div>
<div class="flex flex-col gap-8 items-center w-full mb-8">
	<!-- <Tabs on:tabSelected={handleClassTabSelection} {tabs} selectedIndex={selectedClassSubjFilterIndex} /> -->
	<Tabs
		on:tabSelected={handleClassTabSelection}
		{tabs}
		selectedIndex={selectedClassSubjFilterIndex}
	/>
</div>
{#if subWiseChartsLoading}
	<div class="h-80 mx-auto my-0">Loading subject wise data</div>
{:else if chartsError}
	<div>{chartsError}</div>
{:else}
	<div class="col-span-6">
		<!-- <AllSubjectsPercentileTrend subjectData={percentileTrend} error={percentileTrendError} /> -->
	</div>
	<StudentRow3 />
	<StudentTopicWiseAnalysis apiError={analyisWtSubAndStudIdError} {strengthAnalysis} />
{/if}
