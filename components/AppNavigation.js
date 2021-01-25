const AppNavigation = () => {
  return (
    <nav class="bg-white px-6 py-4 shadow">
	    <div class="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
        <div class="flex justify-between items-center">
          <div>
            <a href="#" class="text-blue-400 text-xl font-bold md:text-2xl">HEALTH EXPLORE</a>
          </div>
        </div>
        <div class="md:flex flex-col md:flex-row md:-mx-4 hidden">
          <a href="#" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">PROFILE</a>
          <a href="#" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">JOBS</a>
          <a href="#" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">PROFESSIONAL NETWORK</a>
          <a href="#" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">LOUNGE</a>
          <a href="#" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">SALARY</a>
        </div>

        <div class="md:flex flex-col md:flex-row md:-mx-4 hidden">
        	<a href="#" class="px-2 py-2 border-2 border-blue-400 text-blue-400 font-bold rounded hover:bg-blue-100">CREATE JOB</a>
          <a href="#" class="my-1 py-2 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">LOGOUT</a>
        </div>
	    </div>
    </nav>
  )
}

export default AppNavigation
