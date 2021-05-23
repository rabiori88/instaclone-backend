import client from "../../client"

export default {
    Query: {
        seeFollowers: async(_, {userName, page}) => {
            //Follower이름으로 찾기
            const followers = await client.user.findUnique({where:{userName}}).followers({
                take: 5,
                skip:(page - 1 ) * 5

            });
            return {
                ok:true,
                followers
            }
            console.log(aFollowers.length);
            
            //Following 한 사람으로 찾기
            // const bFollowers = await client.user.findMany({
            //     where: {
            //         following: {
            //             some: {
            //                 userName,
            //             },
            //         }
            //     }
            // });
            
            // console.log(bFollowers.length)
        }
    }
}