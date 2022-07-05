const burgerOpen = document.querySelector(".header__burger");
const burger = document.querySelector(".burger");
const burgerClose = document.querySelector(".burger__btn_icon");
const burgerWrap = document.querySelector(".burger__wrap");
const links = document.querySelectorAll(".burger__link");

function show() {
  burgerWrap.style.display = "block";
  burgerWrap.style.animation = "bgc-black 0.3s linear 1 forwards";
  burger.style.animation = "move-left 0.3s linear 1 forwards";
}

function hide() {
  burger.style.animation = "move-right 0.3s linear 1 forwards";
  burgerWrap.style.animation = "bgc-none 0.3s linear 1 forwards";
  const hideBurgerWrap = () => (burgerWrap.style.display = "none");
  setTimeout(hideBurgerWrap, 300);
}

burgerOpen.addEventListener("click", (e) => {
  show();
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      hide();
    });
  });

  burgerWrap.addEventListener("click", (e) => {
    if (e.target.className === "burger__wrap") {
      hide();
    }
  });
});

burgerClose.addEventListener("click", (e) => {
  hide();
});
