import { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'

import config from '../config'

const SearchBox = ({currentFilter, setCurrentFilter}) => {
  return (
      <input 
        type="search" 
        placeholder="Search for any job by title, keyword or company"
        value={currentFilter.query}
        onChange={(event) => {
          event.preventDefault()
          setCurrentFilter({
            ...currentFilter,
            query: event.target.value
          })
        }}
        class="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" />
  )
}

const AppMainBody = () => {
  const [filters, setFilters] = useState({})
  const [currentSort, setCurrentSort] = useState({})
  const [currentFilter, setCurrentFilter] = useState({})
  const [jobs, setJobs] = useState([])
  const [totalJobs, setTotalJobs] = useState([])
  let abortController

  useEffect(async () => {
    const res = await fetch(`${config.apiurl}/api/filters`)
    const jsonRes = await res.json()
    setFilters(jsonRes)
  }, [])

  useEffect(async () => {
    if (abortController) abortController.abort()
    abortController = new window.AbortController()
    const params = new URLSearchParams()

    Object.keys(currentSort).forEach((key) => {
      params.set(key, currentSort[key]) 
    })

    Object.keys(currentFilter).forEach((key) => {
      params.set(key, currentFilter[key]) 
    })

    try {
      const res = await fetch(
        `${config.apiurl}/api/jobs?` + params.toString(),
        { signal: abortController.signal }
      )
      const jsonRes = await res.json()
      setJobs(jsonRes.jobs)

      const totalJobs = jsonRes.jobs.reduce((acum, facility) => { 
        return acum + (facility.items.length || 0 )
      }, 0)
      setTotalJobs(totalJobs)
    } catch (e) {
      console.error(e)
    }
  }, [currentSort, currentFilter])

  const Sidebar = () => {
    const ClearFilter = () => {
      return (
        <div class="mt-2 px-8">
          <div class="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
            <h1 class="mb-4 text-xl font-bold">CURRENT FILTER</h1>
            {Object.keys(currentFilter).map((key) => {
              return (
                <div>
                  {currentFilter[key]}
                  <button 
                    onClick={() => {
                      const newFilter = { ...currentFilter }
                      delete newFilter[key]
                      setCurrentFilter(newFilter)
                    }}
                     class="text-xs text-gray-400 mx-1 hover:text-gray-600 hover:underline">
                    (clear)
                  </button>
                </div>
              )
            })

            }
          </div>
        </div>

      )
    }

    const Filter = ({label, filterField}) => {
      return (
        <div class="mt-2 px-8">
          <div class="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
            <h1 class="mb-4 text-xl font-bold">{label}</h1>
            <ul>
              {filters[filterField]?.map((filter) => (
                <li id={filter.key} class="mt-2">
                  <button 
                    onClick={() => {
                      setCurrentFilter({
                        ...currentFilter,
                        [filterField]: filter.key
                      })
                    }}
                    class="mx-1 hover:text-gray-600 hover:underline">
                    { filter.key }
                  </button>
                  <span class="text-xs text-gray-400 mx-1">
                    { '(' + new Intl.NumberFormat("en-US").format(filter.doc_count) + ')' }
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div class="-mx-8 w-4/12 hidden lg:block">
        {Object.keys(currentFilter).length > 0 && <ClearFilter/>}
        <Filter label="JOB TYPE" filterField="job_type"/>
        <Filter label="DEPARTMENT" filterField="department"/>
        <Filter label="WORK SCHEDULE" filterField="work_schedule"/>
        <Filter label="EXPERIENCE" filterField="experience"/>
      </div>
    )
  }

  const Content = () => {
    const SortActions = () => {
      const nextSorterState = (current) => {
        const order = ['asc', 'desc', null]
        return order[order.indexOf(current) + 1]
      }

      const buildSorter = (label, sortField) => {
        return () => (
          <button
            onClick={() => {
              setCurrentSort({
                ...currentSort, 
                [sortField]: nextSorterState(currentSort[sortField])
              })
            }}
            class="my-1 text-gray-800 hover:text-blue-500 md:mx-2 md:my-0">
            {label}
          </button>
        )

      }

      const LocationSorter = buildSorter('Location', 'location')
      const RoleSorter = buildSorter('Role', 'role')
      const DepartmentSorter = buildSorter('Department', 'department')
      const EducationSorter = buildSorter('Education', 'education')
      const ExperienceSorter = buildSorter('Experience', 'experience')

      return (
        <div class="md:flex flex-col md:flex-row md:-mx-4 hidden">
          <div class="mx-1 text-gray-500">Sort by</div>
          <LocationSorter/>
          <RoleSorter/>
          <DepartmentSorter/>
          <EducationSorter/>
          <ExperienceSorter/>
        </div>
      )
    }

    const FacilityItem = ({facility}) => {
      const [selected, setSelected] = useState(false)

      const toggleSelected = () => {
        setSelected(!selected)
      }

      return (
        <div class="flex flex-col px-2 py-2">
          <div
            onClick={toggleSelected}
            class="p-2 flex hover:bg-gray-100 cursor-pointer">
            <div class="h-10 w-10 rounded-lg border bg-gray-400 text-lg text-center font-bold text-white" >
              {facility.name.substring(0, 2).toUpperCase()}
            </div>
            <p class="mx-4 flex text-gray-700">
              {facility.items.length + ' jobs for ' + facility.name}
            </p>
          </div>
          {selected &&
            <div class="flex flex-col">
              <ul class="divide-y divide-gray-300">
                {facility.items?.map((jobOffer) => {
                  return <JobOfferItem jobOffer={jobOffer}/>
                })}
              </ul>
            </div>
          }
        </div>
      )
    }

    const JobOfferItem = ({jobOffer}) => {
      const [selected, setSelected] = useState(false)

      const toggleSelected = () => {
        setSelected(!selected)
      }


      const usdFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      })

      const minPay = usdFormatter.format(jobOffer.salary_range[0])
      const maxPay = usdFormatter.format(jobOffer.salary_range[1])

      return (
        <li
          onClick={toggleSelected}
          class="flex flex-col p-2 hover:bg-gray-100 cursor-pointer">
          <div class="flex justify-between">
            <div class="font-bold">
              { jobOffer.job_title }
            </div>
            <div class="hidden lg:block">
              <ReactTimeAgo date={ jobOffer?.created } locale="en-US"/>
            </div>
          </div>
          <div>
            { jobOffer.job_type + ' | ' + minPay + ' - ' + maxPay + ' an hour | ' + jobOffer.city }
          </div>
          {selected &&
            <div class="flex p-2">
              <div class="flex flex-col m-1">
                <div class="flex justify-between">
                  <div class="p-2 mr-10 font-bold w-1/4"> Department: </div>
                  <div class="p-2 w-3/4">{ jobOffer.department.join(', ') }</div>
                </div>
                <div class="flex justify-between">
                  <div class="p-2 mr-10 font-bold w-1/4"> Hours / shifts: </div>
                  <div class="p-2 w-3/4">{ jobOffer.hours[0] + ' hours / ' + jobOffer.work_schedule }</div>
                </div>
                <div class="flex justify-between">
                  <div class="p-2 mr-10 font-bold w-1/4"> Summary: </div>
                  <div class="p-2 w-3/4">{ jobOffer.description }</div>
                </div>
              </div>
              <div class="flex flex-col m-1 flex-shrink-0">
                <button
                  class="px-5 py-2 my-1 border-2 border-blue-400 bg-blue-400 text-white rounded-lg hover:bg-blue-300">
                  Job details
                </button>
                <button
                  class="px-5 py-2 my-1 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-100">
                  Save Job
                </button>
              </div>
            </div>
          }
        </li>
      )
    }

    return (
      <div class="w-full lg:w-8/12">
        <div class="mt-2">
          <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
            <div class="flex items-center justify-between">
              <h1 class="text-xl font-bold text-gray-700 md:text-2xl">{ totalJobs + ' job postings' }</h1>
              <div>
                <SortActions/>
              </div>
            </div>
            <div class="py-5 px-3">
              {jobs?.map((facility) => {
                return <FacilityItem facility={facility}/>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div class="px-6 py-8">
      <div class="flex flex-col container mx-auto">
        <SearchBox currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}/>
        <div class="flex justify-between">
          <Sidebar/>
          <Content/>
        </div>
      </div>
    </div>
  )
}

export default AppMainBody
