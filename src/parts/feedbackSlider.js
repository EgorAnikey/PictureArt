function feedbackSlider(){
    // console.log(1);

        let slideIndex = 0,
            slides = document.querySelectorAll('.feedback-slider-item'),
            mainSlider = document.querySelector('.feedback-slider'),
            temp = 0;
        // mainSlider.style.overflow = 'hidden';
    
        function animation() {
            slides[temp].style.display = 'block';
            let i = 1;
            setInterval(() => {
    
                slides.forEach((item) => item.style.display = 'none');
                slides[temp].style.display = 'block';
                // mainSlider.style.height = slides[temp].offsetHeight + 'px';
                let slideoff = slides[temp];
                temp--;
                if (temp < 0) {
                    temp = slides.length - 1;
                    i = 1;
                }
                slides[temp].style.display = 'block';
                let slideon = slides[temp];
                let top = -slideon.offsetWidth * i;
                let a = -slideon.offsetWidth;
                let down = 0;
                slideon.style.transform = `translate(${-slideon.offsetWidth*i + 'px'}, ${-slideon.offsetHeight*i + 'px'})`;
                // console.log(slideon);
                // slideoff.style.transform = `translateX(${-slideoff.offsetWidth*i + 'px'})`;
                if (temp == 0) {
                    a = 0;
                    down = -slideon.offsetWidth;
                }
                let id = setInterval(start, 5);
    
                function start() {
    
                    top += 5;
                    down += 5;
                    if (top < a) {
                        slideon.style.transform = `translateX(${top + 'px'})`;
                        slideoff.style.transform = `translateX(${down + 'px'})`;
                    } else {
                        slideoff.style.transform = `translateX(0)`;
                        slideoff.style.display = 'none';
    
                        slideon.style.transform = `translateX(0)`;
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
module.exports = feedbackSlider;