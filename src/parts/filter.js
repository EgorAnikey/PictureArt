function filter(headerClassName, tabClassName, infoContentClassName) {
    let info = document.querySelector(headerClassName),
        tab = document.querySelectorAll(tabClassName),
        tabContent = document.querySelectorAll(infoContentClassName);

    function hideTabContent() {
        tabContent.forEach((item) => item.classList.add('hide'));
        tab.forEach((item) => item.classList.remove('active'));
    }

    function showTabContent(b) {
        let temp = 0;
        tabContent.forEach((item) => {
            if (item.classList.contains(b)) {
                item.classList.remove('hide');
                temp++;
            }
        });
        if (temp == 0) {
            document.querySelector('.portfolio-no').style.display = 'block';
        } else {
            document.querySelector('.portfolio-no').style.display = 'none';
        }
    }

    info.addEventListener('click', function (event) {
        hideTabContent();
        let target = event.target,
            classTarget = target.className;
        if (target && !target.classList.contains('portfolio-menu')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    showTabContent(classTarget);
                    target.classList.add('active');
                    break;
                }
            }
        }
    });
}
module.exports = filter;