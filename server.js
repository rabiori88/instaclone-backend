// The ApolloServer constructor requires two parameters: your schema
import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';


const client =  new PrismaClient();


const typeDefs = gql`

    type Movie {
        id: Int
        title: String
        year: Int
        genre: String
        createdAt: String
        updatedAt: String

       
    }


    type Query {
        movies: [Movie]
        movie: Movie
    }

    type Mutation {
        createMovie(title: String!, year: Int!, genre: String!): Movie
        deleteMovie(title: String!): Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () =>  client.movie.findMany(),
        movie: () => 
        {
            ({title: "Hello", year: 2021}),
            console.log("movie Test");
        }
      
    },
    Mutation: {
        createMovie: (_, {title, year, genre}) => 
            client.movie.create({
                data:{
                    title,
                    year,
                    genre
                },     
            }), 
        
        deleteMovie: (_, {title}) => {
            console.log(title);
            return true
        },
    },
  };

// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// P104 에러가 날경우 아래 코드실행
//  run npx prisma migrate reset --preview-feature