function loaded() {
    document.querySelector(".header-hamburger").addEventListener("click", () => {
        document.querySelector(".header__nav").classList.toggle("header__nav--closed");
        document.querySelector(".header-hamburger").classList.toggle("header-hamburger--open");
    });
};