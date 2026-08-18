import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;


console.log("About to start server...");
console.log("PORT:", port);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});