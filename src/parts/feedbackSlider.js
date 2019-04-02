function feedbackSlider() {
    let slideIndex = 0,
        slides = document.querySelectorAll('.feedback-slider-item'),
        mainSlider = document.querySelector('.feedback-slider'),
        btnNext = document.querySelector('.main-next-btn'),
        btnPrev = document.querySelector('.main-prev-btn');
    mainSlider.style.overflow = 'hidden';
    slides.forEach((item, i) => {
        if (i != 0) {
            item.classList.remove('slideInDown', 'slideOutDown');
            item.style.visibility = 'hidden';
            item.style.marginTop = -item.offsetHeight + 'px';
        }
    });

    function animate(slide, j, prev) {
        if (prev == undefined) {
            slide[j].style.visibility = 'visible';
            slide[j].classList.remove('slideInRight');
            slide[j].classList.remove('slideInLeft');
            slide[j].classList.add('slideOutLeft');
            j++;
            if (j == slide.length) {
                j = 0;
            }
            slide[j].style.visibility = 'visible';
            slide[j].classList.remove('slideOutRight');
            slide[j].classList.remove('slideOutLeft');
            slide[j].classList.add('slideInRight');
        } else {
            slide[j].style.visibility = 'visible';
            slide[j].classList.remove('slideInRight');
            slide[j].classList.remove('slideInLeft');
            slide[j].classList.add('slideOutRight');
            j--;
            if (j < 0) {
                j = slide.length - 1;
            }
            slide[j].style.visibility = 'visible';
            slide[j].classList.remove('slideOutRight');
            slide[j].classList.remove('slideOutLeft');
            slide[j].classList.add('slideInLeft');
        }
    }

    function showAnimate() {
        animate(slides, slideIndex);
        slideIndex++;
        if (slideIndex == slides.length) {
            slideIndex = 0;
        }
    }

    function nextSlide() {
        animate(slides, slideIndex);
        slideIndex++;
        if (slideIndex == slides.length) {
            slideIndex = 0;
        }
    }

    function prevSlide() {
        animate(slides, slideIndex, 1);
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
    }

    btnNext.addEventListener('click', () => {
        nextSlide();
    });
    btnPrev.addEventListener('click', () => {
        prevSlide();
    });

    setTimeout(function start() {
        showAnimate();
        setTimeout(start, 5000);
    }, 5000);
}
module.exports = feedbackSlider;