import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  spaceBetween: 5,
  navigation: {
    nextEl: ".arrow-button-next",
    prevEl: ".arrow-button-prev"
  },
  pagination: {
    el: '.swiper-pagination'
  },
  modules: [Navigation, Pagination],
  mousewheel: true,
  keyboard: true,
})

