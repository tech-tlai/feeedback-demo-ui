<script>
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const currentMonth = 'February 2025';
    
    // Sample calendar data
    const calendarDays = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 1, 2, 3, 4, 5]
    ];
    
    const specialDays = {
      23: 'attended',
      27: 'missed'
    };
  </script>
  
  <div class="bg-white rounded-lg shadow p-4">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Exam Schedule</h2>
    
    <div class="flex justify-between items-center mb-4">
      <div class="text-lg text-gray-600">{currentMonth}</div>
      <div class="flex space-x-2">
        <button class="text-gray-500 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="text-gray-500 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-7 gap-1 text-center mb-2">
      {#each days as day}
        <div class="text-xs font-medium text-gray-500">{day}</div>
      {/each}
    </div>
    
    {#each calendarDays as week}
      <div class="grid grid-cols-7 gap-1 text-center mb-1">
        {#each week as day}
          <div class={`
            p-1 text-sm rounded-full
            ${day === 23 ? 'bg-purple text-white' : ''}
            ${day === 27 ? 'bg-orange-500 text-white' : ''}
            ${day > 28 && day < 6 ? 'text-gray-400' : 'text-gray-700'}
          `}>
            {day}
          </div>
        {/each}
      </div>
    {/each}
    
    <div class="flex justify-around mt-4 text-sm">
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-purple mr-1"></div>
        <span>Attended</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-orange-dark mr-1"></div>
        <span>Missed</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-yellow-300 mr-1"></div>
        <span>Upcoming</span>
      </div>
    </div>
  </div>