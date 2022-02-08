import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose.connect(process.env.DB_CONNECTION);

  console.log("DATABASE ONLINE");
};

export default dbConnection;
