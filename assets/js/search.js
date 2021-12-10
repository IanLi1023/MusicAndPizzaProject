// Global Scope Variables
const messageEl = document.querySelector('#messageEl')
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

// Function to get a random drink from the API
function getRandomDrinkApi() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Setting current drink equal to the value of the drink recieved from the API, and populating the name and image of the drink on the card.
            currentDrink = data.drinks[0];
            drinkNameEl.textContent = data.drinks[0].strDrink;
            let drinkImg = data.drinks[0].strDrinkThumb;
            drinkImgEl.src = drinkImg;
            // When the user clicks on the image, a modal pops up conatining the instructions on how to make the drink.
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
            // When the user clicks the x, the modal closes
            drinkSpan.onclick = function () {
                drinkModalEl.style.display = "none";
            }
        })
}

// When the user clicks add to favorites, the current drink data is saved to the local storage
drinkFavoritesBtn.addEventListener("click", function (e) {
    let myDrinks
    messageEl.innerHTML = "";
    if (localStorage.getItem("favoriteDrinks") === null) {
        myDrinks = [];
        myDrinks.push(currentDrink);
        localStorage.setItem("favoriteDrinks", JSON.stringify(myDrinks));
        let duplicate = document.createElement("h1");
        duplicate.textContent = (currentDrink.strDrink + " saved to favorites.");
        messageEl.appendChild(duplicate);
    } else {
        myDrinks = JSON.parse(localStorage.getItem("favoriteDrinks"));
        for (var i = 0; i < myDrinks.length; i++) {
            // If the current drink is already saved to favorites, display message for user.
            if (myDrinks[i].idDrink === currentDrink.idDrink) {
                let duplicate = document.createElement("h1");
                duplicate.textContent = (currentDrink.strDrink + " is already saved to favorites.");
                messageEl.appendChild(duplicate);
                return;
            }
            // If the current drink is not saved to favorites, display message for user "Added to favorites".
            if (i === myDrinks.length - 1) {
                myDrinks.push(currentDrink);
                localStorage.setItem("favoriteDrinks", JSON.stringify(myDrinks));
                let duplicate = document.createElement("h1");
                duplicate.textContent = (currentDrink.strDrink + " saved to favorites.");
                messageEl.appendChild(duplicate);
                return;
            }
        }
    }

})

// Function to get a random meal from the API
function getRandomFoodApi() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Setting current meal equal to the value of the meal recieved from the API, and populating the name and image of the meal on the card.
            currentMeal = data.meals[0];
            foodNameEl.textContent = data.meals[0].strMeal;
            let foodImg = data.meals[0].strMealThumb;
            foodImgEl.src = foodImg;
            // When the user clicks on the image, a modal pops up conatining the instructions on how to make the meal.
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
            // When the user clicks the x, the modal closes
            foodSpan.onclick = function () {
                foodModalEl.style.display = "none";
            }
        })
}

// When the user clicks add to favorites, the current  data is saved to the local storage
foodFavoritesBtn.addEventListener("click", function () {
    let myMeals
    messageEl.innerHTML = "";
    if (localStorage.getItem("favoriteMeals") === null) {
        myMeals = [];
        myMeals.push(currentMeal);
        localStorage.setItem("favoriteMeals", JSON.stringify(myMeals));
        let duplicate = document.createElement("h1");
        duplicate.textContent = (currentMeal.strMeal + " saved to favorites.");
        messageEl.appendChild(duplicate);
    } else {
        myMeals = JSON.parse(localStorage.getItem("favoriteMeals"));
        for (var i = 0; i < myMeals.length; i++) {
            // If the current meal is already saved to favorites, display message for user.
            if (myMeals[i].idMeal === currentMeal.idMeal) {
                let duplicate = document.createElement("h1");
                duplicate.textContent = (currentMeal.strMeal + " is already saved to favorites.");
                messageEl.appendChild(duplicate);
                return;
            }
            // If the current meal is not saved to favorites, display message for user "Added to favorites".
            if (i === myMeals.length - 1) {
                myMeals.push(currentMeal);
                localStorage.setItem("favoriteMeals", JSON.stringify(myMeals));
                let duplicate = document.createElement("h1");
                duplicate.textContent = (currentMeal.strMeal + " saved to favorites.");
                messageEl.appendChild(duplicate);
                return;
            }
        }
    }

})

// Run both functions, when the page loads to have a random drink and random meal on the screen.
getRandomDrinkApi();
getRandomFoodApi();

// When the View favorites button is clicked, the user is redirected to the favorites page
favoritesBtn.addEventListener('click', function () {
    window.location.assign('favorites.html')
});

// When the randomize both button is clicked, both random functions run.
randomizeBothBtn.addEventListener('click', function () {
    getRandomDrinkApi();
    getRandomFoodApi();
})

// When the food randomize button is clicked, only the new random meal function will run.
foodRandomizeBtn.addEventListener('click', function () {
    getRandomFoodApi();
})

// When the drink randomize button is clicked, only the new random drink function will run.
drinkRandomizeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    getRandomDrinkApi();
})

// When the search button is clicked on the drinks card, the API will get an array, only with drinks based on the option the user has selected.
drinkSubmitBtn.addEventListener('click', function () {
    let DDUserChoice = DDDrinkSelectBtn.options[DDDrinkSelectBtn.selectedIndex].value

    function searchDrinkApi() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + DDUserChoice)
            .then(function (response) {
                return response.json();
            })
            // Generate a random number, between 0 and the length of the array. The drink in that spot of the array becomes the current drink. 
            .then(function (data) {
                let randomNumber = Math.floor(Math.random() * data.drinks.length);
                // Populate the page with the name and image of the new drink. 
                drinkNameEl.textContent = data.drinks[randomNumber].strDrink;
                let drinkImg = data.drinks[randomNumber].strDrinkThumb;
                drinkImgEl.src = drinkImg;
                // Grab the recipe from a different API.
                let drinkID = data.drinks[randomNumber].idDrink;
                fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkID)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        currentDrink = data.drinks[0];
                        // When the user clicks on the image, a modal pops up conatining the instructions on how to make the drink.
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
                    })
                        // When the user clicks the x, the modal closes
                        drinkSpan.onclick = function () {
                            drinkModalEl.style.display = "none";
                        }
            })
    }    
    // Run the Search Drink Function when the search button is clicked.
    searchDrinkApi()
})

// When the search button is clicked on the food card, the API will get an array, only with meals based on the option the user has selected.
foodSubmitBtn.addEventListener('click', function () {
    let DDUserChoice = DDFoodSelectBtn.options[DDFoodSelectBtn.selectedIndex].value

    function searchFoodApi() {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + DDUserChoice)
            .then(function (response) {
                return response.json();
            })
            // Generate a random number, between 0 and the length of the array. The meal in that spot of the array becomes the current drink.
            .then(function (data) {
                let randomNumber = Math.floor(Math.random() * data.meals.length);
                // Populate the page with the name and image of the new meal.
                foodNameEl.textContent = data.meals[randomNumber].strMeal;
                let foodImg = data.meals[randomNumber].strMealThumb;
                foodImgEl.src = foodImg;
                // Grab the recipe from a different API.
                let foodID = data.meals[randomNumber].idMeal;
                fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + foodID)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        currentMeal = data.meals[0];
                        // When the user clicks on the image, a modal pops up conatining the instructions on how to make the meal.
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
                    })
                // When the user clicks the x, the modal closes
                foodSpan.onclick = function () {
                    foodModalEl.style.display = "none";
                }
            })
    }
    // Run the Search Food Function when the search button is clicked.
    searchFoodApi()
})