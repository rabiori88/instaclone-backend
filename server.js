// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer} from 'apollo-server';
import { typeDefs, resolvers } from './schema'


// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// P104 에러가 날경우 아래 코드실행
//  run npx prisma migrate reset --preview-feature