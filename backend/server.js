// require("dotenv").config();
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();

// connectDB();

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use("/api/auth", require("./routes/authRoute"));
// app.use("/api/admin", require("./routes/adminRoute"));
// app.use("/api/certificates", require("./routes/certificateRoute"));

// app.listen(5000, () => console.log("Server running on 5000"));


require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://yourfrontend.vercel.app",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/certificates", require("./routes/certificateRoute"));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);