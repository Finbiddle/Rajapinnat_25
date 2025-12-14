const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/opiskelijat", require("./routes/opiskelijaRoutes"));
app.use("/api/opintojaksot", require("./routes/opintojaksoRoutes"));
app.use("/api/arvioinnit", require("./routes/arviointiRoutes"));

app.listen(process.env.PORT || 3000);
