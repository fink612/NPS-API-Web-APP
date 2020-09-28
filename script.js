'use strict';

const baseURL = 'https://developer.nps.gov/api/v1/parks'
const key = '7Xe68z83KFWNqeuWeOk0QmDibeS8ucC8eSUU3huS'

function findParks(state, number) {
  const param = {
    q: state,
    limit: number
  }
  const searchString = buildString(param)
  const url = baseURL + '?' + searchString + '&api_key=' + key
  console.log(url)

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => listParks(responseJson))
    .catch(err => {
      $('.results').text(`Something went wrong: ${err.message}`);
    });
}

function listParks(responseJson) {
  $('.results').empty()
  for (let i=0; i < responseJson.data.length; i++) {
    $('.results').append(`<h2>${responseJson.data[i].fullName}</h2><p>${responseJson.data[i].description}</p><br><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a><br><p>Address:<br>${responseJson.data[i].addresses[0].line1}<br>${responseJson.data[i].addresses[0].line2}<br>${responseJson.data[i].addresses[0].city},  ${responseJson.data[i].addresses[0].stateCode}  ${responseJson.data[i].addresses[0].postalCode}</p><hr>`)
  }
}


function buildString(param) {
  const queryItems = Object.keys(param)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`)
  return queryItems.join('&');
}



function readForm() {
  $('form').submit(event => {
    event.preventDefault()
    const state = $('#searchBar').val()
    const number = $('#hitsNum').val()
    console.log(number)
    console.log(state)
    findParks(state, number)
  })
}

$(readForm)
