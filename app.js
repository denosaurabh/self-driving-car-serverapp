const app = require("express")();
const cors = require("cors");
const moniter = require("socket.io-monitor");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Setting Template Engine as React
// app.set("views", __dirname + "/");
// app.set("view engine", "jsx");
// app.engine("jsx", require("express-react-views").createEngine());

//app.use(cors());
//app.use("*", cors());

// app.get("/", (req, res) => {
//   res.render("index", {
//     happening: "Web is sending Data to car Move Forward"
//   });
// });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Main Server is listening for reqests on port ${port}....`);
});

const io = require("socket.io").listen(server);

// Binding Moniter to get data
const { emitter } = moniter.bind(io, { server: false });

// Emiting and Waiting for Events for Car
io.on("connection", socket => {
  // // Pc and Car ids
  // let Web_ID;
  // let Car_ID;

  // Getting and Sending small data about Device
  const handshakeData = socket.request;
  let info = `device:${handshakeData._query["device"]} ID: ${socket.id}`;
  console.log(info);

  // Getting Data by monitering
  const devices = emitter.getState().then(data => {
    console.log(data.sockets);
    socket.broadcast.emit("devices", data.sockets);
  });

  // ======================== Listening
  // Listening for Ids and Sending theis Ids vice-versa

  socket.on("id_computer", id => {
    console.log("Received pc id: " + id);
    io.emit("Gimme_WebID", id);
  });

  socket.on("id_RaspberryPI__Car", id => {
    console.log("Received Car id: " + id);
    io.emit("Gimme_CarID", id);
  });

  // Listening for Events
  socket.on("moveforOrBack", data => {
    console.log(`Sending data to Car to move ${data}`);
    io.emit("moveCarForOrBack", data);
    
    // res.render("index", {
    //   happening: "Web is sending Data to car Move Forward"
    // });  
  });
  
  socket.on("moveleftOrRight", data => {
    console.log(`Sending data to Car to move ${data}`);
    io.emit("moveCarleftOrRight", data);
    
    // res.render("index", {
    //   happening: "Web is sending Data to car Move Forward"
    // });  
  });
  
  socket.on("moveAngleCar", data => {
    console.log(`Sending data to Car to move ${data}`);
    io.emit("moveCarAtAngle", data);
    
    // res.render("index", {
    //   happening: "Web is sending Data to car Move Forward"
    // });  
  });
  
  io.on("moveleftOrRight", data => {
    console.log(`Sending data to Car to move ${data}`);
    io.emit("moveCarleftOrRight", data);
    
    // res.render("index", {
    //   happening: "Web is sending Data to car Move Forward"
    // });  
  });

  
});
