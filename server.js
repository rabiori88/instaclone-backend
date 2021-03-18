// The ApolloServer constructor requires two parameters: your schema

require('dotenv').config();
import {ApolloServer} from "apollo-server";
import schema from "./schema"



const server = new ApolloServer({
  schema,
});



const PORT = process.env.PORT;


server
  .listen(PORT)
  .then(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});

// P104 에러가 날경우 아래 코드실행
//  run npx prisma migrate reset --preview-feature