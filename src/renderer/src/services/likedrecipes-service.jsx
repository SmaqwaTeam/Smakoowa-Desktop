import axios from 'axios'

const apiUrl = 'https://smakoowaapi.azurewebsites.net'

const GetLikedRecipes = {
  async getLikedRecipes() {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = user?.content?.token

      const response = await axios.get(`${apiUrl}/api/Recipes/GetLikedRecipies`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data
    } catch (error) {
      throw new Error('Failed to fetch liked recipes')
    }
  }
}

export default GetLikedRecipes
