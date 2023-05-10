import axios from 'axios'

const apiUrl = 'https://localhost:7188/api'

const apiService = {
  async getRecipes() {
    try {
      const response = await axios.get(`${apiUrl}/Recipes/GetAll`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch recipes')
    }
  }
}

export default apiService
