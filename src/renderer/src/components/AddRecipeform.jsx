import { useState } from 'react'
import axios from 'axios'
import authService from '../services/auth-service'
import { TextField, Button, Slider, FormControl, FormLabel, FormGroup } from '@mui/material'

const AddRecipeForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [servingsTier, setServingsTier] = useState(0)
  const [timeToMakeTier, setTimeToMakeTier] = useState(0)
  const [categoryId, setCategoryId] = useState(0)
  const [tagIds, setTagIds] = useState([0])
  const [ingredients, setIngredients] = useState([{ name: '', position: 0, group: 0 }])
  const [instructions, setInstructions] = useState([{ content: '', position: 0 }])

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
    } catch (error) {
      console.error('Error adding recipe:', error)
      console.log('Response data:', error.response.data)
      console.log('Response status:', error.response.status)
      console.log('Response headers:', error.response.headers)
    }
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
          <FormLabel>Time to Make Tier</FormLabel>
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
          label="Category ID"
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Tag IDs (comma-separated)"
          value={tagIds.join(',')}
          onChange={(e) => setTagIds(e.target.value.split(',').map(Number))}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <FormLabel>Ingredients:</FormLabel>
        {ingredients.map((ingredient, index) => (
          <FormGroup key={index}>
            <TextField
              label="Name"
              value={ingredient.name}
              onChange={(e) => {
                const updatedIngredients = [...ingredients]
                updatedIngredients[index].name = e.target.value
                setIngredients(updatedIngredients)
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Position"
              type="number"
              value={ingredient.position}
              onChange={(e) => {
                const updatedIngredients = [...ingredients]
                updatedIngredients[index].position = Number(e.target.value)
                setIngredients(updatedIngredients)
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Group"
              type="number"
              value={ingredient.group}
              onChange={(e) => {
                const updatedIngredients = [...ingredients]
                updatedIngredients[index].group = Number(e.target.value)
                setIngredients(updatedIngredients)
              }}
              fullWidth
              margin="normal"
            />
          </FormGroup>
        ))}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            const newIngredient = { name: '', position: 0, group: 0 }
            setIngredients([...ingredients, newIngredient])
          }}
        >
          Add Ingredient
        </Button>
      </div>
      <div>
        <FormLabel>Instructions:</FormLabel>
        {instructions.map((instruction, index) => (
          <FormGroup key={index}>
            <TextField
              label="Content"
              value={instruction.content}
              onChange={(e) => {
                const updatedInstructions = [...instructions]
                updatedInstructions[index].content = e.target.value
                setInstructions(updatedInstructions)
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Position"
              type="number"
              value={instruction.position}
              onChange={(e) => {
                const updatedInstructions = [...instructions]
                updatedInstructions[index].position = Number(e.target.value)
                setInstructions(updatedInstructions)
              }}
              fullWidth
              margin="normal"
            />
          </FormGroup>
        ))}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            const newInstruction = { content: '', position: 0 }
            setInstructions([...instructions, newInstruction])
          }}
        >
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
