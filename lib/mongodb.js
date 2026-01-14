import mongoose from "mongoose";

export default async function connectDB() {
  // console.log(process.env.URLDB);
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB уже подключена");
    return;
  }

  try {
    await mongoose.connect(process.env.URLDB);
    console.log("MongoDB подключена");
  } catch (error) {
    console.error("Ошибка подключения MongoDB:", error);
    process.exit(1);
  }
}
