import DocumentModel from '../model/excel.model';
import excelToJson from 'convert-excel-to-json';
export const convertService = async (req: string,fileName:string) => {
    try {
        const excelData = await excelToJson({
            sourceFile: req,
            header: {
                rows: 1
            },
            columnToKey: {
                "*": "{{columnHeader}}"
            }
        });
var filed = {
    fileName:fileName,
    ...excelData
}
        await console.log('excelData', excelData);
        return await DocumentModel.create(filed);

    } catch (error: any) {
        throw new Error(error);
    }
}