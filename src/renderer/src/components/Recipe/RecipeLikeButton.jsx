import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { checkIfLiked, handleLikeClick } from '../../services/likebutton-service'

const RecipeLikeButton = ({ recipeId }) => {
  const [liked, setLiked] = useState(false)
  const tokenData = localStorage.getItem('user')
  const parsedTokenData = JSON.parse(tokenData)
  const userToken = parsedTokenData?.content?.token

  useEffect(() => {
    const fetchData = async () => {
      const isLiked = await checkIfLiked(userToken, recipeId)
      setLiked(isLiked)
    }
    fetchData()
  }, [userToken, recipeId])

  const handleLike = () => {
    handleLikeClick(userToken, recipeId, setLiked)
  }

  return (
    <IconButton onClick={handleLike}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}

export default RecipeLikeButton
