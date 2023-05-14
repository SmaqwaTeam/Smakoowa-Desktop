import { useEffect, useState } from 'react'
import axios from 'axios'

const TagsList = () => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('https://smakoowaapi.azurewebsites.net/api/Tags/GetAll')
        setTags(response.data.content)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }

    fetchTags()
  }, [])

  return (
    <div>
      <h1>Tags List</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            ID: {tag.id}, Name: {tag.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagsList
