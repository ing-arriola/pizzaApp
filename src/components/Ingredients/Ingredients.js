import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (item) => {
    setUserIngredients((prevItems) => [
      ...prevItems,
      { id: Math.random().toString(), ...item },
    ]);
  };
  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientsList
          ingredients={userIngredients}
          onRemoveItem={() => {}}
        />
      </section>
    </div>
  );
};

export default Ingredients;
