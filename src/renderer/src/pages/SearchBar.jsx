import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import RecipeCard from '../components/RecipeCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GetAllRecipes from '../services/recipe-service'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function SearchBar() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const response = await GetAllRecipes.getRecipes()
      if (response.content && Array.isArray(response.content)) {
        setRecipes(response.content)
      } else {
        console.error('Invalid response format:', response)
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Search
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Write down below your recipe name
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button variant="contained">Add Recipe</Button>
              <Button variant="outlined">Show your recipes</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {recipes.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <RecipeCard recipe={recipe} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
