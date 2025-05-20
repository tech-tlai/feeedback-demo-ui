<script>
   
    import ProfileSection from "$lib/components/profileSection/ProfileSection.svelte";
import StudentRow1 from "$lib/components/student/StudentRow1.svelte";
import StudentRow2 from "$lib/components/student/StudentRow2.svelte";
import StudentRow3 from "$lib/components/student/StudentRow3.svelte";
import StudentTopicWiseAnalysis from "$lib/components/student/StudentTopicWiseAnalysis.svelte";
import PerfHistorySection from "$lib/components/student/PerfHistorySection.svelte";
import GoalsSection from "$lib/components/student/GoalsSection.svelte";
import {onDestroy} from "svelte";
import { chatContextStore } from '$lib/stores/globalFilters.js';

onDestroy(() => {   
    chatContextStore.set(null)
});

</script>


<div class="w-full space-y-8 bg-gray-50 p-4">
    <div class="mx-auto flex max-w-[1400px] flex-col gap-5">

        <ProfileSection/>
        <StudentRow1/>
        <StudentRow2/>
        <StudentRow3/>
        <StudentTopicWiseAnalysis/>
        <PerfHistorySection/>
        <GoalsSection/>
    </div>
</div>


