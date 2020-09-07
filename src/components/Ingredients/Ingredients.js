import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";

const Ingredients = (props) => {
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
            title: resData[key].title,
            amount: resData[key].amount,
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
      body: JSON.stringify(item),
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

  const removeItem = (itemId) => {
    fetch(
      `https://hooksproject-6adb7.firebaseio.com/ingredients/${itemId}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      setUserIngredients((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    });
  };

  return (
    <div className="App">
      <IngredientForm addIngredient={removeItem} />

      <section>
        <Search onLoadItems={filteredItems} />
        <IngredientsList
          ingredients={userIngredients}
          onRemoveItem={removeItem}
        />
      </section>
    </div>
  );
};

export default Ingredients;
