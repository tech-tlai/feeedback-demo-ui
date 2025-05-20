<script>
    import {GoalsCard, PerformanceTable,SectionTitle, CurrentGoals,BadgesUnlocked} from "$lib"
</script>

<div class="flex w-full justify-center my-6">
	<SectionTitle title="Goals & Badges" />
</div>
<div class="grid grid-cols-12 gap-5">
    <div class="col-span-3">
        <div>

            <GoalsCard/>
        </div>
    </div>
    <div class="col-span-6">
        <CurrentGoals/>
    </div>
    <div class="col-span-3">
        <BadgesUnlocked/>
    </div>
    </div>