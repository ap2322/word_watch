import $ from 'jquery'

$(document).ready(() => {
  // have fun!
  var topWord = fetchTopWord()
    .then(word => {
      $("#top-word").text(`Top word from Word Watch API: ${word}`);
    })
})

async function fetchTopWord() {
  const url = "https://wordwatch-api.herokuapp.com/api/v1/top_word"
  const data = await fetch(url)
    .then(response => response.json())
    .then(result => {
      console.log(Object.keys(result.word)[0])
      return Object.keys(result.word)[0]
    })
  return data
}
