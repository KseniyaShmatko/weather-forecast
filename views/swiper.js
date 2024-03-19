export var swiperHour = new Swiper(".hourSwiper", {
  spaceBetween: 0,
  loop: false,
  navigation: {
    nextEl: ".swiper-button-nextHour",
    prevEl: ".swiper-button-prevHour"
  },
  breakpoints: {
    200: {
      slidesPerView: 2,
    },
    260: {
      slidesPerView: 3,
    },
    360: {
      slidesPerView: 4,
    },
    460: {
      slidesPerView: 5,
    },
    520: {
      slidesPerView: 6,
    },
    620: {
      slidesPerView: 7,
    },
    720: {
      slidesPerView: 8,
    },
    860: {
      slidesPerView: 9,
    },
    1000: {
      slidesPerView: 10,
    },
    1200: {
      slidesPerView: 14,
    },
  }
});

export var swiperDay = new Swiper(".daySwiper", {
  spaceBetween: 0,
  loop: false,
  navigation: {
    nextEl: ".swiper-button-nextDay",
    prevEl: ".swiper-button-prevDay"
  },
  breakpoints: {  
    200: {
      slidesPerView: 2,
    },
    280: {
      slidesPerView: 3,
    },
    430: {
      slidesPerView: 4,
    },
    530: {
      slidesPerView: 4,
    },
    630: {
      slidesPerView: 5,
    },
    750: {
      slidesPerView: 6,
    },
    900: {
      slidesPerView: 7,
    },
    1050: {
      slidesPerView: 8,
    },
    1200: {
      slidesPerView: 9,
    },
  }
});