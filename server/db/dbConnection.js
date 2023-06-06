import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:1234@cluster0.zcb2jdh.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected To MongoDB ==> OK");
        // console.log("Connected To MongoDB ==>", connect.connection.host);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// mongoose.connection.on('disconnected', () => {
//     console.log('[Listener] ==> MongoDB Disconnected...');
// })
// mongoose.connection.on('connected', () => {
//     console.log('[Listener] ==> MongoDB Connected...');
// })

export default dbConnection;