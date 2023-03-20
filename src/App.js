import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tokens, setToken] = useState("");

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
      method: "get",
      url: "https://api.primitives.xyz/api/interview/tokens",
    }).then(function (response) {
      const list = response.data.tokens.list;
      console.log(list);
      setToken(list);
    });

  useEffect(() => {
    getData();
  });
  console.log(tokens);

  return (
    <div>
      {tokens.map((token) => (
        <>
          <img src={token.imageURL} />
          <h1>{token.name}</h1>
          <p>Address: {token.address}</p>
        </>
      ))}
    </div>
  );
}

export default App;
