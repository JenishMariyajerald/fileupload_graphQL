import express from 'express';
import cors from 'cors';
import {graphqlHTTP} from 'express-graphql';
import GraphQLSchema from './model/graphQl.schema';
import config from './config/default';
import dbConnection from './utils/connectToDB';
import convertRoute from './routes/convert';

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: GraphQLSchema, 
    
    graphiql: true,
  })
);
app.listen(PORT,async()=>{
  console.log(`app is listening on port ${PORT}`);
  await dbConnection();
  convertRoute(app);
})