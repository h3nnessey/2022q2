const burgerOpen = document.querySelector(".header__burger");
const burger = document.querySelector(".burger");
const burgerClose = document.querySelector(".burger__btn_icon");
const burgerWrap = document.querySelector(".burger__wrap");

burgerOpen.addEventListener("click", (e) => {
  burgerWrap.style.display = "block";
  burgerWrap.style.animation = "bgc-black 0.3s linear 1 forwards";
  burger.style.animation = "move-left 0.3s linear 1 forwards";

  const links = document.querySelectorAll(".burger__link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {

      burger.style.animation = "move-right 0.3s linear 1 forwards";
      burgerWrap.style.animation = "bgc-none 0.3s linear 1 forwards";
      
      setTimeout(() => {
        burgerWrap.style.display = "none";
      }, 300);
      
    });
  });

  burgerWrap.addEventListener("click", (e) => {

    if (e.target.className === "burger__wrap") {

      burger.style.animation = "move-right 0.3s linear 1 forwards";
      burgerWrap.style.animation = "bgc-none 0.3s linear 1 forwards";

      setTimeout(() => {
        burgerWrap.style.display = "none";
      }, 300);
    }
  });

});

burgerClose.addEventListener("click", (e) => {

  burger.style.animation = "move-right 0.3s linear 1 forwards";
  burgerWrap.style.animation = "bgc-none 0.3s linear 1 forwards";

  setTimeout(() => {
    burgerWrap.style.display = "none";
  }, 300);

});

// вынести в отдельные функции DRY
