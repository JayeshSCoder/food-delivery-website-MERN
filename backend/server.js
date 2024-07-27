import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";



//app Config
const app = express();
const port = 4000;




//middleware
app.use(express.json());
app.use(cors());




// db connection
connectDB();




// API endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);



app.get("/", (request, response) => {
    response.send("API Working");
})






app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});



// mongodb+srv://jayeshschaudhari:jayesh261203@cluster0.fnoyvav.mongodb.net/?