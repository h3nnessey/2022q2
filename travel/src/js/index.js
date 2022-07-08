const burgerOpen = document.querySelector(".header__burger");
const burger = document.querySelector(".burger");
const burgerClose = document.querySelector(".burger__btn_icon");
const burgerWrap = document.querySelector(".burger__wrap");
const links = document.querySelectorAll(".burger__link");
const items = document.querySelectorAll(".photo__wrapper");
const slider = document.querySelector(".slider__inner");
const sliderBtns = document.querySelectorAll(".slider__button");
let arrLeft = document.querySelector(".slider__arrow-left");
let arrRight = document.querySelector(".slider__arrow-right");

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

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 390) {
    initDesktopSlider();
  }
  if (window.innerWidth <= 390) {
    initMobileSlider();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 390) {
    initDesktopSlider();
  }
  if (window.innerWidth <= 390) {
    initMobileSlider();
  }
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

function initDesktopSlider() {
  desk2();
  items[1].addEventListener("click", desk1);
  items[2].addEventListener("click", desk2);
  items[3].addEventListener("click", desk3);
  sliderBtns[0].addEventListener("click", desk1);
  sliderBtns[1].addEventListener("click", desk2);
  sliderBtns[2].addEventListener("click", desk3);
}

function initMobileSlider() {
  mob1();
  setOpacity(arrLeft, 0.5);
  setOpacity(arrRight, 1);
  let curr = 0;

  items[1].removeEventListener("click", desk1);
  items[2].removeEventListener("click", desk2);
  items[3].removeEventListener("click", desk3);

  sliderBtns[0].removeEventListener("click", desk1);
  sliderBtns[1].removeEventListener("click", desk2);
  sliderBtns[2].removeEventListener("click", desk3);

  arrRight.addEventListener("click", moveRight);
  arrLeft.addEventListener("click", moveLeft);

  function moveRight() {
    if (curr === 0) {
      mob2();
      setOpacity(arrLeft, 1);
      setTimeout(() => {
        curr++;
      }, 100);
    }
    if (curr === 1) {
      mob3();
      setOpacity(arrRight, 0.5);
      setTimeout(() => {
        curr++;
      }, 100);
    }
  }
  function moveLeft() {
    if (curr === 1) {
      mob1();
      setOpacity(arrLeft, 0.5);
      setTimeout(() => {
        curr--;
      }, 100);
    }
    if (curr === 2) {
      setOpacity(arrRight, 1);
      mob2();
      setTimeout(() => {
        curr--;
      }, 100);
    }
  }
}

function setActiveBtn(id) {
  sliderBtns.forEach((btn, idx) => {
    if (idx !== id) {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });
}

function desk1() {
  slider.style.transform = "translateX(860px)";
  setActiveBtn(0);
}
function desk2() {
  slider.style.transform = "translateX(0px)";
  setActiveBtn(1);
}
function desk3() {
  slider.style.transform = "translateX(-860px)";
  setActiveBtn(2);
}

function mob1() {
  slider.style.transform = "translateX(0px)";
  setActiveBtn(0);
}

function mob2() {
  slider.style.transform = "translateX(-420px)";
  setActiveBtn(1);
}

function mob3() {
  slider.style.transform = "translateX(-840px)";
  setActiveBtn(2);
}

function setOpacity(el, n) {
  el.style.opacity = `${n}`;
}

// rename variables - items и прочий кал + функции

// задать стили на футер из тревел2

// надо сильно увеличить область клика на стрелках - иначе баги

// повесить курсор поинтеры на десктопе