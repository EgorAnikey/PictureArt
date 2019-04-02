function getmainSlider() {
    let slides = document.querySelectorAll('.main-slider-item'),
        mainSlider = document.querySelector('.main-slider'),
        slideIndex = 0;
    mainSlider.style.overflow = 'hidden';
    mainSlider.style.height = slides[0].offsetHeight + 'px';
    slides.forEach((item, i) => {
        if (i != 0) {
            item.classList.remove('slideInDown', 'slideOutDown');
            item.style.visibility = 'hidden';
            item.style.marginTop = -item.offsetHeight + 'px';
        }
    });

    function animate(slide, j) {
        slide[j].style.visibility = 'visible';
        if (slide[j].classList.contains('slideInDown')) {
            slide[j].classList.remove('slideInDown');
        }
        slide[j].classList.add('slideOutDown');
        j--;
        if (j < 0) {
            j = slide.length - 1;
        }
        slide[j].style.visibility = 'visible';
        if (slide[j].classList.contains('slideOutDown')) {
            slide[j].classList.remove('slideOutDown');
        }
        slide[j].classList.add('slideInDown');
    }
    setTimeout(function start() {
        showAnimate();
        setTimeout(start, 2500);
    }, 2500);

    function showAnimate() {
        animate(slides, slideIndex);
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
    }
}
module.exports = getmainSlider;