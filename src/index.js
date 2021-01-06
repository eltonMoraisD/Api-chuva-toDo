const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3333;
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
