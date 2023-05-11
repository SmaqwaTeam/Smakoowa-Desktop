import axios from 'axios'
const apiUrl = 'https://smakoowaapi.azurewebsites.net'

const handleSubmitForm = async (
  title,
  description,
  servings,
  timetomake,
  category,
  tags,
  ingredients,
  instructions
) => {
  const payload = {
    name: title,
    description: description,
    servingsTier: servings,
    timeToMakeTier: timetomake,
    categoryId: category,
    tagIds: tags,
    ingredients: ingredients,
    instructions: instructions
  }

  try {
    const response = await axios.post(`${apiUrl}/api/Recipes/Create`, payload, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'text/plain',
        Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
    })

    const data = response.data
    console.log(data)

    if (data.successStatus) {
      console.log(data.message)
      // Przekierowanie do '/profile' po pomyślnym dodaniu przepisu
      // Możesz użyć odpowiedniej metody do przekierowania, np. this.$router.push('/profile') dla frameworka Vue.js
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

export default handleSubmitForm
