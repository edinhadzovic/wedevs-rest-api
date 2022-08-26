import { Prisma } from "@prisma/client";

export const findUsersWithSameInterestsQuery = (id: string, interest: string[]): Prisma.UserFindManyArgs => ({
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
  });