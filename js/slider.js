// funcion de carrusel jqery


$(".slider-for").slick({
    slidesToShow: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  });
  $(".slider-nav").slick({
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    asNavFor: ".slider-for",
    dots: true,
    centerPadding: '40px',
    focusOnSelect: true,
  });
  