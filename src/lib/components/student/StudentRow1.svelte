<script>
import {PerfDummyCard, ProgressTrendChart,PerformanceTable,SectionTitle} from '$lib'
</script>

<div class="flex w-full justify-center my-6">
    <SectionTitle title="Performance Analysis" />
</div>
<div class="grid grid-cols-12 gap-5">
<div class="col-span-3">
    <div>

        <PerfDummyCard/>
    </div>
</div>
<div class="col-span-9">
    <PerformanceTable/>
</div>
</div>