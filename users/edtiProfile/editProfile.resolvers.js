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
                    let avatarUrl = null;

                    if(avatar) {
                        const {filename , createReadStream } = await avatar;
                        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
                        const readstream = createReadStream();
                        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
                        
                        readstream.pipe(writeStream);
                        avatarUrl = `http://localhost:5000/static/${newFilename}`;

                    }

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
                            ...(avatarUrl && { avatar: avatarUrl}),
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