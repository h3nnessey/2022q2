function api() {
    function setBg() {
        const API_KEY = 'LREbfIzYLJSYzv7HZBStb1P9QdY-k8kLbFsAxMoB2aA';
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=cat&client_id=${API_KEY}`;
        // https://api.unsplash.com/photos?per_page=20&orientation=landscape&query=cat&client_id=LREbfIzYLJSYzv7HZBStb1P9QdY-k8kLbFsAxMoB2aA 20 photo
        const img = new Image();
        fetch(url)
            .then((response) => response.json())
            .then((data) => img.src = data.urls.regular.replace('1080', '1920'));
        img.addEventListener(
            'load',
            () => (document.body.style.backgroundImage = `url(${img.src})`)
        );
    }
    setBg();
}

export default api;

// glassmorphism generator