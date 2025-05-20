<script>
    import { onMount } from 'svelte';
    import {Card, DrilldownChart} from "$lib";
    import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';

    const chartTitle = "Student distribution";
    let transformedData = null;
    let isLoading = true;
    let error = null;
    let isMounted=false;

    function setContextInChatBox() {
		const context = {
			type: 'performance',
				title:`${$selectedClassStore?`${$selectedClassStore} -`:''} ${chartTitle}`
		};
		chatContextStore.set(context);
	}


    async function fetchStudentDistribution(){
        try {
            isLoading=true;
			error=null;
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;

            const response = await fetch(`/apis/teacher/student-distribution/${classSubject}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            transformedData = {
                name: 'Student Distribution',
                children: Object.entries(data.scoreRanges).map(([range, details]) => ({
                    name: range,
                    children: details.students.map(student => ({
                        name: student.name,
                        value: details.studentCount
                    }))
                }))
            };
        } catch (err) {
            error = err.message;
        } finally {
            isLoading = false;
        }
    }

    $: if (isMounted && $selectedClassStore) {
		fetchStudentDistribution();
	}


    onMount(async () => {
        isMounted=true;
        
    });
</script>

<Card>
    <div class="flex justify-between items-center text-sm mb-4">

        <h4 class="text-black text-sm font-bold ">{chartTitle}</h4>
        <button class="flex gap-2 items-end text-link font-medium" on:click={setContextInChatBox}>
            Explore with AI <FilterIcon size={16} /></button
            >
        </div>
    <div class="chart-meta text-gray-dark text-sm mb-4 flex gap-4">
        <span>{$selectedClassStore.fullClassName ?$selectedClassStore.fullClassName :''}</span>
        <span>Date: {new Date().toLocaleDateString()}</span>
    </div>

    {#if isLoading}
        <div class="p-4 text-center">Loading...</div>
    {:else if error}
        <div class="p-4 text-center text-red-500">{error}</div>
    {:else}
        <DrilldownChart data={transformedData} />
    {/if}
</Card>