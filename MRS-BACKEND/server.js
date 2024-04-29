const express = require('express');
const cors = require('cors');



const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "WHAT THE HAILL" });
});

// Require and use the routes module, passing the app instance
require("./routes/routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});