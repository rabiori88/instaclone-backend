import client from "../../client";

import bcrypt from "bcrypt";

export default {
    Mutation: {
        edtiProfile: async (
            _ , 
            {             
                firstName,
                lastName,
                userName,
                email,
                password: newPassword,
                                
            },
            { loggedInUser }
            )=> {
                
               console.log(loggedInUser);
                let uglyPassword = null;
                if(newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }

                const ok =  await client.user.update({
                    where :{
                     id: loggedInUser.id,
                    }, 
                    data:{
                        firstName, 
                        lastName, 
                        userName, 
                        email, 
                        ...(uglyPassword && { password: uglyPassword }),
                    },
                });

                 if (ok) {
                    return {
                        ok: true,
                        error: "success",
                    }
                    
                } else 
                {
                    return {
                        ok: false,
                        error: "Could not update Profile",
                        
                    }
                }
            }

           
    },
};