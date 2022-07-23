const burgerOpen = document.querySelector(".header__burger");
const burger = document.querySelector(".burger");
const burgerClose = document.querySelector(".burger__btn_icon");
const burgerWrap = document.querySelector(".burger__wrap");
const links = document.querySelectorAll(".burger__link");

burgerOpen.addEventListener("click", () => {
  show();
  links.forEach((link) => {
    link.addEventListener("click", () => {
      hide();
    });
  });

  burgerWrap.addEventListener("click", (e) => {
    if (e.target.className === "burger__wrap") {
      hide();
    }
  });
});

burgerClose.addEventListener("click", () => {
  hide();
});

function show() {
  document.body.style.overflow = "hidden";
  burgerWrap.style.display = "block";
  burgerWrap.style.animation = "bgc-black 0.3s linear 1 forwards";
  burger.style.animation = "move-left 0.3s linear 1 forwards";
}

function hide() {
  document.body.style.overflow = "initial";
  burger.style.animation = "move-right 0.3s linear 1 forwards";
  burgerWrap.style.animation = "bgc-none 0.3s linear 1 forwards";
  const hideBurgerWrap = () => (burgerWrap.style.display = "none");
  setTimeout(hideBurgerWrap, 300);
}