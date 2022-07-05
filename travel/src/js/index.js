const burgerOpen = document.querySelector(".header__burger");
const burger = document.querySelector(".burger");
const burgerClose = document.querySelector(".burger__btn_icon");
const burgerWrap = document.querySelector(".burger__wrap");
const links = document.querySelectorAll(".burger__link");

function show() {
  document.body.style.overflow = 'hidden';
  burgerWrap.style.display = "block";
  burgerWrap.style.animation = "bgc-black 0.3s linear 1 forwards";
  burger.style.animation = "move-left 0.3s linear 1 forwards";
}

function hide() {
  document.body.style.overflow = 'initial';
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



console.log(`Вёрстка соответствует макету. Ширина экрана 390px +48
    - блок <header> +6
    - секция preview +9
    - секция steps +9
    - секция destinations +9
    - секция stories +9
    - блок <footer> +6
    
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
    - нет полосы прокрутки при ширине страницы от 1440рх до 390px +7
    - нет полосы прокрутки при ширине страницы от 390px до 320рх +8

На ширине экрана 390рх и меньше реализовано адаптивное меню +22
    - при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2
    - при нажатии на бургер-иконку плавно появляется адаптивное меню +4
    - адаптивное меню соответствует макету +4
    - при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
    - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)
    - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4
    
Допускается несовпдаения текстовых темплейтов (большие куски текста с Lorem Ipsum)
    - такие как в stories!

P.S. Напоминаю, что девтулзы могут лагать и надо выставлять нужное разрешение несколько раз для честной проверки!

Score: 85/75`)