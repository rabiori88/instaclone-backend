import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount : async (
            _, 
            { firstName, lastName, userName, email, password }
            ) => {
                
                const existingUser = await client.user.findFirst({
                    where: {
                      OR: [
                        {
                            userName,
                        },
                        {
                          email,
                        },
                      ],
                    },
                  });
                  console.log(existingUser);

                  if(existingUser) {
                            throw new Error("This username/passwor is already taken")
                  }

                  const uglyPassword = await bcrypt.hash(password, 10);
                  console.log(uglyPassword);

                  return client.user.create({
                                data: {
                                    userName,
                                    email,
                                    firstName,
                                    lastName,
                                    password:uglyPassword,
                                },
                            });
                             
                // try {

                   
                //     // // const existingUser = await client.user.findFirst({
                //     // //     where: {
                //     // //         OR: [
                //     // //             {
                //     // //                 userName,
                //     // //             }, 
                //     // //             { 
                //     // //                 email,
                //     // //             },
                //     // //         ],
                //     // //     },
                //     // // });
    
                //     // // if(existingUser) {
                //     // //     throw new Error("This username/passwor is already taken")
    
                //     // // }
                //     // // console.log(existingUser);
                //     // //return existingUser;
                //     // // const uglyPassword = await bcrypt.hash(password, 10);
                //     // // console.log(uglyPassword);
                //     // return client.user.create({
                //     //         data: {
                //     //             userName,
                //     //             email,
                //     //             firstName,
                //     //             lastName,
                //     //             password:uglyPassword,
                //     //         },
                //     //     });
                         

                // }   catch (e){
                //     ok: false
                //     return "Can't Create Account";

                // }                   
                // save and return the user
            }, 
            
    },
};