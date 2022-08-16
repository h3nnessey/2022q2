function quotes(url) {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');

    const getQuotes = async () => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const currentQuote = Math.floor(Math.random() * 85) + 1;
                quote.textContent = data[currentQuote]['quote'];
                author.textContent = data[currentQuote]['author'];
            })
            .catch((err) => quote.textContent = 'Error was occurred while fetching quotes. Please, reload the page or click on btn again.');
    };
    setTimeout(getQuotes, 100);
}

export default quotes;
