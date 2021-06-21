const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitterbutton');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

/* Loading */
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

/* Hide Loading */
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Acquires code from API 
async function getQuote() {
    loading();
    const proxyUrl = 'https://stark-everglades-46036.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl); //response only sets until its fetched from apiUrl
        const data = await response.json(); // data is only set until response is set and returned
     /*    if author is blank it returns "Unknown" */
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
       /*  Reduces font size of long quotes */
       if (data.quoteText.length > 120) {
           quoteText.classList.add('long-quote');
       } else {
           quoteText.innerText.remove('long-quote');
       }
        quoteText.innerText = data.quoteText;
        /* Stop loading show quote */
        complete();
    } catch (err) {
        getQuote();
    }
}

/* Tweet out the quote */
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

/* Event listeners */
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// On loading
getQuote();