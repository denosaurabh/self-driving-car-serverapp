const app = require("express")();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.use(cors());
app.use("*", cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success"
  });
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Main Server is listening for reqests on port ${port}....`);
});

const io = require("socket.io").listen(server);

// Emiting and Waiting for Events for Car
io.on("connection", socket => {
  // Getting and Sending small data about Device
  const handshakeData = socket.request;
  let info = `device:${handshakeData._query["device"]} ID: ${socket.id}`;
  console.log(info)
  
  socket.on("movement", data => {
    console.log(`Sending data to Car to move ${data}`);
    io.emit("moveCar", data);
  });
});
