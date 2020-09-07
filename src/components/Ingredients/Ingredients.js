import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch("https://hooksproject-6adb7.firebaseio.com/ingredients.json")
      .then((res) => res.json())
      .then((resData) => {
        const loadedItems = [];
        for (let key in resData) {
          console.log(key);
          loadedItems.push({
            id: key,
            title: resData[key].item.title,
            amount: resData[key].item.amount,
          });
        }
        setUserIngredients(loadedItems);
      });
  }, []); //brackets are the second argument which defines how often this useEffect hook will be executed

  const filteredItems = useCallback((filtedItems) => {
    setUserIngredients(filtedItems);
  }, []);

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
        <Search onLoadItems={filteredItems} />
        <IngredientsList
          ingredients={userIngredients}
          onRemoveItem={() => {}}
        />
      </section>
    </div>
  );
};

export default Ingredients;
