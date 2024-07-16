import React from 'react';

export const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
