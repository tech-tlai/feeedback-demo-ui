<script>
    export let className = "Class 3 A";
    export let studentCount = 37;
    export let subjects = [
      { name: "English", score: 64.5 },
      { name: "Social science", score: 58.5 }
    ];
    export let testPeriod = "last 5 tests";
  </script>
  
  <div class="bg-white rounded-xl p-4 shadow-sm max-w-[280px] min-w-[225px] flex-1">
    <h2 class="text-base font-bold text-accent-blue">{className}</h2>
    
    <div class="flex items-center mt-2 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <span class="ml-2 text-black font-medium text-sm">{studentCount} Students</span>
    </div>
    
    <div class="border-t border-gray-light pt-4">
      <h3 class="text-xs font-medium text-black">Avg. Score <span class="text-gray-dark font-normal">({testPeriod})</span></h3>
      
      <div class="mt-4 space-y-3 text-sm">
        {#each subjects as subject}
          <div class="flex items-center justify-between">
            <span class="text-black  ">{subject.subject}</span>
            <div class="bg-orange-light px-4  rounded-lg">
              <span class="text-orange-dark font-semibold ">{subject.score}%</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>