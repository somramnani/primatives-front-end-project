import { useState } from "react";
import "./App.css";
import axios from "axios";
import Cards from "./components/Cards";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import Searchbar from "./components/Searchbar";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  /*
Original Code from interview:
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

  const [tokens, setToken] = useState([]);
  const [input, setInput] = useState("");
  let [loading, setLoading] = useState("none");

  const getData = async (params) => {
    if (input) setLoading("flex");
    setTimeout(() => {
      axios({
        headers: { "Content-Type": "application/json" },
        method: "get",
        url: `https://api-proxy-server-steel.vercel.app/api/${params}`,
      }).then(function (response) {
        let list = response.data.tokens.list;
        setToken(list);
        setLoading("none");
      });
    }, "500");
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setInput(value);
  };

  const clear = () => {
    setToken([]);
    setInput("");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    clear();
    getData(input);
  };

  return (
    <div className="body">
      <div className="App">
        <Searchbar
          input={input}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          clear={clear}
        />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
          sx={{ flexGrow: 1 }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <CircularProgress style={{ display: `${loading}` }} />
            {tokens.length === 0 ? (
              <div>No Results</div>
            ) : (
              tokens.map((token) => (
                <Grid key={token}>
                  <Cards
                    src={token.imageURL}
                    name={token.name}
                    address={token.address}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default App;
