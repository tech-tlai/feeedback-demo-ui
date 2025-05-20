<script>
    import {SearchBar} from "$lib"
    export let data = [];
    export let headers = [
      { key: 'rank', label: 'Rank', align: 'left' },
      { key: 'name', label: 'Name', align: 'left' },
      { key: 'marksObtained', label: 'Marks Obtained', align: 'right' },
      { key: 'marksPercentage', label: 'Marks (in %)', align: 'center', highlightValue: true },
      { key: 'attendance', label: 'Attendance(%)', align: 'right' }
    ];
    export let headerTheme = 'neutral'; // 'positive', 'negative', 'neutral'
    export let itemsPerPage = 5;
    export let markThresholds={
        poor:50,
        average:70    
        
    }



    
    
    // Pagination state
    let currentPage = 1;
    let totalPages = Math.ceil(data.length / itemsPerPage);
    
    // Computed values
    $: startIndex = (currentPage - 1) * itemsPerPage;
    $: endIndex = Math.min(startIndex + itemsPerPage, data.length);
    $: currentItems = data.slice(startIndex, endIndex);
    $: totalPages = Math.ceil(currentItems.length / itemsPerPage);
    
    // Header background color based on theme
    $: headerBgColor = {
      'positive': 'bg-green-light',
      'negative': 'bg-red-light',
      'neutral': 'bg-gray-light' // Light pink/beige color from the image
    }[headerTheme] || 'bg-[#FFF5F5]';
    
    // Functions for pagination
    function nextPage() {
      if (currentPage < totalPages) {
        currentPage++;
      }
    }
    
    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
      }
    }
    
    function goToPage(page) {
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
      }
    }
    
    // Function to determine mark color
    function getMarkColor(percentage) {
        
      if (percentage <= markThresholds.poor  ) return 'bg-red-light text-red-dark';
      if (percentage > markThresholds.poor && percentage <= markThresholds.average  ) return 'bg-orange-light text-orange-dark';
      if (percentage > markThresholds.average) return 'bg-green-light text-green-dark';
      return '';
    }
    
    // Function to get alignment class
    function getAlignClass(align) {
      switch (align) {
        case 'right': return 'text-right';
        case 'center': return 'text-center';
        default: return 'text-left';
      }
    }
    
    // Function to render cell content based on header configuration
    function renderCell(item, header) {
      const value = item[header.key];
      
      if (header.isPercentage) {
        return `
          <div class="flex justify-center">
            <span class="px-3 py-1 rounded-full text-center min-w-[30px] ${getMarkColor(value)}">
              ${value}
            </span>
          </div>
        `;
      }
      
      return value;
    }

    function handleSearchBoxValue(event) {
      const searchValue = event.detail.toLowerCase();
      currentItems = data.filter(item => {
        return headers.some(header => {
          const cellValue = item[header.key].toString().toLowerCase();
          return cellValue.includes(searchValue);
        });
      });
    }
  </script>
  
  <div class="mb-4 px-4" >

    <SearchBar on:handleSearchValue={handleSearchBoxValue} placeholder={'Search by name'}/>
  </div>
  <div class="w-full overflow-hidden  shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class={`${headerBgColor} text-gray-dark`}>
          <tr>
            {#each headers as header}
              <th class={`px-4 py-3 font-medium ${getAlignClass(header.align)}`}>
                {header.label}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-light">
          {#each currentItems as item, index}
            <tr class={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {#each headers as header}
                <td class={`px-4 py-4 ${getAlignClass(header.align)}`}>
                  {#if header.highlightValue}
                    <div class="flex justify-center">
                      <span class={`px-3 py-1 rounded-full text-center min-w-[60px] ${getMarkColor(item[header.key])}`}>
                        {item[header.key]}
                      </span>
                    </div>
                  {:else}
                    <span class="text-gray-dark">{item[header.key]}</span>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-light">
      <div class="text-sm text-gray-dark">
        {startIndex + 1}-{endIndex} of {data.length} items
      </div>
      <div class="flex items-center space-x-2">
        <button 
          class="p-2 rounded-full text-gray-dark hover:bg-gray-light disabled:opacity-50"
          on:click={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <div class="bg-white border border-gray-light rounded-md">
          <input 
            type="text" 
            class="w-8 text-center text-gray-dark" 
            value={currentPage}
            on:change={(e) => goToPage(parseInt(e.target.value) || 1)}
            aria-label="Current page"
          />
        </div>
        
        <span class="text-gray-dark">of {totalPages}</span>
        
        <button 
          class="p-2 rounded-full text-gray-dark hover:bg-gray-light disabled:opacity-50"
          on:click={nextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>