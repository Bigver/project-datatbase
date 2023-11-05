import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import studentRoutes from "./routers/student.js";
import totorRoutes from "./routers/tutor.js";
import postRoutes from "./routers/post.js";
import recordRoutes from "./routers/record.js";
import userRoutes from "./routers/userUpdate.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import updateTotorRoutes from "./routers/tutorUpdate.js";
import dotenv from "dotenv";
import uploadRouter from "./routers/upload.js";

dotenv.config();

const app = express();
const port = 3000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const connection = mysql.createConnection({
  host: 'brdzmfylp6d909rvbx69-mysql.services.clever-cloud.com',
  user: 'uhqnmjcw9vwendil',
  password: 'D5LwPORTgOBxS6foCTjY',
  database: 'brdzmfylp6d909rvbx69',
  port: '3306'
});

connection.connect((err) => {
if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
}
console.log('Connected to MySQL');
});


app.use("/api/student", studentRoutes);
app.use("/api/tutor", totorRoutes);
app.use("/api/post", postRoutes);
app.use("/api/apply", recordRoutes);
app.use("/api/updateUser", userRoutes);
app.use("/api/updateTutor", updateTotorRoutes);
app.use("/api/upload", uploadRouter);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});