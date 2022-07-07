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
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 390) {
    slider.style.transform = 'translateX(0px)';
    setActiveBtn(1);

    items[1].addEventListener("click", desk1);
    items[2].addEventListener("click", desk2);
    items[3].addEventListener("click", desk3);

    sliderBtns[0].addEventListener("click", desk1);
    sliderBtns[1].addEventListener("click", desk2);
    sliderBtns[2].addEventListener("click", desk3);
  }

  if (window.innerWidth <= 390) {
    slider.style.transform = "translateX(0px)";
    setActiveBtn(0);
    arrLeft.style.opacity = '0.5';
    arrRight.style.opacity = '1';

    items[1].removeEventListener("click", desk1);
    items[2].removeEventListener("click", desk2);
    items[3].removeEventListener("click", desk3);
    // кнопки можно сделать неактив
    sliderBtns[0].removeEventListener("click", desk1);
    sliderBtns[1].removeEventListener("click", desk2);
    sliderBtns[2].removeEventListener("click", desk3);

    let curr = 0;

    sliderBtns[0].addEventListener("click", () => {
      slider.style.transform = "translateX(0px)";
    });

    sliderBtns[1].addEventListener("click", () => {
      slider.style.transform = "translateX(-420px)";
    });

    sliderBtns[2].addEventListener("click", () => {
      slider.style.transform = "translateX(-840px)";
    });

    arrRight.addEventListener("click", (e) => {
      if (curr === 0) {
        slider.style.transform = "translateX(-420px)";
        arrLeft.style.opacity = "1";
        setTimeout(() => {
          curr++;
        }, 100);
      }
      if (curr === 1) {
        slider.style.transform = "translateX(-840px)";
        setTimeout(() => {
          curr++;
        }, 100);
        arrRight.style.opacity = "0.5";
      }
    });

    arrLeft.addEventListener("click", (e) => {
      if (curr === 1) {
        slider.style.transform = "translateX(0px)";
        arrLeft.style.opacity = "0.5";
        setTimeout(() => {
          curr--;
        }, 100);
      }
      if (curr === 2) {
        arrRight.style.opacity = "1";
        slider.style.transform = "translateX(-420px)";
        setTimeout(() => {
          curr--;
        }, 100);
      }
    });
  }
});


window.addEventListener("resize", () => {
  if (window.innerWidth > 390) {
    slider.style.transform = 'translateX(0px)';
    setActiveBtn(1);

    items[1].addEventListener("click", desk1);
    items[2].addEventListener("click", desk2);
    items[3].addEventListener("click", desk3);

    sliderBtns[0].addEventListener("click", desk1);
    sliderBtns[1].addEventListener("click", desk2);
    sliderBtns[2].addEventListener("click", desk3);
  }

  if (window.innerWidth <= 390) {
    slider.style.transform = "translateX(0px)";
    setActiveBtn(0);

    items[1].removeEventListener("click", desk1);
    items[2].removeEventListener("click", desk2);
    items[3].removeEventListener("click", desk3);
    // кнопки можно сделать неактив
    sliderBtns[0].removeEventListener("click", desk1);
    sliderBtns[1].removeEventListener("click", desk2);
    sliderBtns[2].removeEventListener("click", desk3);

    let curr = 0;

    sliderBtns[0].addEventListener("click", () => {
      slider.style.transform = "translateX(0px)";
    });

    sliderBtns[1].addEventListener("click", () => {
      slider.style.transform = "translateX(-420px)";
    });

    sliderBtns[2].addEventListener("click", () => {
      slider.style.transform = "translateX(-840px)";
    });

    arrRight.addEventListener("click", (e) => {
      if (curr === 0) {
        slider.style.transform = "translateX(-420px)";
        arrLeft.style.opacity = "1";
        setTimeout(() => {
          curr++;
        }, 100);
      }
      if (curr === 1) {
        slider.style.transform = "translateX(-840px)";
        setTimeout(() => {
          curr++;
        }, 100);
        arrRight.style.opacity = "0.5";
      }
    });

    arrLeft.addEventListener("click", (e) => {
      if (curr === 1) {
        slider.style.transform = "translateX(0px)";
        arrLeft.style.opacity = "0.5";
        setTimeout(() => {
          curr--;
        }, 100);
      }
      if (curr === 2) {
        arrRight.style.opacity = "1";
        slider.style.transform = "translateX(-420px)";
        setTimeout(() => {
          curr--;
        }, 100);
      }
    });
  }
});

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

// rename variables

// задать стили на футер из тревел2

// надо сильно увеличить область клика на стрелках - иначе баги


// закончить логику со слайдер кнопками