<script>
	import { Card } from '$lib';
</script>

<Card>
	<div slot="image" class="h-full w-full relative text-sm">
		<img src="quote_bg.png" alt="Quote" class="h-full object-cover blur-lg" />
		<div class="absolute top-0 left-0 p-8 flex flex-col gap-4 text-white  ">
			<p class="uppercase  font-medium ">QUOTE OF THE DAY</p>
			<h4 class="text-2xl  font-bold">
				If you want to shine like a sun, first burn like a sun
			</h4>
			<span class="font-semibold">- Dr. APJ Abdul Kalam</span>
		</div>
	</div>
    
</Card>

<style>
	/* used style because, tailwind doesnt have a built in utility for this */
	img {
		filter: brightness(80%);
	}
</style>
