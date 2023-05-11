import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Slider,
  Grid
} from '@material-ui/core'
import IngredientsForm from '../components/IngredientsForm'
import InstructionsForm from '../components/InstructionsForm'
import handleSubmitForm from '../services/addrecipe-service'
import { getCategories, getTags } from './GetCategoryTags-service'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  submitButton: {
    marginTop: theme.spacing(2)
  }
}))

const AddRecipe = () => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState([])
  const [timetomake, setTimetomake] = useState(2)
  const [servings, setServings] = useState(3)
  const [instructions, setInstructions] = useState(null)
  const [ingredients, setIngredients] = useState(null)
  const [recipes, setRecipes] = useState({
    categories: [],
    tags: []
  })
  useEffect(() => {
    // Pobierz kategorie i tagi przy montowaniu komponentu
    getCategories()
    getTags()
    fetchRecipes()
      .then((data) => {
        setRecipes(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('API_URL')
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Failed to fetch recipes')
    }
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleTagsChange = (event) => {
    setTags(event.target.value)
  }

  const handleTimetomakeChange = (event, value) => {
    setTimetomake(value)
  }

  const handleServingsChange = (event, value) => {
    setServings(value)
  }

  const handleInstructionsData = (data) => {
    setInstructions(data)
  }

  const handleIngredientsData = (data) => {
    setIngredients(data)
  }

  const handleSubmitForm = () => {
    handleSubmitForm(
      title,
      description,
      servings,
      timetomake,
      category,
      tags,
      ingredients,
      instructions
    )
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" align="center">
        Add a new recipe
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              value={title}
              onChange={handleTitleChange}
              label="Title"
              fullWidth
              placeholder="Your dish's name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              value={description}
              onChange={handleDescriptionChange}
              label="Description"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select labelId="category-label" value={category} onChange={handleCategoryChange}>
                {recipes.categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select labelId="tags-label" value={tags} onChange={handleTagsChange} multiple>
                {recipes.tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Reszta kodu */}
        </Grid>
      </form>
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        onClick={handleSubmitForm}
      >
        Submit
      </Button>
    </Container>
  )
}

export default AddRecipe
