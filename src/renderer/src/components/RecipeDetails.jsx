import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import RecipeDetailsService from '../services/recipedetails-service'
import nopicImage from './../assets/nopic.jpg'

const RecipeDetails = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

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
    imageId,
    creatorUsername,
    name,
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
    ? `https://smakoowaapi.azurewebsites.net/api/Images/GetRecipeImage/${recipe.imageId}`
    : nopicImage

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardMedia component="img" image={imageUrl} alt="Recipe" />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
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
              Servings Tier: {servingsTier}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Time to Make Tier: {timeToMakeTier}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category ID: {categoryId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Tag IDs: {tagIds.join(', ')}
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
              <div key={comment.id}>
                <Typography variant="body1" gutterBottom>
                  Content: {comment.content}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Created At: {comment.createdAt}
                </Typography>
              </div>
            ))}
            <Typography variant="body1">Created At: {createdAt}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RecipeDetails
