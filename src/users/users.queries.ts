import { Prisma } from "@prisma/client";

export const findUsersWithSameInterestsQuery = (id: string, interest: string[]) => ({
    include: {
      interests: true,
      followers: {
        where: {
          followerId: id
        }
      }
    }, 
    where: { 
      interests: {
         some: {
           interestId: {
            in: interest
          }
        }
      }, id: {
        not: id
      }
    },
  } as Prisma.UserFindManyArgs);