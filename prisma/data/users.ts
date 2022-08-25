import { User } from "@prisma/client";
import cuid from "cuid";

export const users: User[] = [
    {
        id: cuid(),
        nodeId: cuid(),
        username: "johnDoe",
        email: "johndoe@go.com",
        displayName: "John Doe",
        profileUrl: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        bio: "Mars & Cars, Chips & Dips",
        provider: "github",
        newUser: true,
        avatar: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: cuid(),
        nodeId: cuid(),
        username: "johnDoe2",
        email: "johndoe2@go.com",
        displayName: "John Doe",
        profileUrl: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        bio: "Mars & Cars, Chips & Dips",
        provider: "github",
        newUser: true,
        avatar: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: cuid(),
        nodeId: cuid(),
        username: "johnDoe3",
        email: "johndoe3@go.com",
        displayName: "John Doe",
        profileUrl: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        bio: "Mars & Cars, Chips & Dips",
        provider: "github",
        newUser: true,
        avatar: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: cuid(),
        nodeId: cuid(),
        username: "johnDoe4",
        email: "johndoe4@go.com",
        displayName: "John Doe",
        profileUrl: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        bio: "Mars & Cars, Chips & Dips",
        provider: "github",
        newUser: true,
        avatar: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: cuid(),
        nodeId: cuid(),
        username: "johnDoe5",
        email: "johndoe5@go.com",
        displayName: "John Doe",
        profileUrl: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        bio: "Mars & Cars, Chips & Dips",
        provider: "github",
        newUser: true,
        avatar: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: cuid(),
        nodeId: cuid(),
        username: "johnDoe6",
        email: "johndoe6@go.com",
        displayName: "John Doe",
        profileUrl: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        bio: "Mars & Cars, Chips & Dips",
        provider: "github",
        newUser: true,
        avatar: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];