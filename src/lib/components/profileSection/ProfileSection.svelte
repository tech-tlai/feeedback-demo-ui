<script>
    import Profile from '$lib/components/profileSection/Profile.svelte';
    import StatisticsSection from '$lib/components/profileSection/StatisticsSection.svelte';
    import ChatHistory from '$lib/components/profileSection/ChatHistory.svelte';
    import ChatInterface from '$lib/components/profileSection/ChatInterface.svelte';
    import ExamSchedule from '$lib/components/profileSection/ExamSchedule.svelte';
    import Achievements from '$lib/components/profileSection/Achievements.svelte';
    
    // Sample data
    export let profileData = {
      name: 'Kavya Reddy',
      role: 'STUDENT',
      class_: '3',
      id: '321468',
      school: "St. Mary's Higher Secondary School",
      location: 'Trivandrum',
      image: '/kavya_reddy.png'
    };
    
    const statsData = [
      { 
        title: 'MARKS', 
        value: '190', 
        total: '300', 
        icon: '📋', 
        color: 'bg-purple-100' 
      },
      { 
        title: 'CLASS POSITION', 
        value: 'Top', 
        percentage: '50%', 
        icon: '🏅', 
        color: 'bg-orange-100' 
      },
      { 
        title: 'OVERALL POSITION', 
        value: 'Top', 
        percentage: '70%', 
        icon: '🏆', 
        color: 'bg-yellow-100' 
      },
      { 
        title: 'GOALS ACHIEVED', 
        value: '9', 
        total: '15', 
        icon: '🎯', 
        color: 'bg-red-100' 
      }
    ];
    
    const chatHistory = [
      'How did I perform in previous 4 English tests?',
      'Analyse my weaknesses in Hindi grammar.',
      'Overall performance in Mathematics tests',
      'What feedback do you have on my problem..',
      'How did I perform in previous 4 English tests?'
    ];
    
    const pinnedChats = 12;
    
    const suggestedQueries = [
      {
        title: 'Subject specific insights',
        query: 'How did I perform in Mathematics?'
      },
      {
        title: 'Analyze weak areas',
        query: 'Where am I losing marks in Geography?'
      }
    ];
    
    const achievements = [
      {
        title: 'Achiever of the month',
        metadata: 'Metadata',
        icon: '🏅',
        color: 'bg-purple-100'
      },
      {
        title: 'Mathematics Mid-term',
        target: '85%',
        score: '88%',
        icon: '👍',
        color: 'bg-green-100'
      }
    ];

    let chatInterface = null; // Reference to the ChatInterface component

    function handleClick() {
      if (chatInterface) {
        chatInterface.focusChatBox(); // Call the focusChatBox method from ChatInterface
      }
    }

 

  </script>
  
  <main class="min-h-screen ">
    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Left column -->
      <div class="lg:col-span-3 space-y-5">
        
        <Profile {...profileData} />
        <ChatHistory history={chatHistory} pinnedCount={pinnedChats} />
      </div>
      
      <!-- Middle column -->
      <div class="lg:col-span-6 space-y-5">
      <div class="flex flex-col gap-4 h-full">

        <div>
          <h2 class="text-base font-medium text-gray-700 mb-4">RECENT RESULT - MID TERM '24</h2>
          <StatisticsSection stats={statsData} />
        </div>
        <ChatInterface suggestedQueries={suggestedQueries} bind:this={chatInterface}/>
      </div>
      </div>

      
      <!-- Right column -->
      <div class="lg:col-span-3 space-y-5">
        <ExamSchedule />
        <Achievements items={achievements} />
      </div>
    </div>
  </main>
  
  <style lang="postcss">
    :global(body) {
      font-family: 'Roboto', sans-serif;
    }
  </style>