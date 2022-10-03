import React from "react";

const Search = (props) => {
  return (
    <div className="Search">
      <form className="input">
        <input
          type="text"
          placeholder="Enter a Carpark number..."
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
