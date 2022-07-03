const burgerOpen = document.querySelector(".header__burger");
const burger = document.querySelector(".burger");
const burgerClose = document.querySelector(".burger__btn_icon");
const burgerWrap = document.querySelector(".burger__wrap");

burgerOpen.addEventListener("click", (e) => {
  burgerWrap.style.display = "block";
  burgerWrap.style.animation = "bgc-black 0.5s linear 1 forwards";
  burger.style.animation = "move-left 0.5s linear 1 forwards";

  // добавить листенер на ссылки и тело враппера
});

burgerClose.addEventListener("click", (e) => {
  burger.style.animation = "move-right 0.5s linear 1 forwards";
  burgerWrap.style.animation = "bgc-none 0.5s linear 1 forwards";
  setTimeout(() => {
    burgerWrap.style.display = "none";
  }, 500);
});
