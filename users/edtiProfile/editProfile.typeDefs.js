import { gql } from "apollo-server";

export default gql`
    
    type EdtiProfileResult {
        ok: Boolean!        
        error: String
    }

    type Mutation {       
        edtiProfile( 
            firstName: String
            lastName: String
            userName: String
            email: String
            password: String
        ): EdtiProfileResult!
    }
   
`