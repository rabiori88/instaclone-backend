import client from "../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount : async (
            _, 
            { firstName, lastName, userName, email, password }
            ) => {
                
                try {

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
    
                    if(existingUser) {
                        throw new Error("This username/passwor is already taken")
    
                    }
    
                    const uglyPassword = await bcrypt.hash(password, 10);
                    return client.user.create({
                        data: {
                            userName,
                            email,
                            firstName,
                            lastName,
                            password: uglyPassword,
                        },
                    })           

                }   catch (e){
                    console.log(e);
                    return e;

                }                   
                // save and return the user


            }, 
    },
};