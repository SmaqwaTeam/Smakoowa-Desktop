import axios from 'axios'

const apiUrl = 'https://smakoowaapi.azurewebsites.net'
const RecipeDetailsService = {
  async getRecipeDetails(id) {
    try {
      const response = await axios.get(`${apiUrl}/api/Recipes/GetByIdDetailed/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch recipe details')
    }
  }
}

export default RecipeDetailsService
