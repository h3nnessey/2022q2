const form = document.querySelector(".popup__form");
const emailInput = document.querySelector(".email-input");
const pswrdInput = document.querySelector(".pswrd-input");
const regBtn = document.querySelector(".register__link");
const toHide = document.querySelectorAll(".to-hide");
const toChange = document.querySelectorAll(".to-change");
const logBtn = document.querySelector(".header__button");
const popupWrap = document.querySelector(".popup__wrapper");
const popup = document.querySelector(".popup");
const accBtn = document.querySelector(".burger__login");
const [title, submit, regText, regLink] = toChange;
const ifReg = {
  title: "Log in to your account",
  submit: "Sign In",
  regText: "Don't have an account? ",
  regLink: "Register",
};
const noReg = {
  title: "Create account",
  submit: "Sign Up",
  regText: "Already have an account? ",
  regLink: "Log in",
};

[logBtn, accBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    showPopup();
    popup.classList.contains("active")
      ? initSignUpPopup(toChange)
      : initLoginPopup(toChange);
  });
});

form.addEventListener("submit", (e) => {
  // if (!popup.classList.contains("active")) {
  //   alert(`E-mail: ${emailInput.value}\nPassword: ${pswrdInput.value}`);
  //   e.preventDefault();
  //   form.reset();
  // }
  // e.preventDefault();
  alert(`E-mail: ${emailInput.value}\nPassword: ${pswrdInput.value}`);
  e.preventDefault();
  form.reset();
});

regBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleClasses();
  popup.classList.contains("active")
    ? initSignUpPopup(toChange)
    : initLoginPopup(toChange);
});

popupWrap.addEventListener("click", (e) => {
  if (e.target.className === "popup__wrapper") {
    hidePopup();
    if (popup.classList.contains("active")) {
      initSignUpPopup(toChange);
      toggleClasses();
    } else {
      initLoginPopup(toChange);
    }
  }
});

function initLoginPopup([title, submit, regText, regLink]) {
  title.textContent = ifReg.title;
  submit.textContent = ifReg.submit;
  regText.textContent = ifReg.regText;
  regLink.textContent = ifReg.regLink;
}

function initSignUpPopup([title, submit, regText, regLink]) {
  title.textContent = noReg.title;
  submit.textContent = noReg.submit;
  regText.textContent = noReg.regText;
  regLink.textContent = noReg.regLink;
}

function showPopup() {
  popupWrap.style.visibility = "visible";
  popupWrap.style.opacity = "1";
  popup.style.animation = "popup-move-bottom 0.3s linear 1 forwards";
}

function hidePopup() {
  popupWrap.style.opacity = "0";
  popupWrap.style.visibility = "hidden";
  popup.style.animation = "popup-move-top 0.3s linear 1 forwards";
}

function toggleClasses() {
  popup.classList.toggle("active");
  toHide.forEach((el) => el.classList.toggle("active"));
  submit.classList.toggle("active");
}
