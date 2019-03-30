function accordion() {
    let accordionHead = document.querySelectorAll('#accordion .accordion-heading'),
        accordDescription = document.querySelectorAll('#accordion div'),
        temp = [];

    accordDescription.forEach((item, i) => {
        temp[i] = item.offsetHeight;
        item.style.display = 'none';
        item.style.padding = '0 4rem';
        item.style.overflow = 'hidden';
    });

    function showDescription(i) {
        accordionHead[i].firstElementChild.classList.add('active');
        let j = 0,
            heightItem = 0,
            id = setInterval(show, 15);

        function show() {
            heightItem += 10;
            j += 0.16;
            if (heightItem <= temp[i]) {
                accordDescription[i].style.height = heightItem + 'px';
                accordDescription[i].style.paddingTop = `${j}rem`;
                accordDescription[i].style.display = 'block';
            } else {
                accordDescription[i].style.height = temp[i] + 'px';
                accordDescription[i].style.paddingTop = '3rem';
                accordDescription[i].style.overflow = '';
                clearInterval(id);
            }
        }
    }

    function hideDescription() {
        accordDescription.forEach((item, i) => {
            if (item.style.display != 'none') {
                accordionHead[i].firstElementChild.classList.remove('active');
                let heightItem = item.offsetHeight,
                    j = 3,
                    id = setInterval(hide, 15);

                function hide() {
                    heightItem -= 10;
                    j -= 0.16;
                    if (heightItem >= 0) {
                        item.style.height = heightItem + 'px';
                        item.style.paddingTop = `${j}rem`;
                        item.style.overflow = 'hidden';
                    } else {
                        item.style.height = 0;
                        item.style.paddingTop = 0;
                        item.style.display = 'none';
                        clearInterval(id);
                    }
                }
            }
        });
    }

    accordionHead.forEach((item, i) => {
        item.addEventListener('click', () => {
            if (accordDescription[i].style.display != 'block') {
                hideDescription();
                showDescription(i);
            }
        });
    });

}
module.exports = accordion;