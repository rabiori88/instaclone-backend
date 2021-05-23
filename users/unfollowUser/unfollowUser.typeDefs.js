import { gql } from "apollo-server";

export default gql`
  type UnfollowUserResult {
    ok: Boolean!
    error: String
  }
<<<<<<< HEAD
  type Mutation {
    unfollowUser(userName: String): UnfollowUserResult
=======

  type Mutation {
    unfollowUser(username: String): UnfollowUserResult
>>>>>>> JS_Version_4.12
  }
`;