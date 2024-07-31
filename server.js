import app from "./app.js";
import http from "http";


let server = http.createServer(app);

server.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${process.env.PORT}`);
});
