import $ from 'jquery'

$(document).ready(() => {
  // have fun!
  var topWord = fetchTopWord()
    .then(word => {
      $("#top-word").text(`Top word from Word Watch API: ${word}`);
    })
})

$(document).ready(() => {
  $("button").click(function(){
    // grab text from textbox
    var textInput = $('#input-text').val();
    // split text into array
    var textArray = textInput.split(/[ ,.]+/)
    // iterate over array to add words to the database
    postOneWord('help').then(result => {
      console.log(result)
      return result
    })
    // postWords(textArray).then(result =>{
    //   console.log(result)
    //   $("#top-word").text(`${result}`);
    // })
  });
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

async function postWords(wordArray) {
  const url = "https://wordwatch-api.herokuapp.com/api/v1/words"
  console.log(wordArray)
  Promise.all([
    wordArray.map(word => {
      fetch(url, {
          method: 'POST',
          body: {"word": {"value": `${word}`}}
        })
    })
  ])
  .then(responses => {
    console.log(responses)
    return responses
  })
  .then(data => data)
  console.log(data)
  return data
}

async function postOneWord(word) {
  const addWord = { "word": { "value": "help" } }
  const url = "https://wordwatch-api.herokuapp.com/api/v1/words"
  const response = await fetch(url,
    { method: "POST",
      body: addWord
    }
  })
  return await response.json();
}

// When the user types a piece of text in text field and clicks the break down button,
// that word should be added to the master list of words.
// The piece of text could be a single word, or an entire essay.
//  Make sure to read the API documentation carefully so you understand
//  what needs to happen on the front end.
