import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
    Mutation: {

      unfollowUser: protectResolver(async (_, { userName }, { loggedInUser }) => {
        const ok = await client.user.findUnique({ where: { userName } });

        if (!ok) {
          return {
            ok: false,
            error: "That user does not exist.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                userName,

              },
            },
          },
        });
        return {
          ok: true,
        };
      }),
    },
  };