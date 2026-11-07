'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// theme toggle (light/dark)
// the initial data-theme attribute is already set by an inline script in
// <head> (before first paint, to avoid a flash of the wrong theme) - this
// just handles flipping it and remembering the choice.
const themeToggleBtns = document.querySelectorAll("[data-theme-toggle]");

const setTheme = function (theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) { /* private mode, etc. */ }
};

for (let i = 0; i < themeToggleBtns.length; i++) {
  themeToggleBtns[i].addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(current === "light" ? "dark" : "light");
  });
}



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
// (guarded: standalone pages like project detail pages reuse this file but
// don't necessarily have every element the homepage does)
if (sidebarBtn) sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// copy-to-clipboard for contact info
const copyButtons = document.querySelectorAll("[data-copy-value]");

for (let i = 0; i < copyButtons.length; i++) {
  copyButtons[i].addEventListener("click", function () {

    const value = this.dataset.copyValue;
    if (!value || !navigator.clipboard) return;

    const btn = this;
    const icon = btn.querySelector("ion-icon");
    const originalIcon = icon.getAttribute("name");

    navigator.clipboard.writeText(value).then(function () {
      btn.classList.add("copied");
      icon.setAttribute("name", "checkmark-outline");

      setTimeout(function () {
        icon.setAttribute("name", originalIcon);
        btn.classList.remove("copied");
      }, 1500);
    });

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// deep-link support: a link like "index.html#portfolio" (used by standalone
// pages, e.g. a project detail page's "Back to Portfolio" link) opens
// straight to that section instead of always landing on "About"
const initialHash = window.location.hash.replace("#", "").toLowerCase();

if (initialHash) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === initialHash) {
      for (let j = 0; j < pages.length; j++) {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
    }
  }
}