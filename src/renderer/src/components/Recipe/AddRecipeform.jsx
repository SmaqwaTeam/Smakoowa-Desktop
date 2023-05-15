import { useState, useContext } from 'react'
import axios from 'axios'
import authService from '../../services/auth-service'
import {
  TextField,
  Button,
  Slider,
  FormControl,
  FormLabel,
  FormGroup,
  MenuItem
} from '@mui/material'
import { RecipeDataContext } from '../../context/contextData'

const AddRecipeForm = () => {
  const { categoryNames, tagNames, timeToMakeTiers, servingsTiers } = useContext(RecipeDataContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [servingsTier, setServingsTier] = useState(0)
  const [timeToMakeTier, setTimeToMakeTier] = useState(0)
  const [categoryId, setCategoryId] = useState(0)
  const [tagIds, setTagIds] = useState(new Set())
  const [ingredients, setIngredients] = useState([{ name: '', position: 1, group: 1 }])
  const [instructions, setInstructions] = useState([{ content: '', position: 1 }])

  const getCategoryName = (categoryId) => {
    const category = categoryNames.find((category) => category.id === categoryId)
    return category ? category.name : ''
  }

  const getTagName = (tagId) => {
    const tag = tagNames.find((tag) => tag.id === tagId)
    return tag ? tag.name : ''
  }

  const handleTagChange = (event) => {
    const selectedTagIds = Array.isArray(event.target.value)
      ? event.target.value
      : [event.target.value]
    setTagIds(selectedTagIds)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const recipeData = {
      name,
      description,
      servingsTier,
      timeToMakeTier,
      categoryId,
      tagIds,
      ingredients,
      instructions
    }

    try {
      const token = authService.getToken()
      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }

      await axios.post('https://smakoowaapi.azurewebsites.net/api/Recipes/Create', recipeData, {
        headers: headers,
        withCredentials: true
      })

      console.log('Recipe added successfully!')
      window.location.href = '/'
    } catch (error) {
      console.error('Error adding recipe:')
    }
  }
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][field] = value
    setIngredients(updatedIngredients)
  }

  const handleInstructionChange = (index, field, value) => {
    const updatedInstructions = [...instructions]
    updatedInstructions[index][field] = value
    setInstructions(updatedInstructions)
  }

  const handleAddIngredient = () => {
    const newIngredient = { name: '', group: 1, position: 1 }
    setIngredients([...ingredients, newIngredient])
  }

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients.splice(index, 1)
    setIngredients(updatedIngredients)
  }

  const handleAddInstruction = () => {
    const newInstruction = { content: '', position: 1 }
    setInstructions([...instructions, newInstruction])
  }

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...instructions]
    updatedInstructions.splice(index, 1)
    setInstructions(updatedInstructions)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <FormControl fullWidth margin="normal">
          <FormLabel>Servings Tier</FormLabel>
          <Slider
            value={servingsTier}
            onChange={(e, value) => setServingsTier(value)}
            marks
            min={0}
            max={4}
            step={1}
            valueLabelDisplay="auto"
          />
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth margin="normal">
          <FormLabel>Time to Make Tier</FormLabel>{' '}
          <Slider
            value={timeToMakeTier}
            onChange={(e, value) => setTimeToMakeTier(value)}
            marks
            min={0}
            max={5}
            step={1}
            valueLabelDisplay="auto"
          />
        </FormControl>
      </div>
      <div>
        <TextField
          label="Category"
          select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          fullWidth
          margin="normal"
        >
          {categoryNames.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          label="Tags"
          select
          multiple
          value={[...tagIds]}
          onChange={handleTagChange}
          fullWidth
          margin="normal"
          renderValue={(selected) => selected.map((tagId) => getTagName(tagId)).join(', ')}
        >
          {tagNames.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <FormLabel>Ingredients:</FormLabel>
        {ingredients.map((ingredient, index) => (
          <FormGroup key={index}>
            <TextField
              label="Ingredient"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveIngredient(index)}
            >
              Remove Ingredient
            </Button>
          </FormGroup>
        ))}
        <Button variant="outlined" color="primary" onClick={handleAddIngredient}>
          Add Ingredient
        </Button>
      </div>
      <div>
        <FormLabel>Instructions:</FormLabel>
        {instructions.map((instruction, index) => (
          <FormGroup key={index}>
            <TextField
              label="Instruction"
              value={instruction.content}
              onChange={(e) => handleInstructionChange(index, 'content', e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveInstruction(index)}
            >
              Remove Instruction
            </Button>
          </FormGroup>
        ))}
        <Button variant="outlined" color="primary" onClick={handleAddInstruction}>
          Add Instruction
        </Button>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Recipe
      </Button>
    </form>
  )
}

export default AddRecipeForm
