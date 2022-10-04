import React from "react";
import "./availability.css";

const Search = (props) => {
  if (props.hasSearched) {
    return (
      <button className="buttonSearchagain" onClick={props.onSearchAgain}>
        Search Again
      </button>
    );
  }
  return (
    <div className="Search">
      <form className="input">
        <input
          type="text"
          placeholder="Enter a Carpark number or Adress..."
          onChange={props.handleUserInput}
        ></input>
        <button
          className="buttonSearch"
          type="submit"
          onClick={props.handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
