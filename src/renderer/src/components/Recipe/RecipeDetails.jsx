import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar
} from '@mui/material'

import { RecipeDataContext } from '../../context/contextData'
import RecipeDetailsService from '../../services/recipedetails-service'
import nopicImage from '../../assets/nopic.jpg'

const RecipeDetails = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const { getCategoryName, getTagName } = useContext(RecipeDataContext)
  const url = 'https://smakoowaapi.azurewebsites.net'

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await RecipeDetailsService.getRecipeDetails(id)
        setRecipe(response.content)
      } catch (error) {
        console.error('Failed to fetch recipe details', error)
      }
    }

    fetchRecipeDetails()
  }, [id])

  if (!recipe) {
    return <div>Loading...</div>
  }

  const {
    creatorUsername,
    name,
    likeCount,
    description,
    servingsTier,
    timeToMakeTier,
    categoryId,
    tagIds,
    instructions,
    ingredients,
    recipeComments,
    createdAt
  } = recipe

  const imageUrl = recipe.imageId
    ? `${url}/api/Images/GetRecipeImage/${recipe.imageId}`
    : nopicImage

  const formattedDate = new Date(createdAt).toISOString().split('T')[0]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardMedia component="img" image={imageUrl} alt="Recipe" />
        </Card>
      </Grid>
      <Grid item xl={16} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1">
              {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Creator: {creatorUsername}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Created At: {formattedDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Likes: {likeCount}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Servings Tier: {servingsTier}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Time to Make Tier: {timeToMakeTier}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: {getCategoryName(categoryId)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Tags: {tagIds.map((tagId) => getTagName(tagId)).join(', ')}
            </Typography>
            <Typography variant="h6" component="h2">
              Instructions:
            </Typography>
            <List>
              {instructions.map((instruction) => (
                <ListItem key={instruction.id}>
                  <ListItemText primary={instruction.content} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" component="h2">
              Ingredients:
            </Typography>
            <List>
              {ingredients.map((ingredient) => (
                <ListItem key={ingredient.id}>
                  <ListItemText primary={ingredient.name} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" component="h2">
              Comments:
            </Typography>
            {recipeComments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemIcon>
                  <Avatar src="" />
                </ListItemIcon>
                <ListItemText
                  primary={comment.content}
                  secondary={`${new Date(comment.createdAt).toISOString().split('T')[0]} ${new Date(
                    comment.createdAt
                  ).getHours()}:${new Date(comment.createdAt).getMinutes()}`}
                />
              </ListItem>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RecipeDetails
