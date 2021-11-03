let planet
let timeline = document.querySelector('.timeline')

const getPlanets = async () => {
  const query = 'https://swapi.dev/api/planets'

  const response = await fetch(query)

  const planets = await response.json()

  return planets
}

const printPlanets = (planets) => {
  //render planets on timeline
  let i = 1
  for (planet of planets) {
    let listItem = document.createElement('li')

    i % 2
      ? listItem.setAttribute('class', 'wrapper right')
      : listItem.setAttribute('class', 'wrapper left')

    //create the date of the planet
    let date = new Date(planet.created)

    listItem.innerHTML = `<article class="content">
      <h2>${planet.name}</h2>
      <time>
        ${date.toLocaleDateString('it-IT')} 
        ${date.toLocaleTimeString('it-IT')}
      </time>
    </article>`

    timeline.appendChild(listItem)

    //apply fadeIn class every 100ms
    const timer = setInterval(() => {
      listItem.classList.add('fadeIn')
      if (i === planets.length) {
        clearInterval(timer)
      }
    }, i * 100)
    i++
  }
}

const updateTimeline = (planets) => {
  //reverse planets object
  planets = planets.results.reverse()

  printPlanets(planets)
}

const orderPlanets = (planets) => {
  //reverse planets object
  planets = planets.results.reverse()

  //sort planets by created date
  planets.sort((a, b) => a.created > b.created)

  //clear timeline
  timeline.innerHTML = ''

  printPlanets(planets)
}

const filterPlanets = (planets, startDate, endDate) => {
  //reverse planets object
  planets = planets.results.reverse()

  //clear timeline
  timeline.innerHTML = ''

  //render planets on timeline
  let i = 1
  for (planet of planets) {
    let listItem = document.createElement('li')

    i % 2
      ? listItem.setAttribute('class', 'wrapper right')
      : listItem.setAttribute('class', 'wrapper left')

    //create the date of the planet
    let date = new Date(planet.created)

    if (
      date.toISOString().slice(0, 10) >= startDate &&
      date.toISOString().slice(0, 10) <= endDate
    ) {
      listItem.innerHTML = `<article class="content">
      <h2>${planet.name}</h2>
      <time>
        ${date.toLocaleDateString('it-IT')} 
        ${date.toLocaleTimeString('it-IT')}
      </time>
    </article>`

      timeline.appendChild(listItem)

      //apply fadeIn class every 100ms
      const timer = setInterval(() => {
        listItem.classList.add('fadeIn')
        if (i === planets.length) {
          clearInterval(timer)
        }
      }, i * 100)
    }

    i++
  }
}

export { updateTimeline, orderPlanets, filterPlanets, getPlanets as default }
