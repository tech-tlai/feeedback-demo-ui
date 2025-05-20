<script>
	import Card from '$lib/components/Card.svelte';

	// Props
	export let className = 'Class 5';
	export let achievements = [
		'Top 10% of the class' 
	];
	export let goalsAchieved = '11/15';
	export let totalGoals = '';
	export let overallRank = '9 / 45';
	export let overallScore = '';
	export let badges = ['gold', 'silver', 'bronze', 'green', 'purple', 'red'];
	export let onDetailsClick = () => {};

	// Badge icons mapping
	let badgeIcons = {
		gold: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-yellow-500">
                <circle cx="12" cy="12" r="10" fill="#FFC107" />
                <path d="M12 6l1.5 4.5h4.5l-3.6 2.6 1.4 4.4-3.8-2.8-3.8 2.8 1.4-4.4-3.6-2.6h4.5z" fill="#FFF" />
              </svg>`
		},
		silver: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-400">
                <circle cx="12" cy="12" r="10" fill="#C0C0C0" />
                <path d="M12 6l1.5 4.5h4.5l-3.6 2.6 1.4 4.4-3.8-2.8-3.8 2.8 1.4-4.4-3.6-2.6h4.5z" fill="#FFF" />
              </svg>`
		},
		bronze: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-yellow-700">
                <circle cx="12" cy="12" r="10" fill="#CD7F32" />
                <path d="M12 6l1.5 4.5h4.5l-3.6 2.6 1.4 4.4-3.8-2.8-3.8 2.8 1.4-4.4-3.6-2.6h4.5z" fill="#FFF" />
              </svg>`
		},
		green: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-500">
                <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50" />
              </svg>`
		},
		purple: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-purple-500">
                <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#9C27B0" />
              </svg>`
		},
		red: {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500">
                <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#F44336" />
              </svg>`
		}
	};
</script>

<Card>
	<div class="text-sm flex flex-col justify-between gap-4 h-full ">
        <div class="flex flex-col gap-4">
            <div class="flex justify-between items-start">
                <h4 class="text-xl font-bold text-accent-blue">{className}</h4>
    
                <div>
                    <h3 class="text-black font-medium text-right mb-2">Badges</h3>
                    <div class="flex flex-wrap justify-end gap-1">
                        {#each badges as badge}
                            {#if badgeIcons[badge]}
                                <div class="w-6 h-6">
                                    {@html badgeIcons[badge].icon}
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
    
            <div class="">
                <h2 class=" font-bold text-black mb-4">Achievements</h2>
                <ul class="space-y-3">
                    {#each achievements as achievement}
                        <li class="flex items-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 text-green-500 mr-2 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <span class="text-gray-dark">{achievement}</span>
                        </li>
                    {/each}
                </ul>
            </div>
    
            <div class="space-y-2">
                <p class=" font-bold text-black">
                    Goals achieved: <span class="font-normal">{goalsAchieved} /{totalGoals}</span>
                </p>
                <p class=" font-bold text-black">
                    Overall rank: <span class="font-normal">{overallRank}</span>
                </p>
                <p class=" font-bold text-black">
                    Overall score: <span class="font-normal">{overallScore?overallScore:'-'}</span>
                </p>
            </div>

        </div>

		<div class="mt-auto">
			<button class="text-accent-blue hover:underline focus:outline-none" on:click={onDetailsClick}>
				Details
			</button>
		</div>
	</div>
</Card>
