import { makeExecutableSchema } from "apollo-server";
import { loadFilesSync, mergeResolvers, mergeType } from "graphql-tools";


// ** Menans 모든 폴더 안
// * Menans 모든 파일
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolovers = loadFilesSync(
    `${__dirname}/**/*.{queries, mutations}.js`
);
const typeDefs = mergeType(loadedTypes);
const resolvers = mergeResolvers(loadedResolovers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;


