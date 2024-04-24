const Swiper = require("swiper");
const { Navigation, Pagination } = require("swiper/modules");
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/pagination");

const swiper = new Swiper.default(".swiper", {
  spaceBetween: 5,
  navigation: {
    nextEl: ".arrow-button-next",
    prevEl: ".arrow-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  modules: [Navigation, Pagination],
  mousewheel: true,
  keyboard: true,
});
