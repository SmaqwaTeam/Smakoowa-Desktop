import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import RecipeCard from '../components/RecipeCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GetAllRecipes from '../services/recipe-service'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function SearchBar() {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState([])

  useEffect(() => {
    fetchRecipes()
  }, [])

  useEffect(() => {
    filterRecipes()
  }, [searchTerm, recipes])

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

  const filterRecipes = () => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRecipes(filtered)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    filterRecipes()
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
            <Box sx={{ pt: 4, display: 'flex', justifyContent: 'center' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Recipe Name"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ ml: 1 }}>
                        <SearchIcon />
                      </Box>
                    )
                  }}
                />
              </form>
            </Box>
          </Container>
        </Box>
        {searchTerm && filteredRecipes.length === 0 ? (
          <Typography variant="h6" align="center" mt={4}>
            No recipes found
          </Typography>
        ) : (
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {filteredRecipes.map((recipe) => (
                <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <RecipeCard recipe={recipe} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
