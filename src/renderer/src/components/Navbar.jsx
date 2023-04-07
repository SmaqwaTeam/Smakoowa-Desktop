import { useState } from 'react'
function Navbar() {
    const [versions] = useState(window.electron.process.versions)
    return (
      <ul className='flex'>
        <li><a href="#">Home</a></li>
        <li><a href="#">Recipes</a></li>
        <li><a href="#">Favorites</a></li>
      </ul>
  )
}
export default Navbar