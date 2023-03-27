import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import Searchbar from "./components/Searchbar";

function App() {
  const [tokens, setToken] = useState([]);
  const [input, setInput] = useState("");
  
/*
  function getData() {
    return axios.get("https://api.primitives.xyz/api/interview/tokens");
  }
  const data = Promise.all([getData()]);

  Promise.all(getData()).then(function (data) {
    console.log(data[0].data.tokens.list);
    // setToken(data[0].data.tokens.list);
  });

  useEffect(() => {
    getData("");
  }, []);
  */

  const getData = (params) => 
    fetch(`https://primatives-front-end-project.vercel.app/${encodeURIComponent(params)}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      console.log(response)
      return response.json();
    }).then(tokenList => {
      const list = tokenList.tokens.list;
      setToken(list);
      console.log(tokens);
    });

  

  
 

  const handleOnChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setInput(value);
    console.log(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getData(input);
  };
 
  const clear = () => {
    window.location.reload(false);
  };

  return (
    <div className="App">
      <Searchbar
        input={input}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        clear={clear}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {tokens.map((token) => (
            <Grid>
              <Cards
                src={token.imageURL}
                name={token.name}
                address={token.address}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
