import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLString } from 'graphql';
import ExcelJS from 'exceljs';
import excelModel from './excel.model';
// import * as fs from 'fs';
import * as path from 'path';
const RowType = new GraphQLObjectType({
    name: 'Row',
    fields: () => ({
        House_Age_years: { type: GraphQLFloat },
        Distance_to_Station_meters: { type: GraphQLFloat },
        Price_per_Square_Foot: { type: GraphQLFloat },
        Sum: { type: GraphQLString },
    }),
});

const ExcelDataType = new GraphQLObjectType({
    name: 'ExcelData',
    fields: () => ({
        fileName: { type: GraphQLString },
        Sheet1: { type: new GraphQLList(RowType) },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getJsonData: {
            type: ExcelDataType,
            async resolve(parent, args) {
                try {
                    const data = await excelModel.findOne({ fileName: 'Book1.xlsx' }); // Assuming 'fileName' is unique
                    console.log('maxwell', data)
                    if (!data) {
                        throw new Error('Data not found');
                    }
                    const jsonData = data.Sheet1
                    console.log('jsonData', jsonData)
                    const workbook = new ExcelJS.Workbook();
                    const worksheet = workbook.addWorksheet('Sheet1');
                    await worksheet.addRows(jsonData);
                    // const filePath = data.fileName;
                    const outputPath = path.join(`${process.cwd()}/upload`, `${data.fileName}`);
                    console.log('outputPath', outputPath)

                    workbook.xlsx.writeFile(outputPath)
                        .then(() => {
                            console.log(`Excel file "${outputPath}" created successfully!`);
                        })
                        .catch(error => {
                            console.error('Error creating Excel file:', error);
                        });
                    return data;
                } catch (error) {
                    throw error;
                }
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});
