<script>
    import {Quote,StudentPerfAnalysis} from '$lib';
    export let perfAnalysis ={};
    export let apiError=false
</script>

<div class="grid grid-cols-12 gap-5">
    <div class="col-span-9">
        <StudentPerfAnalysis perfData={perfAnalysis} error={apiError} />
    </div>
    <div class="col-span-3">
        <Quote/>
    </div>
    </div>