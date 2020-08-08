import {updateRecipe, removeRecipe} from './recipes'
import {addIngredient, renderIngredients} from './ingredients'
import {initializeEditPage} from './views'

const recipeId = location.hash.substring(1)

renderIngredients(recipeId)
initializeEditPage(recipeId)

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const ingredientElement = document.querySelector('#new-ingredient')
const removeElement = document.querySelector('#delete-recipe')

titleElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
})

bodyElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        body: e.target.value
    }) 
})

ingredientElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()

    if (text.length > 0) {
        addIngredient(recipeId, text)
        e.target.elements.text.value = ''
    }
})

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})