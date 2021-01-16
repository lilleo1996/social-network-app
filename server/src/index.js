const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const usersRoute = require('./routes/users.route');
const loginRoute = require('./routes/login.route');

const app = express();
const port = 3000

app.use(bodyParser.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
