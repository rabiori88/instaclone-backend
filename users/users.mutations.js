import client from "../client";


export default {
    Mutation: {
        createAccount : async (
            _, 
            { firstName, lastName, userName, email, password }
            ) => {
                // Check if username or Email are already on DB.

                
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                userName,
                            }, 
                            { 
                                email,
                            }
                        ],
                    },
                });

                console.log(existingUser);
                
                // hash Password
                // save and return the user


            }, 
    },
};