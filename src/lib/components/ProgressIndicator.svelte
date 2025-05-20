<script>
    // Props
    export let label = "Avg. Score";
    export let value = 0; // As percentage (0-100)
    export let period = "";
    
    // Performance criteria thresholds
    export let thresholds = {
      poor: 50,    // Below 40% is poor
      average: 70  // Below 70% is average, above is good
    };
    
    // Determine performance level based on value
    $: performanceLevel = value < thresholds.poor ? 'poor' : 
                          value < thresholds.average ? 'average' : 'good';
    
    // Map performance level to colors
    $: colors = {
      poor: {
        bg: '#FFF2F2',
        fill: '#A20B0B'
      },
      average: {
        bg: '#FFFBAF',
        fill: '#FF8800'
      },
      good: {
        bg: '#F5FFEB',
        fill: '#076414'
      }
    };
    
    // Get current colors based on performance level
    $: currentColors = colors[performanceLevel];
  </script>
  
  <div class="w-full max-w-md">
    <div class="flex justify-between items-center mb-2">
      <div class="text-gray-dark text-sm">
        {label}  {period? `-(${period})` : ''}
      </div>
      <div class="font-medium text-sm">
        {value}%
      </div>
    </div>
    
    <div 
      class="w-full h-2 rounded-full" 
      style="background-color: {currentColors.bg};"
    >
      <div 
        class="h-full rounded-full transition-all duration-300 ease-in-out" 
        style="width: {value}%; background-color: {currentColors.fill};"
      ></div>
    </div>
</div>