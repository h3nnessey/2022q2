const articles = document.querySelectorAll(".article__text");
document.addEventListener("DOMContentLoaded", (e) => {
  if (window.innerWidth <= 390) {
    articles.forEach((article) => {
      article.textContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a... ";
    });
  }
});