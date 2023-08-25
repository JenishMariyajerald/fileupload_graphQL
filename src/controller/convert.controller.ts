import { Request, Response } from "express";
import { convertService } from "../service/convert.service";
import * as fs from 'fs';
// import * as path from 'path';
export const convertExcel = async (req: Request, res: Response) => {
    console.log('body\n\n\n\n\n\n', req.body, "\n\n\n\n\body");
    console.log('vino\n\n\n\n\n\n', req.file, "\n\n\n\nvino");

    try {
        if (req.file?.filename == null || req.file?.filename == undefined) {
            return await res.status(400).json("No file");
        } else {
            var filePath = req.file?.path;
            var fileName = req.file?.originalname;
            const read = await convertService(filePath,fileName);
            await fs.unlink(filePath, (err) => {
                if (err) throw err;
                console.log('file deleted successfully');
            });
            //         fs.rmdir('upload',{recursive:true},(err)=>{
            //     if(err) throw err;
            //     console.log('folder deleted successfully!!!');
            // })
            return res.status(200).json(read);

        }

    } catch (error) {
        res.status(400).send(error);
    }


}