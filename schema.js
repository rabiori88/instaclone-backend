
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";


// ** Menans 모든 폴더 안
// * Menans 모든 파일
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolovers = loadFilesSync(
    `${__dirname}/**/*.resolvers.js`
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolovers);




