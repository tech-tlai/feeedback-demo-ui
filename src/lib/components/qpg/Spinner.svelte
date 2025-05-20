<script>
	export let size = '20px'; // Default size for width and height
	export let borderWidth = '2px'; // Default border width
	export let color= "orange"
</script>

<div
	class="rounded-full  animate-spin"
	style="width: {size}; height: {size}; border:2px solid white; border-top:{borderWidth} solid {color};"
></div>
