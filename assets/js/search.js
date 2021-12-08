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
const foodModalEl = document.querySelector('#food-modal');
const foodSpan = document.querySelector("#close-food");
const FMHeader = document.querySelector("#food-modal-title");
const FMInstructions = document.querySelector("#food-instructions");
const FMContent = document.querySelector("#food-modal-content");
const FMBody = document.querySelector("#food-modal-body");
const foodRandomizeBtn = document.querySelector(".randomize-food");
const drinkRandomizeBtn = document.querySelector(".randomize-drink");
const randomizeBothBtn = document.querySelector(".randomize-bothBtn");
const DDDrinkSelectBtn = document.querySelector("#drink-select")
const drinkSubmitBtn = document.querySelector(".submit-drink")
const DDFoodSelectBtn = document.querySelector("#food-list")
const foodSubmitBtn = document.querySelector(".submit-food")
const drinkFavoritesBtn = document.querySelector('.drink-favorites');
const foodFavoritesBtn = document.querySelector('.food-favorites')


let currentDrink
let currentMeal

function getRandomDrinkApi() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentDrink = data.drinks[0];
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

drinkFavoritesBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    let myDrinks
    if (localStorage.getItem("favoriteDrinks") === null) {
        myDrinks = [];
        myDrinks.push(currentDrink);
        localStorage.setItem("favoriteDrinks", JSON.stringify(myDrinks));
    } else {
        myDrinks = JSON.parse(localStorage.getItem("favoriteDrinks"));
        for (var i = 0; i < myDrinks.length; i++) {


            if (myDrinks[i].idDrink === currentDrink.idDrink) {
                alert('Duplicate Drink');
                return;
            }
            if (i === myDrinks.length - 1) {
                myDrinks.push(currentDrink);
                localStorage.setItem("favoriteDrinks", JSON.stringify(myDrinks));
                return;
            }
        }
    }

})

function getRandomFoodApi() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentMeal = data.meals[0];
            foodNameEl.textContent = data.meals[0].strMeal;
            let foodImg = data.meals[0].strMealThumb;
            foodImgEl.src = foodImg;
            foodImgEl.onclick = function () {
                FMBody.innerHTML = "";
                FMInstructions.innerHTML = "";
                foodModalEl.style.display = "block";
                FMHeader.textContent = data.meals[0].strMeal;

                for (let i = 1; i < 15; i++) {

                    if (data.meals[0][`${'strIngredient' + i}`] && data.meals[0][`${'strMeasure' + i}`]) {
                        const measure = data.meals[0][`${'strMeasure' + i}`];
                        const recipe = data.meals[0][`${'strIngredient' + i}`];
                        let recipeList = document.createElement('li');
                        recipeList.textContent = (measure + recipe);
                        FMInstructions.append(recipeList);
                    }

                }
                let FMDirections = document.createElement('h4');
                FMDirections.textContent = data.meals[0].strInstructions;
                FMBody.append(FMInstructions);
                FMBody.append(FMDirections);
            }
            foodSpan.onclick = function () {
                foodModalEl.style.display = "none";
            }



        })
}

foodFavoritesBtn.addEventListener("click", function (e) {
    let myMeals
    if (localStorage.getItem("favoriteMeals") === null) {
        myMeals = [];
        myMeals.push(currentMeal);
        localStorage.setItem("favoriteMeals", JSON.stringify(myMeals));
    } else {
        myMeals = JSON.parse(localStorage.getItem("favoriteMeals"));
        for (var i = 0; i < myMeals.length; i++) {
            if (myMeals[i].idMeal === currentMeal.idMeal) {
                alert('Duplicate Meal');
                return;
            }
            if (i === myMeals.length - 1) {
                myMeals.push(currentMeal);
                localStorage.setItem("favoriteMeals", JSON.stringify(myMeals));
                return;
            }
        }
    }

})

getRandomDrinkApi();
getRandomFoodApi();

/*When the favorites button is clicked, the user is redirected to the favorites page*/
favoritesBtn.addEventListener('click', function () {
    window.location.assign('favorites.html')
});

randomizeBothBtn.addEventListener('click', function () {
    getRandomDrinkApi();
    getRandomFoodApi();
})

foodRandomizeBtn.addEventListener('click', function () {
    getRandomFoodApi();
})

drinkRandomizeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    getRandomDrinkApi();
})

drinkSubmitBtn.addEventListener('click', function () {
    let DDUserChoice = DDDrinkSelectBtn.options[DDDrinkSelectBtn.selectedIndex].value


    function searchDrinkApi() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + DDUserChoice)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let randomNumber = Math.floor(Math.random() * data.drinks.length);
                drinkNameEl.textContent = data.drinks[randomNumber].strDrink;
                let drinkImg = data.drinks[randomNumber].strDrinkThumb;
                drinkImgEl.src = drinkImg;
                drinkImgEl.onclick = function () {
                    DMBody.innerHTML = "";
                    DMInstructions.innerHTML = "";
                    drinkModalEl.style.display = "block";
                    DMHeader.textContent = data.drinks[randomNumber].strDrink;

                    let drinkID = data.drinks[randomNumber].idDrink;

                    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkID)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
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
                        })
                    drinkSpan.onclick = function () {
                        drinkModalEl.style.display = "none";
                    }
                }

            })
    }
    searchDrinkApi()

})

foodSubmitBtn.addEventListener('click', function () {
    let DDUserChoice = DDFoodSelectBtn.options[DDFoodSelectBtn.selectedIndex].value


    function searchFoodApi() {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + DDUserChoice)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let randomNumber = Math.floor(Math.random() * data.meals.length);
                foodNameEl.textContent = data.meals[randomNumber].strMeal;
                let foodImg = data.meals[randomNumber].strMealThumb;
                foodImgEl.src = foodImg;
                foodImgEl.onclick = function () {
                    FMBody.innerHTML = "";
                    FMInstructions.innerHTML = "";
                    foodModalEl.style.display = "block";
                    FMHeader.textContent = data.meals[randomNumber].strMeal;

                    let foodID = data.meals[randomNumber].idMeal;

                    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + foodID)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            for (let i = 1; i < 15; i++) {

                                if (data.meals[0][`${'strIngredient' + i}`] && data.meals[0][`${'strMeasure' + i}`]) {
                                    const measure = data.meals[0][`${'strMeasure' + i}`];
                                    const recipe = data.meals[0][`${'strIngredient' + i}`];
                                    let recipeList = document.createElement('li');
                                    recipeList.textContent = (measure + recipe);
                                    FMInstructions.append(recipeList);
                                }

                            }
                            let FMDirections = document.createElement('h4');
                            FMDirections.textContent = data.meals[0].strInstructions;
                            FMBody.append(FMInstructions);
                            FMBody.append(FMDirections);
                        })
                    foodSpan.onclick = function () {
                        foodModalEl.style.display = "none";
                    }
                }

            })
    }
    searchFoodApi()
})