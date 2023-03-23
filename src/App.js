import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Cards from "./components/Cards";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";

function App() {
  const [tokens, setToken] = useState([]);

  // function getData() {
  //   return axios.get("https://api.primitives.xyz/api/interview/tokens");
  // }
  // const data = Promise.all([getData()]);

  // useEffect(() => []);

  // Promise.all(getData()).then(function (data) {
  //   console.log(data[0].data.tokens.list);
  //   // setToken(data[0].data.tokens.list);
  // });

  const getData = async () =>
    axios({
      method: "POST",
      url: "https://api.primitives.xyz/api/interview/searchTokens",
      params: { q: "Not Bored Apes" },
    }).then(function (response) {
      const list = response.data.tokens.list;
      setToken(list);
    });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
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
