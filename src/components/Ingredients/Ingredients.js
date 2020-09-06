import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (item) => {
    fetch("https://hooksproject-6adb7.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify({ item }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUserIngredients((prevItems) => [
          ...prevItems,
          { id: res.name, ...item },
        ]);
      });
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
