import { Express } from "express";
import { convertExcel } from "../controller/convert.controller";
import multer from 'multer';

// const storage = multer.memoryStorage();
var upload = multer({ dest: "upload/" });

const convertRoute = (app:Express) =>{
app.post("/api/convert",upload.single('file'),convertExcel)
};

export default convertRoute;