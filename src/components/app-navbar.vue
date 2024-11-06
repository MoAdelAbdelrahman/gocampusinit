<template>
  <div id ='navbar'>
  <nav class="bg-green-900 shadow-lg">
    <div class="max-w-screen-xl mx-auto flex items-center justify-between p-4 text-white">
      <a href="https://gocampusinit.vercel.app/" class="flex items-center">
        <img src="/logo.png" class="h-8 mr-3" alt="GoCampus Logo" />
        <span class="text-2xl font-semibold">GoCampus</span>
      </a>
      <div class="flex items-center">
        <div class="hidden md:flex space-x-4">
          <a href="#" class="py-2 px-3 bg-green-800 bg-opacity-50 rounded hover:bg-opacity-100 transition-colors">Home</a>
          <a href="#" class="py-2 px-3 bg-green-800 bg-opacity-50 rounded hover:bg-opacity-100 transition-colors">About</a>
          <a href="#" class="py-2 px-3 bg-green-800 bg-opacity-50 rounded hover:bg-opacity-100 transition-colors">Services</a>
        </div>
        <button type="button" class="ml-3 md:hidden text-gray-200 hover:text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </div>
  </nav>
</div>
</template>


<script>
document.addEventListener('DOMContentLoaded', () => {
  // Toggle for the search bar
  document.querySelectorAll('[data-collapse-toggle="navbar-search"]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('aria-controls');
      const targetElement = document.getElementById(targetId);

      // Toggle the "hidden" class based on its current state
      targetElement.classList.toggle('hidden');
    });
  });

  
});

// In AppNavbar.vue script
export default {
  name: 'AppNavbar',
  
  
}


</script>

<style scoped>
/* Base styles for the navbar */
nav.bg-green-900 {
  background-color: #007C41; /* UofA Green */
}

/* Hover effect for list items */
nav .bg-green-800:hover {
  background-color: #005f30; /* Darker shade for hover */
}

/* Opacity transition for hover effects */
nav .bg-opacity-50:hover {
  background-color: rgba(0, 124, 65, 0.85); /* Slightly transparent green */
}

/* Focus and hover styles for interactive elements */
button:focus, a:hover {
  outline: none;
  
  color: #FFD200; /* UofA Gold */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .md\\:hidden {
    display: none;
  }
}
</style>