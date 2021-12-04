const favoritesBtn = document.querySelector('.view-favoritesBtn');
const foodImgEl = document.querySelector('#food-image');
const drinkImgEl = document.querySelector('#drink-image');
const foodNameEl = document.querySelector('#food-name');
const drinkNameEl = document.querySelector('#drink-name');
const drinkLinkEl = document.querySelector('#drink-link');
const foodLinkEl = document.querySelector('#food-link');
const drinkModalEl = document.querySelector('#drink-modal');
const drinkSpan = document.querySelector("#close-drink");
const DMHeader = document.querySelector("#drink-modal-title");
const DMInstructions = document.querySelector("#drink-instructions");
const DMContent = document.querySelector("#drink-modal-content");
const DMBody = document.querySelector("#drink-modal-body");
function getRandomDrinkApi() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            drinkNameEl.textContent = data.drinks[0].strDrink;
            let drinkImg = data.drinks[0].strDrinkThumb;
            drinkImgEl.src = drinkImg;
            drinkImgEl.onclick = function () {
                DMBody.innerHTML = "";
                DMInstructions.innerHTML = "";
                drinkModalEl.style.display = "block";
                DMHeader.textContent = data.drinks[0].strDrink;

                for (let i = 1; i < 15; i++) {

                    if (data.drinks[0][`${'strIngredient' + i}`] && data.drinks[0][`${'strMeasure' + i}`]) {
                        const measure = data.drinks[0][`${'strMeasure' + i}`];
                        const recipe = data.drinks[0][`${'strIngredient' + i}`];
                        let recipeList = document.createElement('li');
                        recipeList.textContent = (measure + recipe);
                        DMInstructions.append(recipeList);
                    }

                }
                let DMDirections = document.createElement('h4');
                DMDirections.textContent = data.drinks[0].strInstructions;
                DMBody.append(DMInstructions);
                DMBody.append(DMDirections);
            }
            drinkSpan.onclick = function () {
                drinkModalEl.style.display = "none";
            }
            
        })
}

function getRandomFoodApi() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            foodNameEl.textContent = data.meals[0].strMeal;
            let foodImg = data.meals[0].strMealThumb;
            foodImgEl.src = foodImg;
        })
}
getRandomDrinkApi();
getRandomFoodApi();




/*When the favorites button is clicked, the user is redirected to the favorites page*/
favoritesBtn.addEventListener('click', function () {
    window.location.assign('favorites.html')
});