function calc() {
    let Browser = {
        IE: (/trident/gi).test(navigator.userAgent) || (/msie/gi).test(navigator.userAgent),
        Mobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
    };
    let size = document.getElementById('size'),
        material = document.getElementById('material'),
        option = document.getElementById('options'),
        promocode = document.querySelector('.promocode'),
        totalValue = document.querySelector('.calc-price'),
        total = 0;

    function animateTotalValue(value) {
        for (let i = 0; i <= value; i++) {
            let id = setTimeout(function () {
                if (i > 5000) {
                    i = value;
                    clearInterval(id);
                }
                totalValue.innerHTML = i;
            }, 10);
            if (i > 5000) {
                break;
            }
        }
    }

    promocode.addEventListener('input', function () {
        let sizeSelectedIndex = size.options.selectedIndex,
            materialSelectedIndex = material.options.selectedIndex,
            optionSelectedIndex = option.options.selectedIndex,
            promo = 1;
        if (this.value == "IWANTPOPART") {
            promo = 0.7;
        }
        console.log(sizeSelectedIndex);
        console.log(materialSelectedIndex);
        if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
            totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        } else if (Browser.IE) {
            // Do something related to Internet Explorer.
            totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
        } else {
            total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
            animateTotalValue(total);
        }
    });

    size.addEventListener('change', function () {
        let sizeSelectedIndex = this.options.selectedIndex,
            materialSelectedIndex = material.options.selectedIndex,
            optionSelectedIndex = option.options.selectedIndex,
            promo = 1;
        if (promocode.value == "IWANTPOPART") {
            promo = 0.7;
        }
        console.log(sizeSelectedIndex);
        console.log(materialSelectedIndex);
        if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
            totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        } else if (Browser.IE) {
            // Do something related to Internet Explorer.
            totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
        } else {
            total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
            animateTotalValue(total);
        }
    });

    material.addEventListener('change', function () {
        let materialSelectedIndex = this.options.selectedIndex,
            sizeSelectedIndex = size.options.selectedIndex,
            optionSelectedIndex = option.options.selectedIndex,
            promo = 1;
        if (promocode.value == "IWANTPOPART") {
            promo = 0.7;
        }
        console.log(sizeSelectedIndex);
        console.log(materialSelectedIndex);
        if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
            totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        } else if (Browser.IE) {
            // Do something related to Internet Explorer.
            totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
        } else {
            total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
            animateTotalValue(total);
        }
    });

    options.addEventListener('change', function () {
        let optionSelectedIndex = this.options.selectedIndex,
            sizeSelectedIndex = size.options.selectedIndex,
            materialSelectedIndex = material.options.selectedIndex,
            promo = 1;
        if (promocode.value == "IWANTPOPART") {
            promo = 0.7;
        }
        console.log(sizeSelectedIndex);
        console.log(materialSelectedIndex);
        if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
            totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        } else if (Browser.IE) {
            // Do something related to Internet Explorer.
            totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
        } else {
            total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
            animateTotalValue(total);
        }
    });
}
module.exports = calc;