import mongoose from "mongoose";
import config from '../config/default';

const url = config.URL

const dbConnection = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to Db')
    } catch (error) {
        console.log('Could not conect to db')
    }
};

export default dbConnection;