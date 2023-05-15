import { useContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Chip from '@mui/material/Chip'
import { format } from 'date-fns'
import RecipeLikeButton from './RecipeLikeButton'

import nopicImage from '../../assets/nopic.jpg'
import { RecipeDataContext } from '../../context/contextData'

const RecipeCard = ({ recipe }) => {
  const formattedDate = format(new Date(recipe.createdAt), 'yyyy-MM-dd')
  const { getTagName, getCategoryName } = useContext(RecipeDataContext)

  const url = 'https://smakoowaapi.azurewebsites.net'

  const history = useNavigate()

  const handleSettingsClick = () => {
    history(`/recipe/${recipe.id}`)
  }

  const imageUrl = recipe.imageId
    ? `${url}/api/Images/GetRecipeImage/${recipe.imageId}`
    : nopicImage

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="Show Details" onClick={handleSettingsClick}>
            <ArrowForwardIcon />
          </IconButton>
        }
        title={recipe.name}
        subheader={formattedDate}
      />
      {imageUrl && <CardMedia component="img" height="194" alt="pic" src={imageUrl} />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Category:
        </Typography>
        <Chip label={getCategoryName(recipe.categoryId)} color="primary" />
        <Typography variant="body2" color="text.secondary">
          Tags:
        </Typography>
        {recipe.tagIds.map((tagId) => (
          <Chip key={tagId} label={getTagName(tagId)} color="success" />
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <RecipeLikeButton recipeId={recipe.id} />
        <Typography>{recipe.likeCount}</Typography>
      </CardActions>
    </Card>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageId: PropTypes.string,
    name: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
    servingsTier: PropTypes.number.isRequired,
    tagIds: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
}

export default RecipeCard
