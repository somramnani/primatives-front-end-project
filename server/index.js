const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get('/api/:nft', async (req, res) => {
 await axios({
    headers: {'Content-Type': 'application/json'},
    method: 'post',
    url: "https://api.primitives.xyz/api/interview/searchTokens",
    data: {
      query: req.params.nft
    }
  }).then(function(response){
    res.json(response.data)
  })
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
