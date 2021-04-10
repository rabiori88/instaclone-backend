// The ApolloServer constructor requires two parameters: your schema

require('dotenv').config();
import {ApolloServer} from "apollo-server";
import schema from "./schema"
import { getUser, protectResolver } from "./users/users.utils";


const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});


server
  .listen(PORT)
  .then(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});

// P104 에러가 날경우 아래 코드실행
//  run npx prisma migrate reset --preview-feature
