import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import "./ProductsSearch.css";

function App() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <div className="search mt-4">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List searchQuery={inputText} />
    </div>
  );
}

export default App;
