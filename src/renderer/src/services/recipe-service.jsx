import axios from 'axios'

const apiUrl = 'https://smakoowaapi.azurewebsites.net'

const GetAllRecipes = {
  async getRecipes() {
    try {
      const response = await axios.get(`${apiUrl}/api/Recipes/GetAll`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch recipes')
    }
  }
}

export default GetAllRecipes
