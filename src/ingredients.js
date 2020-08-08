import {getRecipes, saveRecipes} from './recipes'

const addIngredient = (id, text) => {
    const recipes = getRecipes()
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex <= -1) {
        return
    }

    recipes[recipeIndex].ingredients.push({
        name: text,
        isChecked: false
    })

    saveRecipes()
    renderIngredients(id)
}

const removeIngredient = (id, index) => {
    
    const recipes = getRecipes()
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes[recipeIndex].ingredients.splice(index, 1)
        saveRecipes()
    }

}

const renderIngredients = (id) => {
    const recipes = getRecipes()
    const ingredientEl = document.querySelector('#ingredients')
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
    
    ingredientEl.innerHTML = ''

    recipes[recipeIndex].ingredients.forEach((ingredient, index) => {
        ingredientEl.appendChild(generateIngredientDOM(id, ingredient, index))

    })
}

const toggleIngredient = (id, index) => {
    const recipes = getRecipes()
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipes[recipeIndex].ingredients[index]) {
        recipes[recipeIndex].ingredients[index].isChecked =! recipes[recipeIndex].ingredients[index].isChecked
        saveRecipes()
    }
}

const generateIngredientDOM = (id, ingredient, index) => {

    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const ingredientText = document.createElement('span')
    const removeButton = document.createElement('button')

    //Setup ingredient checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.isChecked
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleIngredient(id, index)
        renderIngredients(id)
    })

    //Setup ingredient text
    ingredientText.textContent = ingredient.name
    containerEl.appendChild(ingredientText)

    //Setup container
    ingredientEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    ingredientEl.appendChild(containerEl)

    //Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(id, index)
        renderIngredients(id)
    })

    return ingredientEl
}


export {addIngredient, renderIngredients}