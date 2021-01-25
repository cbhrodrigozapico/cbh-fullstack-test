import jobs from '../../data/jobs'

export default async (req, res) => {
  res.statusCode = 200
  // @todo: implement filters and search
  // @todo: implement automated tests

  const filteredJobs = jobs.map((facility) => {
    const filteredFacility = {...facility}
    filteredFacility.items = facility.items.filter((job) => {
      const possibleFilters = [
        { field: 'job_type'}, 
        { field: 'department', isArray: true }, 
        { field: 'work_schedule' },
        { field: 'experience' },
        { field: 'experience' },
        { 
          field: 'query',
          searchFields: ['name', 'job_title', 'description'],
          isQuery: true,
        },
      ]

      let keep = true
      possibleFilters.forEach((filter) => {
        const filterValue = req.query[filter.field]
        if (!filterValue) return

        if (filter.isQuery) {
          // Here we assume we're not keeping it, and change if it matches
          // in any of the search fields.
          let queryKeep = false
          const regex = new RegExp(filterValue, 'gmi')
          filter.searchFields.forEach((searchField) => {
            if (job[searchField].match(regex)) {
              queryKeep = true
            }
          })

          if (!queryKeep) {
            keep = false
          }

          return
        }

        if (filter.isArray) {
          if(!job[filter.field].includes(filterValue)) {
            keep = false
          }
          return
        }

        if (job[filter.field] !== filterValue) {
          keep = false
        }
      })

      return keep
    })

    return filteredFacility
  }).filter((facility) => {
    return facility.items.length !== 0
  })

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

  res.json({jobs: filteredJobs})
}
