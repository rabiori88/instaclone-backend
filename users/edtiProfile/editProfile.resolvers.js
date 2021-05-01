import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";


export default {
    Mutation: {
        edtiProfile: protectResolver(
            async (
                _ , 
                {             
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: newPassword,
                    bio,
                    avatar, 
                },
                { loggedInUser }
                )=> {      
                    const {filename , createReadStream } = await avatar;
                    const readstream = createReadStream();
                    const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);
                    
                    readstream.pipe(writeStream);

                    console.log(readstream);
                   // console.log(filename, createReadStream);               
                  
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
                            bio,
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
        ) ,

           
    },
};