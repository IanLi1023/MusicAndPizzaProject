// Set Global Variables
const homeBtnEl = document.querySelector('#homebtn');
const favMealBox = document.querySelector('#favorite-meal-container');
const favDrinkBox = document.querySelector('#favorite-cocktail-container');
const foodModalEl = document.querySelector('#food-modal');
const foodSpan = document.querySelector("#close-food");
const FMHeader = document.querySelector("#food-modal-title");
const FMInstructions = document.querySelector("#food-instructions");
const FMContent = document.querySelector("#food-modal-content");
const FMBody = document.querySelector("#food-modal-body");
const drinkModalEl = document.querySelector('#drink-modal');
const drinkSpan = document.querySelector("#close-drink");
const DMHeader = document.querySelector("#drink-modal-title");
const DMInstructions = document.querySelector("#drink-instructions");
const DMContent = document.querySelector("#drink-modal-content");
const DMBody = document.querySelector("#drink-modal-body");
// List the favorite meals, stored in local storage, on the page.
function listFavoriteMeals() {
    const savedMeals = JSON.parse(localStorage.getItem('favoriteMeals'));
    // If there is nothing saved to local storage, do nothing.
    if (savedMeals === null) {} else {
        // Loop through the array of saved Meals and list them out as buttons on the screen.
        for (let i = 0; i < savedMeals.length; i++) {
            let myMeal = savedMeals[i];
            let myMealBtn = document.createElement('button');
            myMealBtn.setAttribute('class', 'mealButtons');
            myMealBtn.setAttribute('class', 'btn btn-primary col-10 mx-5 btn mt-1')
            console.log(myMeal.strMeal);
            myMealBtn.textContent = myMeal.strMeal;
            favMealBox.append(myMealBtn);
            // When the button is clicked, the recipe for that meal pops up in a modal.
            myMealBtn.addEventListener('click', function () {
                FMBody.innerHTML = "";
                FMInstructions.innerHTML = "";
                foodModalEl.style.display = "block";
                FMHeader.textContent = myMeal.strMeal;
                // List the ingredients and the measurements for the recipe on the modal.
                for (let i = 1; i < 15; i++) {
                    if (myMeal[`${'strIngredient' + i}`] && myMeal[`${'strMeasure' + i}`]) {
                        const measure = myMeal[`${'strMeasure' + i}`];
                        const recipe = myMeal[`${'strIngredient' + i}`];
                        let recipeList = document.createElement('li');
                        recipeList.textContent = (measure + recipe);
                        FMInstructions.append(recipeList);
                    }
                }
                // Append the ingredients and the instructions to the modal.
                let FMDirections = document.createElement('h4');
                FMDirections.textContent = myMeal.strInstructions;
                FMBody.append(FMInstructions);
                FMBody.append(FMDirections);
                // Close the modal when the x is clicked. 
                foodSpan.onclick = function () {
                    foodModalEl.style.display = "none";
                }
            })
        }
    }
}
// List the favorite drinks, stored in local storage, on the page.
function listFavoriteDrinks() {
    const savedDrinks = JSON.parse(localStorage.getItem('favoriteDrinks'));
    // If there is nothing saved to local storage, do nothing.
    if (savedDrinks === null) {} else {
        // Loop through the array of saved Meals and list them out as buttons on the screen.
        for (let i = 0; i < savedDrinks.length; i++) {
            let myDrink = savedDrinks[i];
            let myDrinkBtn = document.createElement('button');
            myDrinkBtn.setAttribute('class', 'drinkButtons');
            myDrinkBtn.setAttribute('class', 'btn btn-primary col-10 mx-5 btn mt-1')
            console.log(myDrink.strDrink);
            myDrinkBtn.textContent = myDrink.strDrink;
            favDrinkBox.append(myDrinkBtn);
            // When the button is clicked, the recipe for that meal pops up in a modal.
            myDrinkBtn.addEventListener('click', function () {
                DMBody.innerHTML = "";
                DMInstructions.innerHTML = "";
                drinkModalEl.style.display = "block";
                DMHeader.textContent = myDrink.strDrink;
                // List the ingredients and the measurements for the recipe on the modal.
                for (let i = 1; i < 15; i++) {
                    if (myDrink[`${'strIngredient' + i}`] && myDrink[`${'strMeasure' + i}`]) {
                        const measure = myDrink[`${'strMeasure' + i}`];
                        const recipe = myDrink[`${'strIngredient' + i}`];
                        let recipeList = document.createElement('li');
                        recipeList.textContent = (measure + recipe);
                        DMInstructions.append(recipeList);
                    }
                }
                // Append the ingredients and the instructions to the modal.
                let DMDirections = document.createElement('h4');
                DMDirections.textContent = myDrink.strInstructions;
                DMBody.append(DMInstructions);
                DMBody.append(DMDirections);
                // Close the modal when the x is clicked. 
                drinkSpan.onclick = function () {
                    drinkModalEl.style.display = "none";
                }

            })
        }
    }
}
// List the favorite drinks and meals, when the page loads.
listFavoriteMeals();
listFavoriteDrinks();
/*When the back to search button is clicked, the user is redirected to the search page*/
homeBtnEl.addEventListener('click', function () {
    window.location.assign('search.html')
});