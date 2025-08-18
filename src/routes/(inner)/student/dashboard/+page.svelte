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

	let profileData = {
		name: 'Kavya Reddy',
		role: 'STUDENT',
		class_: '3',
		id: '321468',
		school: "St. Mary's Higher Secondary School",
		location: 'Trivandrum',
		image: '/kavya_reddy.png'
	};

	onDestroy(() => {
		chatContextStore.set(null);
	});
</script>


<div class="w-full space-y-8 bg-gray-50 p-4">
	<div class="mx-auto flex max-w-[1400px] flex-col gap-5">
		<ProfileSection {profileData}/>
		<StudentRow1 />
		<StudentRow2 />
		<StudentRow3 />
		<StudentTopicWiseAnalysis />
		<PerfHistorySection />
		<GoalsSection />
	</div>
</div>
