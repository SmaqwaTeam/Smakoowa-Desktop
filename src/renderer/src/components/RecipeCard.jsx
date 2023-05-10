import React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RecipeService from './../services/recipe-service'

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = React.useState(false)
  const [image, setImage] = React.useState(null) // Stan przechowujący obrazek

  React.useEffect(() => {
    // Pobieranie obrazka po załadowaniu komponentu
    const fetchImage = async () => {
      try {
        const imageData = await RecipeService.getRecipeImage(recipe.id)
        setImage(imageData)
      } catch (error) {
        console.error('Failed to fetch recipe image', error)
      }
    }

    fetchImage()
  }, [recipe.id])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.name}
        subheader={recipe.date} // Użyj właściwości `date` z obiektu `recipe`
      />
      {image && (
        <CardMedia
          component="img"
          height="194"
          src={image} // Użyj pobranego obrazka
          alt="pic"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="show more" onClick={handleExpandClick} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          <ul>
            {recipe.ingredients?.map((ingredient) => (
              <li key={ingredient.position}>{ingredient.name}</li>
            ))}
          </ul>
          <ol>
            {recipe.instructions?.map((instruction) => (
              <li key={instruction.position}>{instruction.content}</li>
            ))}
          </ol>
        </CardContent>
      </Collapse>
    </Card>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired
      })
    ).isRequired,
    instructions: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
}

export default RecipeCard
