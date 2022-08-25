import { PrismaClient } from "@prisma/client"
import { languages } from "./data/programming-languages";
import { users } from "./data/users";
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.user.deleteMany({where: { username : {in: users.map(user => user.username)}}});
        console.log("Users deleted");

        // delete programming languages to start with fresh database
        await prisma.interest.deleteMany({where: { name : {in: languages.map(language => language.name)}}});
        
        // clear

        await prisma.user.createMany({data: users});
        console.log("Users created");

        await prisma.interest.createMany({data: languages});
        console.log("Added Langauges to Interests table"); 

    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

load();