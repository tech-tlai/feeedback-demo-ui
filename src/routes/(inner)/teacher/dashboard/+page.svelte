<script>
	import TeacherProfileSection from '$lib/components/teacher/TeacherProfileSection.svelte';
	import GlobalFilters from '$lib/components/teacher/GlobalFilters.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import TeacherRow1 from '$lib/components/teacher/TeacherRow1.svelte';
	import TeacherRow2 from '$lib/components/teacher/TeacherRow2.svelte';
	import ScoreDistributionSection from '$lib/components/teacher/ScoreDistributionSection.svelte';
	import { SectionWiseScore, PerformanceAnalysis, TopicWiseAnalysisSection } from '$lib';
	import { onDestroy } from 'svelte';
	import { chatContextStore, selectedClassStore } from '$lib/stores/globalFilters.js';
	
	const profileData = {
		name: 'Sandeep Sharma',
		role: 'TEACHER',

		id: '321468',
		school: "St. Mary's Higher Secondary School",
		location: 'Trivandrum',
		image: '/sandeep_pic.png'
	};

	onDestroy(() => {
		chatContextStore.set(null);
		selectedClassStore.set('')
	});

	// let selectedClass='';
	// function tabSelectionHandler(event) {
	// 	console.log('event', event.detail)
	// 	const { index, tab } = event.detail;
	// 	console.log('Selected Tab:', index, 'Tab Name:', tab);
	// }
</script>

<div class="w-full space-y-8 bg-gray-50 p-4">
	<div class="mx-auto flex max-w-[1400px] flex-col gap-5">
		<TeacherProfileSection {profileData} />
		<GlobalFilters />
		<TeacherRow1 />
		<TeacherRow2 />
		<!-- <div class="grid grid-cols-12 gap-5">
			<div class="col-span-6">
				<SectionWiseScore />
			</div>
		</div> -->

		<TopicWiseAnalysisSection />
		<ScoreDistributionSection />
	</div>
</div>
