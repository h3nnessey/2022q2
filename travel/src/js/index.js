const burgerOpen = document.querySelector(".header__burger");
const burger = document.querySelector(".burger");
const burgerClose = document.querySelector(".burger__btn_icon");
const burgerWrap = document.querySelector(".burger__wrap");
const links = document.querySelectorAll(".burger__link");
const items = document.querySelectorAll(".photo__wrapper");
const slider = document.querySelector(".slider__inner");
const sliderBtns = document.querySelectorAll(".slider__button");

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

function setActiveBtn(id) {
  sliderBtns.forEach((btn, idx) => {
    if (idx !== id) {
      btn.classList.remove('active');
    } else {
      btn.classList.add('active')
    }
  });
}



items[1].addEventListener("click", () => {
  slider.style.transform = "translateX(860px)";
  setActiveBtn(0);
});

items[2].addEventListener("click", () => {
  slider.style.transform = "translateX(0px)";
  setActiveBtn(1);
});

items[3].addEventListener("click", () => {
  slider.style.transform = "translateX(-860px)";
  setActiveBtn(2);
});

// на мобиле хз надо ли
sliderBtns[0].addEventListener("click", () => {
  slider.style.transform = "translateX(860px)";
  setActiveBtn(0);
});

sliderBtns[1].addEventListener("click", () => {
  slider.style.transform = "translateX(0px)";
  setActiveBtn(1);
});

sliderBtns[2].addEventListener("click", () => {
  slider.style.transform = "translateX(-860px)";
  setActiveBtn(2);
});

// rename variables
// max-width 390
// в тревел 2 просто ебануть через css актив кнопки на слайдере (через медиа)
// убрать к хуям гх и рс скул

// вынести десктоп в отдельную функцию и закинуть ее в ресайз и домконтентлоудед
// потом делать под мобилу
