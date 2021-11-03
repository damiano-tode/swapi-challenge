import '../sass/app.scss'
import getPlanets, {
  updateTimeline,
  orderPlanets,
  filterPlanets,
} from './planets'

const btnChange = document.querySelector('#changeOrder')

getPlanets()
  .then((planets) => updateTimeline(planets))
  .catch((err) => console.log(err))

btnChange.addEventListener('click', (e) => {
  e.preventDefault()
  getPlanets().then((planets) => orderPlanets(planets))
})

//Filter planets by date range
const dates = document.querySelector('#formDates')

dates.addEventListener('submit', (e) => {
  e.preventDefault()

  const startDate = dates.startDate.value.trim()
  const endDate = dates.endDate.value.trim()

  getPlanets().then((planets) => filterPlanets(planets, startDate, endDate))
})
