import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import nopicImage from '../../assets/nopic.jpg'

export default function UserRecipes() {
  const [recipes, setRecipes] = useState([])
  const history = useNavigate()
  const apiUrl = 'https://smakoowaapi.azurewebsites.net'

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.content?.token
    const userId = user?.content?.user?.id

    if (!token) {
      return
    }

    fetch(`${apiUrl}/api/Recipes/GetUserRecipies/${userId}`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.content && data.content.length > 0) {
          setRecipes(data.content)
        }
      })
      .catch((error) => {
        console.error('Błąd pobierania przepisów:', error)
      })
  }, [])

  const handleOpenClick = (recipeId) => {
    history(`/recipe/${recipeId}`)
  }

  const handleDeleteClick = (recipeId) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.content?.token

    if (!token) {
      return
    }

    const url = `${apiUrl}/api/Recipes/Delete/${recipeId}`

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'text/plain',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // Usuń przepis z listy po udanym usunięciu
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId))
      })
      .catch((error) => {
        console.error('Błąd usuwania przepisu:', error)
      })
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <Card key={recipe.id} sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={() => handleOpenClick(recipe.id)}>
            {recipe.imageId ? (
              <CardMedia
                component="img"
                height="140"
                image={`${apiUrl}/api/Images/GetRecipeImage/${recipe.imageId}`}
                alt={recipe.name}
              />
            ) : (
              <CardMedia component="img" height="140" image={nopicImage} alt="No Image" />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {' '}
                {recipe.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleOpenClick(recipe.id)}>
              Open
            </Button>
            <Button size="small" color="secondary" onClick={() => handleDeleteClick(recipe.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
