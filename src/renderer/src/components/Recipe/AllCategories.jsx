import { useContext } from 'react'
import { RecipeDataContext } from '../../context/contextData'
import Box from '@mui/material/Box'

export default function MyComponent() {
  const { categoryNames, tagNames } = useContext(RecipeDataContext)

  // Iterate over the category names and display them in a box
  const renderCategories = () => {
    return categoryNames.map((category) => (
      <Box
        key={category.id}
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          marginBottom: '8px',
          width: 'fit-content'
        }}
      >
        {category.name}
      </Box>
    ))
  }

  const renderTags = () => {
    return tagNames.map((tag) => (
      <Box
        key={tag.id}
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          marginBottom: '8px',
          width: 'fit-content'
        }}
      >
        {tag.name}
      </Box>
    ))
  }

  return (
    <div>
      <h2>Categories</h2>
      {renderCategories()}
      <h2>Tags</h2>
      {renderTags()}
    </div>
  )
}
