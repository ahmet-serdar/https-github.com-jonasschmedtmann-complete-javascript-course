import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/SearchView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

/* SEARCH CONTROLER */

const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput();
    console.log(query)

    if(query) {
        //New search object and add it to state
        state.search = new Search(query);

        //Prepare UI for search
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try{
            //Search for recipes
            await state.search.getResults();
    
            //Render results on UI
            clearLoader()
            searchView.renderResults(state.search.result);
        }catch (err) {
            alert('Something wrong with the search...');
            clearLoader()
        }
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage);
    }
})

/*RECIPE CONTROLLER */

// const r = new Recipe(46956);
// r.getRecipe()
// console.log(r)

const controlRecipe =async () => {
    
    //Get id from url
    const id = window.location.hash.replace('#', '')

    if(id) {
        //Prepare UI for changes

        //Create new recipe object
        state.recipe = new Recipe(id)

        try {
            //Get recipe data
            await state.recipe.getRecipe()

            //Calculate servings and time
            state.recipe.calcTime()
            state.recipe.calcServings()
            //Render recipe


        }catch(error) {
            alert('Error processing recipe!')
        }
    }
}

['haschange', 'load'].forEach(event => window.addEventListener(event, controlRecipe) )