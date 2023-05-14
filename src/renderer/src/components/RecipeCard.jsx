import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { format } from 'date-fns'

import axios from 'axios'
import nopicImage from './../assets/nopic.jpg'

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false)
  const [tagNames, setTagNames] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [liked, setLiked] = useState(false)
  const formattedDate = format(new Date(recipe.createdAt), 'yyyy-MM-dd')

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const history = useNavigate()

  const handleSettingsClick = () => {
    history(`/recipe/${recipe.id}`)
  }

  const imageUrl = recipe.imageId
    ? `https://smakoowaapi.azurewebsites.net/api/Images/GetRecipeImage/${recipe.imageId}`
    : nopicImage

  const token = localStorage.getItem('token')
  const [userToken, setUserToken] = useState(token)

  const toggleLike = () => {
    if (liked) {
      axios
        .delete(`https://smakoowaapi.azurewebsites.net/api/Likes/RemoveRecipeLike/${recipe.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })

        .catch((error) => {
          console.error('Error removing like:', error)
        })
    } else {
      axios
        .post(`https://smakoowaapi.azurewebsites.net/api/Likes/AddRecipeLike/${recipe.id}`, null, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })

        .catch((error) => {
          console.error('Error adding like:', error)
        })
    }
  }

  useEffect(() => {
    // Fetch tag names
    axios
      .get('https://smakoowaapi.azurewebsites.net/api/Tags/GetAll', {
        headers: {
          accept: 'application/json'
        }
      })
      .then((response) => {
        const tags = response.data.content
        const filteredTags = tags.filter((tag) => recipe.tagIds.includes(tag.id))
        const tagNames = filteredTags.map((tag) => tag.name)
        setTagNames(tagNames)
      })
      .catch((error) => {
        console.error('Error fetching tags:', error)
      })

    // Fetch category name
    axios
      .get('https://smakoowaapi.azurewebsites.net/api/Categories/GetAll', {
        headers: {
          accept: 'application/json'
        }
      })
      .then((response) => {
        const categories = response.data.content
        const category = categories.find((cat) => cat.id === recipe.categoryId)
        if (category) {
          setCategoryName(category.name)
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
  }, [recipe])

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleSettingsClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.name}
        subheader={formattedDate}
      />
      {imageUrl && <CardMedia component="img" height="194" alt="pic" src={imageUrl} />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
        <Typography paragraph>Category: {categoryName}</Typography>
        <Typography paragraph>Tags: {tagNames.join(', ')}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={toggleLike}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography>{recipe.likeCount}</Typography>
        <IconButton aria-label="show more" onClick={handleExpandClick} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageId: PropTypes.string,
    name: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
    tagIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired
      })
    ),
    instructions: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired
      })
    )
  }).isRequired
}

export default RecipeCard
