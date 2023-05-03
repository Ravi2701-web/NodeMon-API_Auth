import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();
console.log("Port value is", process.env.PORT);

/*app.listen(4000, () => {
  console.log("Server is working");
});*/

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on ${process.env.PORT} in ${process.env.NODE_ENV} Mode `
  );
});
