import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const apiUrl = 'https://smakoowaapi.azurewebsites.net'

const TimeToMakeTier = {
  UpTo15Min: 'UpTo15Min',
  From15To30Min: 'From15To30Min',
  From30To45Min: 'From30To45Min',
  From45To60Min: 'From45To60Min',
  Over60Min: 'Over60Min'
}

const ServingsTier = {
  OneOrTwo: 'OneOrTwo',
  TwoOrThree: 'TwoOrThree',
  ThreeOrFour: 'ThreeOrFour',
  FourOrFive: 'FourOrFive',
  FiveOrSix: 'FiveOrSix',
  MoreThanSix: 'MoreThanSix'
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
