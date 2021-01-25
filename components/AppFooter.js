import { Fragment } from 'react'

const AppFooter = () => {

  const AboutUs = () => (
    <Fragment>
      <div class="font-bold mb-2 mt-4">Abous Us</div>
      <p class="text-grey-800 leading-normal mb-2">
        We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.
      </p>
      <p class="text-grey-800 leading-normal">
        All copyrights reserved 2020 - Health Explore.
      </p>
    </Fragment>
  )

  const Sitemap = () => (
    <Fragment>
      <div class="font-bold mb-2 mt-4">Sitemap</div>
      <ul class="list-reset leading-normal">
        <li class="hover:text-blue-500 text-grey-800">Nurses</li>
        <li class="hover:text-blue-500 text-grey-800">Employers</li>
        <li class="hover:text-blue-500 text-grey-800">Social networking</li>
        <li class="hover:text-blue-500 text-grey-800">Jobs</li>
      </ul>
    </Fragment>
  )

  const Privacy = () => (
    <Fragment>
      <div class="font-bold mb-2 mt-4">Privacy</div>
      <ul class="list-reset leading-normal">
        <li class="hover:text-blue-500 text-grey-800">Terms of use</li>
        <li class="hover:text-blue-500 text-grey-800">Privacy policy</li>
        <li class="hover:text-blue-500 text-grey-800">Cookie policy</li>
      </ul>
    </Fragment>
  )

  return (
    <div class="bg-white p-6 pb-10 shadow">
      <div class="sm:flex mx-auto">
        <div class="sm:w-1/2 px-2 sm:mt-0 mt-8 h-auto">
          <AboutUs/>
        </div>
        <div class="sm:w-1/4 h-auto px-2 sm:mt-0 mt-8">
          <Sitemap/>
        </div>
        <div class="sm:w-1/4 h-auto px-2 sm:mt-0 mt-8">
          <Privacy/>
        </div>
      </div>
    </div>
  )
}

export default AppFooter
