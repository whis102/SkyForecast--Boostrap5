const app = document.querySelector( '.weather-app' )
const temp = document.querySelector( '.temp' )
const dateOuput = document.querySelector( '.date' )
const timeOutput = document.querySelector( '.time' )
const conditionOutput = document.querySelector( '.condition' )
const nameOutput = document.querySelector( '.name' )
const icon = document.querySelector( '.icon' )
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector( '.humidity' )
const windOutput = document.querySelector( '.wind' )
const search = document.querySelector( '.search' )
const form = document.getElementById( 'locationInput' )
const btn = document.querySelector( '.submit' )
const cities = document.querySelector( '.city' )

// Default city when the page loads
let cityInput = 'London'

cities.forEach( ( city ) =>
{
    city.addEventListener( 'click',(e) =>
    {
        cityInput = e.target.innerHTML
        fetchWeatherData()
        app.style.opacity = '0'
    })
} )

form.addEventListener( 'submit',( e ) =>
{
    if ( search.value.length == 0 )
    {
        alert("Please type in the city name")
    } else
    {
        cityInput = search.value
        fetchWeatherData()
        search.value = ''
        app.style.opacity = '0'
    }

    // Prevent the default behaviour of the form
    e.preventDefault()
} )

function dayOfTheWeek ( day,month,year )
{
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    return weekday[new Date(`${day}/${month}/${year}`).getDay()]
}

function fetchWeatherData ()
{
    fetch()
}