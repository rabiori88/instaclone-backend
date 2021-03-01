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
        movie(id: Int!): Movie
    }

    type Mutation {
        createMovie(title: String!, year: Int!, genre: String!): Movie
        deleteMovie(id: Int!): Movie
        updateMovie(id: Int!, year: Int!): Movie
    }
`;

const resolvers = {
    Query: {
        movies: () =>  client.movie.findMany(),
        movie: (_, {id}) => client.movie.findUnique({where : {id}}), 
      
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
           
        
        
        deleteMovie: (_, {id}) => client.movie.delete({where : {id}}),
        updateMovie: (_, {id, year}) => client.movie.update({where : {id}, data: {year}}),
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