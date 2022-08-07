function quotes() {
    const quoteBtn = document.querySelector('.change-quote');
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');

    const getQuotes = async (url) => {
        const quotes = 'js/quotes.json';
        fetch(quotes)
            .then((response) => response.json())
            .then((data) => {
                const currentQuote = Math.floor(Math.random() * 102) + 1;
                quote.textContent = data[currentQuote]['quote'];
                author.textContent = data[currentQuote]['author'];
            })
            .catch((err) => quote.textContent = 'Error was occurred while fetching quotes. Please, reload the page.');
    };
    getQuotes();
    quoteBtn.addEventListener('click', () => setTimeout(getQuotes, 100));
}

export default quotes;
