<script>

</script>

<main class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
  <div class="w-full max-w-6xl mx-auto">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">St. Mary's Higher Secondary School</h1>
      <h2 class="text-xl text-slate-600">Dashboard Portal</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <!-- Student Dashboard Card -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-700 hover:scale-105 hover:shadow-xl">
        <div class="h-64 bg-gradient-to-r from-purple-400 to-indigo-500 relative overflow-hidden">
          <img 
            src="/students-thumbnail.png" 
            alt="Student Dashboard" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div class="p-4 text-white">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span class="text-sm font-medium">View your academic progress</span>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-2xl font-bold text-slate-800 mb-2">Student Dashboard</h3>
          <p class="text-slate-600 mb-4">Track your performance, view exam schedules, and get personalized insights.</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-indigo-600">
              <span class="text-sm font-medium">Recent Results Available</span>
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <a href="/student-dashboard">
              <button 
              
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
              Enter
            </button>
          </a>
          </div>
        </div>
      </div>

      <!-- Teacher Dashboard Card -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-700 hover:scale-105 hover:shadow-xl">
        <div class="h-64 bg-gradient-to-r from-blue-400 to-cyan-500 relative overflow-hidden">
          <img 
            src="/school-thumbnail.png" 
            alt="Teacher Dashboard" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div class="p-4 text-white">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span class="text-sm font-medium">Monitor class performance</span>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-2xl font-bold text-slate-800 mb-2">Teacher Dashboard</h3>
          <p class="text-slate-600 mb-4">Analyze class performance, track student progress, and manage academic insights.</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-blue-600">
              <span class="text-sm font-medium">Class Reports Updated</span>
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <a href="/teacher-dashboard">
              <button              
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
              Enter
            </button>
          </a>
          </div>
        </div>
      </div>
    </div>

  
  </div>
</main>

<style>
  /* Additional styles if needed */
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
</style>