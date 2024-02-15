import express from 'express';
import bodyParser from 'body-parser';
import employeeRoutes from "./routes/employeeRoutes";
import sequelize from './config/database';
import Employee from './models/employee';


const cors=require('cors');
const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use('/api',employeeRoutes)
app.use((req,res)=>{
  res.status(400).json({errorMessage:"Not Found"})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize.sync({force:false}).then( () => {
  console.log('Database and tables synced');
})

