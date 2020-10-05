const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);
app.listen(PORT, () => console.log(`server run at port ${PORT}`));
