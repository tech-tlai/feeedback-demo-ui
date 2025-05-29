<script>
  import { Upload, CheckCircle, FileText, Target, Shield, Award } from 'lucide-svelte'
  
  // Props for customization
  export let title = "Smart File Upload"
  export let description = "AI-powered file processing with instant validation and preview"
  export let placeholderImage = "/placeholder.svg?height=120&width=120&query=file upload icon"
  export let uploadText = "Click to upload files"
  export let dragText = "or drag and drop"
  export let fileTypes = ".csv,.xlsx,.xls,.pdf"
  export let fileTypesDisplay = "CSV, Excel, PDF"
  export let maxSize = "5MB"
    
  // State
  let files =[]
  let isDragOver = false
  
  // Functions
  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files)
    files = selectedFiles
    console.log('files', files)
  }
  
  function handleUpload() {
    console.log("Uploading files:", files)
    // Emit custom event for parent component
    const event = new CustomEvent('upload', {
      detail: { files }
    })
    document.dispatchEvent(event)
  }
  
  function handleDragOver(event) {
    event.preventDefault()
    isDragOver = true
  }
  
  function handleDragLeave(event) {
    event.preventDefault()
    isDragOver = false
  }
  
  function handleDrop(event) {
    event.preventDefault()
    isDragOver = false
    const droppedFiles = Array.from(event.dataTransfer.files)
    files = droppedFiles
  }
  
  function removeFile(index) {
    files = files.filter((_, i) => i !== index)
  }
</script>

<div class="grid lg:grid-cols-2 gap-12 items-center">
  <!-- Upload Card -->
  <div class="border-2 border-dashed border-purple/30 bg-white/80 backdrop-blur-sm hover:border-purple/50 transition-all duration-300 rounded-lg">
    <!-- Card Header -->
    <div class="p-6 pb-0">
      <div class="flex items-center gap-3 text-black mb-2">
        <div class="bg-gradient-to-r from-purple to-accent-blue p-2 rounded-lg">
          <Upload class="h-5 w-5 text-white" />
        </div>
        <h3 class="text-xl font-semibold">{title}</h3>
      </div>
      <p class="text-gray-dark">{description}</p>
    </div>
    
    <!-- Card Content -->
    <div class="p-6 space-y-6">
      <!-- Upload Area -->
      <div 
        class="border-2 border-dashed rounded-xl p-8 text-center transition-colors bg-gradient-to-br from-purple/5 to-accent-blue/5 {isDragOver ? 'border-purple/70 bg-purple/10' : 'border-purple/30 hover:border-purple/50'}"
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
        on:drop={handleDrop}
      >
        <!-- Placeholder Image -->
        <div class="mb-4">
          <img 
            src={placeholderImage || "/placeholder.svg"} 
            alt="Upload placeholder" 
            class="w-20 h-20 mx-auto opacity-60 {isDragOver ? 'scale-110' : ''} transition-transform"
          />
        </div>
        
        <!-- Upload Icon and Text -->
        <div class="bg-gradient-to-r from-purple to-accent-blue p-3 rounded-full w-fit mx-auto mb-4">
          <Upload class="h-8 w-8 text-white" />
        </div>
        
        <label for="file-upload" class="cursor-pointer">
          <span class="text-lg font-medium text-purple hover:text-accent-blue transition-colors">
            {uploadText}
          </span>
          <span class="text-gray-dark"> {dragText}</span>
        </label>
        
        <input
          id="file-upload"
          type="file"
          multiple
          accept={fileTypes}
          onchange={handleFileChange}
          class="hidden"
        />
        
        <p class="text-sm text-gray-dark mt-2">{fileTypesDisplay} • Up to {maxSize} each</p>
      </div>

      <!-- Selected Files -->
      {#if files.length > 0}
        <div class="space-y-3 bg-green-light rounded-lg p-4">
          <h4 class="font-medium text-green-dark flex items-center gap-2">
            <CheckCircle class="h-4 w-4" />
            Files Ready for Analysis:
          </h4>
          {#each files as file, index}
            <div class="flex items-center gap-3 text-sm text-gray-dark bg-white rounded-lg p-2">
              <FileText class="h-4 w-4 text-purple" />
              <span class="flex-1">{file.name}</span>
              <span class="text-xs text-green-dark">✓ Valid</span>
              <button 
                onclick={() => removeFile(index)}
                class="text-red-dark hover:text-red-dark/80 text-xs"
              >
                Remove
              </button>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Upload Button -->
      <button
        onclick={handleUpload}
        class="w-full bg-gradient-to-r from-purple to-accent-blue hover:from-purple/80 hover:to-accent-blue/80 text-white border-0 rounded-lg py-3 px-6 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={files.length === 0}
      >
        {files.length === 0 
          ? "Select Files to Continue" 
          : `Analyze ${files.length} File${files.length > 1 ? "s" : ""}`}
      </button>
    </div>
  </div>

</div>
