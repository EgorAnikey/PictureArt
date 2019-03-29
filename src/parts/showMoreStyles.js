function showMoreStyles(){

let showMoreStyles = document.querySelector('#styles button'),
carts = document.querySelectorAll('#styles .row > div');

showMoreStyles.addEventListener('click', function(){
carts.forEach((item)=>{item.removeAttribute('class');
item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
showMoreStyles.style.display = 'none';
});

});



}
module.exports = showMoreStyles;