function hoverImg() {
    let Browser = {
        IE: (/trident/gi).test(navigator.userAgent) || (/msie/gi).test(navigator.userAgent),
        Mobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
    };

    let sizesBlock = document.querySelectorAll('.sizes-block'),
        images = document.querySelectorAll('.sizes-block img'),
        imageSrc = [];
    images.forEach((item, i) => imageSrc[i] = item.src);

    String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };

    sizesBlock.forEach((item, i) => {
        if (Browser.Mobile) {
            window.addEventListener('click', (e) => {
                if (e.target.parentElement == item) {
                    images[i].src = imageSrc[i].splice(-4, 0, '-1');
                } else {
                    images[i].src = imageSrc[i];
                }
            });
        } else {
            item.addEventListener('mouseover', () => {
                images[i].src = imageSrc[i].splice(-4, 0, '-1');
            });
            item.addEventListener('mouseout', () => {
                images[i].src = imageSrc[i];
            });
        }
    });
}
module.exports = hoverImg;