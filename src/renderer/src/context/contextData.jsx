import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const apiUrl = 'https://smakoowaapi.azurewebsites.net'

const TimeToMakeTier = {
  0: 'Up To 15 Min',
  1: 'From 15 To 30 Min',
  2: 'From 30 To 45 Min',
  3: 'From 45 To 60 Min',
  4: 'Over 60 Min'
}

const ServingsTier = {
  0: 'One Or Two',
  1: 'Two Or Three',
  2: 'Three Or Four',
  3: 'Four Or Five',
  4: 'Five Or Six',
  5: 'More Than Six'
}

export const RecipeDataContext = createContext()

const RecipeDataProvider = ({ children }) => {
  const [tagNames, setTagNames] = useState([])
  const [categoryNames, setCategoryNames] = useState([])
  const [timeToMakeTiers, setTimeToMakeTiers] = useState([])
  const [servingsTiers, setServingsTiers] = useState([])

  useEffect(() => {
    // Fetch tag names
    fetch(`${apiUrl}/api/Tags/GetAll`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.content)) {
          const tagNames = data.content.map((tag) => ({
            id: tag.id,
            name: tag.name
          }))
          setTagNames(tagNames)
        } else {
          console.error('Invalid tag data format:', data)
        }
      })
      .catch((error) => {
        console.error('Error fetching tags:', error)
      })

    // Fetch category names
    fetch(`${apiUrl}/api/Categories/GetAll`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.content)) {
          const categoryNames = data.content.map((category) => ({
            id: category.id,
            name: category.name
          }))
          setCategoryNames(categoryNames)
        } else {
          console.error('Invalid category data format:', data)
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })

    // Set timeToMakeTiers
    setTimeToMakeTiers(Object.values(TimeToMakeTier))

    // Set servingsTiers
    setServingsTiers(Object.values(ServingsTier))
  }, [])

  const getCategoryName = (categoryId) => {
    const category = categoryNames.find((category) => category.id === categoryId)
    return category ? category.name : ''
  }

  const getTagName = (tagId) => {
    const tag = tagNames.find((tag) => tag.id === tagId)
    return tag ? tag.name : ''
  }

  const contextValue = {
    tagNames,
    categoryNames,
    timeToMakeTiers,
    servingsTiers,
    getCategoryName,
    getTagName
  }

  return <RecipeDataContext.Provider value={contextValue}>{children}</RecipeDataContext.Provider>
}

RecipeDataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default RecipeDataProvider
