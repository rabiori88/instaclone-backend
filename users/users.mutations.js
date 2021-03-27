import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            login: async(_, {userName,password}) => {
                // find user with args.username
                const user = await client.user.findFirst({where:{userName}})
                if(!user) {
                    return {
                        ok: false,
                        error: "user not found",
                    };
                }

                const passwordOk = await bcrypt.compare(password, user.password);
                if(!passwordOk){
                    return {
                        ok:false, 
                        error:"Incorrect password"
                    }
                }

                const token = await jwt.sign({id:user.id} ,process.env.SECRET_KEY);
                return {
                    ok:true,
                    token
                }

              
                // check password with args.password
                // issue a token and send it to the user

            }
    },
};