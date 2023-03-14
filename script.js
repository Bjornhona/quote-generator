const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

let quotes = [];

// Show new Quote
const newQuote = () => {
  loading();
  // Pick a random quote from currentQuotes
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
}

const getQuotes = async () => {
  // A proxy that has been set for anyone to use at Heroku
  // It often results in http status code 429, because there is too much traffic
  // const proxy = 'https://cors-anywhere.herokuapp.com/';

  loading();
  try {
    // Get quotes from API
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    const response = await fetch(apiUrl);
    // Use also the proxy if any CORS problems
    // const response = await fetch(apiUrl + proxy);
    const apiQuotes = await response.json();
    quotes = apiQuotes;
  } catch (error) {
    // else get quotes locally
    quotes = localQuotes;
  }
  await newQuote();
}

getQuotes();

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);