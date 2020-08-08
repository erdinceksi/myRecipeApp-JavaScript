import { v4 as uuidv4 } from 'uuid';

let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON): []
    } catch (e) {
        return []
    }
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuidv4()

    recipes.push({
        id,
        title: '',
        body: '',
        status: '',
        ingredients: []
    })

    saveRecipes()

    return id
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title    
    }

    if (typeof updates.body === 'string') {
        recipe.body = updates.body    
    }

    saveRecipes()

    return recipe
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

recipes = loadRecipes()

export {
    loadRecipes, 
    saveRecipes, 
    getRecipes, 
    createRecipe,
    updateRecipe,
    removeRecipe}