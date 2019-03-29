function getmainSlider() {

    let slideIndex = 0,
        slides = document.querySelectorAll('.main-slider-item'),
        mainSlider = document.querySelector('.main-slider'),
        temp = 0;
    mainSlider.style.overflow = 'hidden';


    function animation() {
        slides[temp].style.display = 'block';
        let i = 2;
        setInterval(() => {

            slides.forEach((item) => item.style.display = 'none');
            slides[temp].style.display = 'block';
            mainSlider.style.height = slides[temp].offsetHeight + 'px';
            let slideoff = slides[temp];
            temp++;
            if (temp == slides.length) {
                temp = 0;
                i = 1;
            }
            slides[temp].style.display = 'block';
            let slideon = slides[temp];
            let top = -slideon.offsetHeight * i;
            let a = -slideon.offsetHeight;
            let down = 0;
            slideon.style.transform = `translateY(${-slideon.offsetHeight*i + 'px'})`;
            if (temp == 0) {
                a = 0;
                down = -slideon.offsetHeight;
            }
            let id = setInterval(start, 5);

            function start() {

                top += 5;
                down += 5;
                if (top < a) {
                    slideon.style.transform = `translateY(${top + 'px'})`;
                    slideoff.style.transform = `translateY(${down + 'px'})`;
                } else {
                    slideoff.style.transform = `translateY(0)`;
                    slideoff.style.display = 'none';

                    slideon.style.transform = `translateY(0)`;
                    i = 2;
                    clearInterval(id);
                }
            }
        }, 3000);
    }
    showSlides();

    function showSlides() {

        slides.forEach((item) => item.style.display = 'none');
        animation();
    }
}
module.exports = getmainSlider;