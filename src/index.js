//import required packages
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db'); //import DB connection
const taskRoutes = require('./routes/taskRoutes');

//Load environment variables
dotenv.config();
connectDB(); //connect to MongoDB

//Initialise Express app
const app = express();

//Middleware
app.use(express.json()); //Allows JSON body parsing
app.use(cors()); //Enables CORS

//Routes
app.use('/api/tasks', taskRoutes);


//Define a test route
app.get('/',(req,res) => {
    res.send('Task Manager API is running...');
});


//Define the port from environment variables or use 5000
const PORT = process.env.PORT || 5000;

//Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

//Start the server
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});