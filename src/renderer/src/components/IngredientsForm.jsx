import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Card, CardContent, Grid, TextField, Button } from '@mui/material'

const IngredientsForm = ({ propingredients }) => {
  const [ingredient, setIngredient] = useState('')
  const [ingredientId, setIngredientId] = useState(1)
  const [ingredientGroupId] = useState(1)
  const [ingredientsList, setIngredientsList] = useState([])

  useEffect(() => {
    sendToParent()
  }, [])

  useEffect(() => {
    if (propingredients != null) {
      setIngredientsList(propingredients)
    }
  }, [propingredients])

  const sendToParent = () => {
    const eventData = {
      ingredientsList: ingredientsList
    }
    window.api.send('ingredientsdata', eventData)
  }

  const addIngredient = () => {
    const newIngredient = {
      name: ingredient,
      position: ingredientId,
      group: ingredientGroupId
    }

    setIngredientsList([...ingredientsList, newIngredient])
    setIngredient('')
    setIngredientId((prevId) => prevId + 1)
  }

  const deleteIngredient = (id) => {
    const updatedList = ingredientsList.filter((ing) => ing.position !== id)
    setIngredientsList(updatedList)
  }

  return (
    <div>
      {ingredientsList.map((ing) => (
        <Card key={ing.position} className="p-3 border-2 rounded-lg border-orange-500 my-3">
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <div>Recipe {ing.position}</div>
              </Grid>
              <Grid item xs={8}>
                <div>{ing.name}</div>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteIngredient(ing.position)}
                >
                  X
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <div className="flex flex-row my-5 gap-2 items-center">
        <div className="flex-auto w-1/2 border-2 border-orange-300">
          <TextField
            fullWidth
            variant="outlined"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Add another ingredient"
          />
        </div>
        <div className="flex-auto">
          <Button variant="contained" color="primary" onClick={addIngredient}>
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

IngredientsForm.propTypes = {
  propingredients: PropTypes.array
}

export default IngredientsForm
