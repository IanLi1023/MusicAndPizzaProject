const homeBtnEl = document.querySelector('#homebtn');

/*When the randomize button is clicked, the user is redirected to the results page*/
homeBtnEl.addEventListener('click', function() {
    window.location.assign('search.html')
});