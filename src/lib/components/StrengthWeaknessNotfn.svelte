<script>
	// Props
	export let msgType = 'strengths'; // Can be 'strength' or 'weakness'
	export let message = ''; // The specific strength or weakness message
	export let newKeywords = [];
	// Computed properties based on message type
	$: isStrength = msgType === 'strengths';
	$: title = isStrength ? 'Yay ! New strength discovered:' : 'Caution ! New weakness identified:';
	$: icon = isStrength ? '🎊' : '⚠️';
	$: messageColor = isStrength ? 'text-green-600' : 'text-red-600';
</script>

<div class="bg-gray-50 text-sm rounded-lg p-3 shadow-sm">
	<div>
		<div class="flex items-center">
			<span class="mr-2 text-lg">{icon}</span>
			<p class="font-medium text-gray-dark">{title}</p>
		</div>
		<p class={`font-medium ${messageColor}`}>{message}</p>
		<p class={`text-center ${isStrength? 'text-green-dark':'text-red-dark'}`} >{newKeywords.join(', ')}</p>
	</div>
</div>
