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
  Avatar,
  Chip
} from '@mui/material'
import AddComment from './AddComment'

import { RecipeDataContext } from '../../context/contextData'
import RecipeDetailsService from '../../services/recipedetails-service'
import nopicImage from '../../assets/nopic.jpg'

const RecipeDetails = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const { getCategoryName, getTagName } = useContext(RecipeDataContext)
  const [timeToMakeTierMap, setTimeToMakeTierMap] = useState({})
  const [servingsTierMap, setServingsTierMap] = useState({})
  const url = 'https://smakoowaapi.azurewebsites.net'
  const { timeToMakeTiers, servingsTiers } = useContext(RecipeDataContext)

  useEffect(() => {
    const timeToMakeTierMap = {}
    timeToMakeTiers.forEach((tier, index) => {
      timeToMakeTierMap[index] = tier
    })
    setTimeToMakeTierMap(timeToMakeTierMap)

    const servingsTierMap = {}
    servingsTiers.forEach((tier, index) => {
      servingsTierMap[index] = tier
    })
    setServingsTierMap(servingsTierMap)

    const fetchRecipeDetails = async () => {
      try {
        const response = await RecipeDetailsService.getRecipeDetails(id)
        setRecipe(response.content)
      } catch (error) {
        console.error('Failed to fetch recipe details', error)
      }
    }

    fetchRecipeDetails()
  }, [id, timeToMakeTiers, servingsTiers])

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
            <Typography variant="body2" gutterBottom>
              {formattedDate}
            </Typography>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {description}
              </Typography>
            </CardContent>
            <Typography variant="h5" gutterBottom>
              Author: {creatorUsername}
            </Typography>

            <Typography variant="body2" gutterBottom>
              Likes: {likeCount}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Servings Tier:
            </Typography>
            <Chip label={servingsTierMap[servingsTier]} color="primary" variant="outlined" />
            <Typography variant="body2" gutterBottom>
              Time to Make Tier:
            </Typography>
            <Chip label={timeToMakeTierMap[timeToMakeTier]} color="secondary" variant="outlined" />
            <Typography variant="body2" gutterBottom>
              Category:
            </Typography>
            <Chip label={getCategoryName(categoryId)} color="primary" variant="success" />

            <Typography variant="body2" gutterBottom>
              Tags:
            </Typography>
            {recipe.tagIds.map((tagId) => (
              <Chip key={tagId} label={getTagName(tagId)} color="success" />
            ))}
            <Typography variant="body2" gutterBottom />
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
            <AddComment recipeId={id} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RecipeDetails
