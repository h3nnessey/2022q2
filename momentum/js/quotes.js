(function () {
    const quoteBtn = document.querySelector('.change-quote');
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');

    const getQuotes = async () => {
        const quotes = 'data/quotes.json';
        fetch(quotes)
            .then((response) => response.json())
            .then((data) => {
                currentQuote = Math.floor(Math.random() * 102) + 1;
                quote.textContent = data[currentQuote]['quote'];
                author.textContent = data[currentQuote]['author'];
            });
    };
    getQuotes()
    quoteBtn.addEventListener('click', () => setTimeout(getQuotes, 100));
})();
