<script>
// Props: steps (array of {label, complete, active})
export let steps = [];
</script>
<!-- h-12 w-12 p-2 rounded-lg  bg-gradient-to-r from-accent-blue/50 to-accent-blue/10 -->
<div class="flex items-center justify-center gap-8 my-8">
    {#each steps as step, i}
        <div class="flex items-center gap-2">
            <div class="relative flex items-center justify-center">
                <div class="h-8 w-8 rounded-full flex items-center justify-center font-bold text-white"
                    class:bg-green-600={step.complete}
                    class:bg-blue-600={!step.complete && step.active}
                    class:bg-gray-300={!step.complete && !step.active}
                >
                    {i + 1}
                </div>
            </div>
            <span class="text-base font-medium" class:text-gray-900={step.active} class:text-gray-500={!step.active}>{step.label}</span>
            {#if i < steps.length - 1}
                <div class="w-8 h-1 bg-gray-300 mx-2"></div>
            {/if}
        </div>
    {/each}
</div>
