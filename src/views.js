import {getFilters} from './filters'
import {getRecipes} from './recipes'

const initializeEditPage = (id) => {
    const titleElement = document.querySelector('#recipe-title')
    const bodyElement = document.querySelector('#recipe-body')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    bodyElement.value = recipe.body
}

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }

    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    // Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateStatus(recipe.id)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
}


const renderRecipes = () => {

    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

const generateStatus = (id) => {

    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === id)
    const size = recipe.ingredients.length
    let counter = 0

    recipe.ingredients.forEach((obj, index) => {
        if (obj.isChecked === true) {
            counter++        
        }
    })

    if (counter > 0 && counter === size) {
        return 'You have all the ingredients'    
    }
    if (counter == 0) {
        return 'You have none of the ingredients'
    }
    if (counter < size) {
        return 'You have some of the ingredients'
    }
    
}

export {generateRecipeDOM, renderRecipes, initializeEditPage}