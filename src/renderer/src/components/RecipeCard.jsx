import PropTypes from 'prop-types'

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img className="recipe-image" src={recipe.imageUrl} alt={recipe.title} />
      <div className="recipe-info">
        <h2>{recipe.title}</h2>
        <ul>
          {recipe.tags.map((tag) => (
            <li key={tag}>
              <a href="#">{tag}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default RecipeCard
