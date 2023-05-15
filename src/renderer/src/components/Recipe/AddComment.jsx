import { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Typography } from '@mui/material'

const AddComment = ({ recipeId }) => {
  const [comment, setComment] = useState('')

  const [error, setError] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSendClick = async () => {
    try {
      const url = `https://smakoowaapi.azurewebsites.net/api/Comments/AddRecipeComment/${recipeId}`
      const tokenData = localStorage.getItem('user')
      const parsedTokenData = JSON.parse(tokenData)
      const userToken = parsedTokenData?.content?.token

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      const data = { content: comment }

      const response = await axios.post(url, data, { headers })

      if (response.data.successStatus) {
        console.log('Comment created.')
        window.location.reload()
      }
    } catch (error) {
      console.error('Error creating comment:', error)
      setError('Sign in to comment!', error)
    }
  }

  return (
    <div>
      <TextField
        label="Add a comment"
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
        fullWidth
        multiline
        rows={4}
      />
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleSendClick}>
        Send
      </Button>
    </div>
  )
}

export default AddComment
