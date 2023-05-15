import axios from 'axios'

const checkIfLiked = async (userToken, recipeId) => {
  try {
    if (!userToken) return false
    const response = await axios.get(
      'https://smakoowaapi.azurewebsites.net/api/Recipes/GetLikedRecipies',
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    const likedRecipes = response.data.content.map((recipe) => recipe.id)
    return likedRecipes.includes(recipeId)
  } catch (error) {
    console.error('Error checking if liked:', error)
    return false
  }
}

const handleLikeClick = async (userToken, recipeId, setLiked) => {
  try {
    if (!userToken) return
    const isLiked = await checkIfLiked(userToken, recipeId)
    if (isLiked) {
      await axios.delete(
        `https://smakoowaapi.azurewebsites.net/api/Likes/RemoveRecipeLike/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      setLiked(false)
    } else {
      await axios.post(
        `https://smakoowaapi.azurewebsites.net/api/Likes/AddRecipeLike/${recipeId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      setLiked(true)
    }
  } catch (error) {
    console.error('Error toggling like:', error)
  }
}

export { checkIfLiked, handleLikeClick }
