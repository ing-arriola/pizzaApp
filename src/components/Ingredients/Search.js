import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadItems } = props;
  const [filterEntered, setFilter] = useState("");

  useEffect(() => {
    const query =
      filterEntered.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${filterEntered}"`;
    fetch("https://hooksproject-6adb7.firebaseio.com/ingredients.json" + query)
      .then((res) => res.json())
      .then((resData) => {
        const loadedItems = [];
        for (let key in resData) {
          loadedItems.push({
            id: key,
            title: resData[key].item.title,
            amount: resData[key].item.amount,
          });
        }
        onLoadItems(loadedItems);
      });
  }, [filterEntered, onLoadItems]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filterEntered}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
