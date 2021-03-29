
import { makeExecutableSchema, loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";


// ** Menans 모든 폴더 안
// * Menans 모든 파일
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolovers = loadFilesSync(
    `${__dirname}/**/*.resolvers.js`
);
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolovers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;


