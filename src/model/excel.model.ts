
import mongoose, { Document } from "mongoose";

interface ExcelRecord {
    House_Age_years: number;
    Distance_to_Station_meters: number;
    Price_per_Square_Foot: number;
    Sum?: string;
}

interface ExcelSheet extends Document {
    fileName: string;
    Sheet1: ExcelRecord[];
}

const excelSchema = new mongoose.Schema<ExcelSheet>({
    fileName: { type: String, required: true },
    Sheet1: [
        {
            House_Age_years: { type: Number, required: true },
            Distance_to_Station_meters: { type: Number, required: true },
            Price_per_Square_Foot: { type: Number, required: true },
            Sum: String
        }
    ]
});

const excelModel = mongoose.model<ExcelSheet>("Excel", excelSchema);
export default excelModel;
