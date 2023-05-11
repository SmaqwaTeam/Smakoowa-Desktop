import axios from 'axios'

const apiUrl = 'https://smakoowaapi.azurewebsites.net'

const recipes = {
  categories: [],
  tags: []
}

async function getCategories() {
  try {
    const res = await axios.get(`${apiUrl}/api/Categories/GetAll`)
    const categories = res.data.content

    categories.forEach((category) => {
      // Dodaj kategorię do listy recipes.categories
      recipes.categories.push(category)
    })
  } catch (error) {
    console.log(error)
  }
}

async function getTags() {
  try {
    const res = await axios.get(`${apiUrl}/api/Tags/GetAll`)
    const tags = res.data.content

    tags.forEach((tag) => {
      // Dodaj tag do listy recipes.tags
      recipes.tags.push(tag)
    })
  } catch (error) {
    console.log(error)
  }
}

export { recipes, getCategories, getTags }
