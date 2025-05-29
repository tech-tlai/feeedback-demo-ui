<script>
  import TeacherUpload from '$lib/test/TeacherUpload.svelte'
  import StudentUpload from '$lib/test/StudentUpload.svelte'
  import AssignmentUpload from '$lib/test/Assignment.svelte'
  import { BarChart3, Upload, Users, FileText, CheckCircle, TrendingUp, Clock, Shield, Zap, Target, Award } from 'lucide-svelte'
  
  let currentUploadType = 'student'
  
  function handleUpload(event) {
    console.log('Files uploaded:', event.detail.files)
    // Handle the upload logic here
  }
  
  // Listen for upload events
  if (typeof document !== 'undefined') {
    document.addEventListener('upload', handleUpload)
  }
</script>

<div class="min-h-screen bg-white font-noto">
  <!-- Header -->
  <header class="bg-black shadow-lg relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-purple/20 to-accent-blue/20"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <div class="bg-gradient-to-r from-purple to-link p-2 rounded-lg">
            <BarChart3 class="h-6 w-6 text-white" />
          </div>
          <span class="ml-3 text-xl font-bold text-white">EduMetrics</span>
        </div>
        <nav class="hidden md:flex space-x-8">
          <a href="#features" class="text-gray-light hover:text-white transition-colors">Features</a>
          <a href="#upload" class="text-gray-light hover:text-white transition-colors">Upload</a>
          <a href="#analytics" class="text-gray-light hover:text-white transition-colors">Analytics</a>
          <a href="#contact" class="text-gray-light hover:text-white transition-colors">Contact</a>
        </nav>
        <button class="bg-gradient-to-r from-purple to-accent-blue hover:from-purple/80 hover:to-accent-blue/80 text-white border-0 px-6 py-2 rounded-lg font-medium transition-all">
          Get Started
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative py-24 bg-gradient-to-br from-black via-black to-accent-blue/10">
    <div class="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200&query=abstract geometric pattern')] opacity-5"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="inline-flex items-center bg-purple/10 text-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Zap class="h-4 w-4 mr-2" />
          AI-Powered Analytics
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Smart
          <span class="bg-gradient-to-r from-purple to-link bg-clip-text text-transparent"> Performance</span>
          <br />
          Analytics
        </h1>
        <p class="text-xl text-gray-light mb-8 leading-relaxed max-w-3xl mx-auto">
          Transform educational data into powerful insights. Upload different types of content and get instant analytics tailored to your needs.
        </p>
      </div>
    </div>
  </section>

  <!-- Upload Type Selection -->
  <section class="py-12 bg-gray-light/30">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-black mb-4">Choose Upload Type</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            onclick={() => currentUploadType = 'student'}
            class="px-6 py-3 rounded-lg font-medium transition-all {currentUploadType === 'student' ? 'bg-purple text-white' : 'bg-white text-gray-dark hover:bg-gray-light'}"
          >
            Student Results
          </button>
          <button 
            onclick={() => currentUploadType = 'teacher'}
            class="px-6 py-3 rounded-lg font-medium transition-all {currentUploadType === 'teacher' ? 'bg-purple text-white' : 'bg-white text-gray-dark hover:bg-gray-light'}"
          >
            Teacher Evaluations
          </button>
          <button 
            onclick={() => currentUploadType = 'assignment'}
            class="px-6 py-3 rounded-lg font-medium transition-all {currentUploadType === 'assignment' ? 'bg-purple text-white' : 'bg-white text-gray-dark hover:bg-gray-light'}"
          >
            Assignment Submissions
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Dynamic Upload Section -->
  <section id="upload" class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {#if currentUploadType === 'student'}
        <StudentUpload />
      {:else if currentUploadType === 'teacher'}
        <TeacherUpload />
      {:else if currentUploadType === 'assignment'}
        <AssignmentUpload />
      {/if}
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-gradient-to-r from-black via-accent-blue to-purple relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200&query=geometric pattern')] opacity-10"></div>
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-bold text-white mb-6">Ready to Revolutionize Your Analytics?</h2>
      <p class="text-xl text-gray-light mb-8 max-w-2xl mx-auto">
        Join over 10,000 educators who are already using EduMetrics to drive student success and improve learning outcomes.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="bg-white text-black hover:bg-gray-light px-8 py-3 rounded-lg font-medium transition-all">
          Start Free Trial
        </button>
        <button class="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium transition-all">
          Schedule Demo
        </button>
      </div>
      <p class="text-sm text-gray-light mt-4">No credit card required • 14-day free trial</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-black text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="flex items-center justify-center mb-6">
          <div class="bg-gradient-to-r from-purple to-link p-2 rounded-lg">
            <BarChart3 class="h-6 w-6 text-white" />
          </div>
          <span class="ml-3 text-xl font-bold">EduMetrics</span>
        </div>
        <p class="text-gray-light">
          &copy; 2024 EduMetrics. All rights reserved. Built for educators, by educators.
        </p>
      </div>
    </div>
  </footer>
</div>
