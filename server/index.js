const connectToMongo=require("./utils/db.js");
const express = require('express')
const userRoutes=require('./routes/auth');
const notesRoutes=require('./routes/notes.js');
connectToMongo();
const app = express();
const port = process.env.port;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',userRoutes);
app.use('/api/notes',notesRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
