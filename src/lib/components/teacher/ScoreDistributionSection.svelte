<script>
    import {StudentDistribution, AvgMaxMin, SectionTitle} from "$lib"
    export let avgMaxMin={}
</script>

<div class="flex w-full justify-center my-6">
    <SectionTitle title="Student Distribution" />
</div>
<div class="grid grid-cols-12 gap-5">
    <!-- <div class="col-span-4">
        <StudentDistribution />
    </div> -->
    <div class="col-span-6">
        <AvgMaxMin  {avgMaxMin}/>
    </div>
</div>