// grab a reference for necessary HTML elements
// .joke-text
const jokeText = document.querySelector(".joke-text");
// .new-joke-btn
const newJokeBtn = document.querySelector(".new-joke-btn");
// .tweet-btn (link)
const tweetBtn = document.querySelector(".tweet-btn");

// add 'click' eventListener to .new-joke-btn
newJokeBtn.addEventListener("click", getJoke);
