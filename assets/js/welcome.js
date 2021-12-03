/*Set Variables for the html page*/
const randomizeBtn = document.querySelector('#randomizebtn');
const favoritesBtn = document.querySelector('#favoritesbtn');

/*When the randomize button is clicked, the user is redirected to the results page*/
randomizeBtn.addEventListener('click', function() {
    window.location.assign('search.html')
});

/*When the favorites button is clicked, the user is redirected to the favorites page*/
favoritesBtn.addEventListener('click', function() {
    window.location.assign('favorites.html')
});