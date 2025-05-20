<script>
    export let name = '';
    export let role = '';
    export let class_ = '';
    export let id = '';
    export let school = '';
    export let location = '';
    export let image = '';
  </script>
  
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="bg-purple-200 h-32 relative flex items-center justify-center">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-full h-full bg-center bg-cover" style="background-image: url('/playful_bg.png')"></div>
      </div>
    </div>
    
    <div class="relative px-4 pb-4 -mt-16 flex flex-col items-center">
      <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white">
        <img src={image || "/placeholder.svg"} alt={name} class="w-full h-full object-cover" />
      </div>
      
      <h2 class="mt-2 text-2xl font-bold text-center text-black">{name}</h2>
      <p class="text-gray-600 font-semibold">{role}</p>
      
      <div class="mt-2 text-center text-gray-dark text-sm">
        <p class="mb-2">{class_ ? `Class ${class_}`:'' } &nbsp; ID: {id}</p>
        <p class="text-sm">{school}</p>
        <p class="text-sm">{location}</p>
      </div>
    </div>
  </div>