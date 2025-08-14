<script>
	import { SectionTitle, Tabs } from '$lib';
	import { AllSubjectsPercentileTrend } from '$lib';
	
	import StudentTopicWiseAnalysis from '$lib/components/student/StudentTopicWiseAnalysis.svelte';
	import { studentUploadedFiles } from '$lib/stores/studentUploadState';
	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { formatDateDDMonthShortYear } from '$lib/utils';

	export let subWiseChartsLoading = false;
	export let chartsError = null;
	export let strengthAnalysis = {};
	export let percentileTrend = [];
	let tabs = [
		// { id: 1, text: 'English', subject: 'English' },
		// { id: 2, text: 'Maths', subject: 'Maths' }
	];

	const dispatch = createEventDispatcher();

	let selectedClassSubjFilterIndex = 0;
	let isMounted = false;
	let analyisWtSubAndStudIdError = null;

	$: allSubjects = $page.url.searchParams.get('subjects') || '';
	$: studentId = $page.params.studentId;
	$: tabs = allSubjects.split(',')?.map((sub, index) => ({ id: index + 1, text: sub }));
	$: selectedSubject = $page.url.searchParams.get('sub') || '';

	function handleClassTabSelection(e) {
		const { index, tab } = e.detail;

		dispatch('tabSelected', e.detail);
	}

	onMount(() => {
		isMounted = true;
	});
</script>

<div class="flex w-full justify-center mt-8">
	<SectionTitle title="Subject Wise Analysis" />
</div>
<div class="flex flex-col gap-8 items-center w-full mb-4">
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
		<AllSubjectsPercentileTrend subjectData={percentileTrend} selectedLanguage={selectedSubject}/>
	</div>

	<!-- <StudentRow3 /> -->
	<StudentTopicWiseAnalysis apiError={analyisWtSubAndStudIdError} {strengthAnalysis} />
{/if}
