import { Interest } from "@prisma/client";
import cuid from "cuid";

const programmingLanguages: string[] = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "C",
    "Go",
    "Rust",
    "Scala",
    "Kotlin",
    "Swift",
    "PHP",
    "Ruby",
    "Elixir",
    "Haskell",
    "Erlang",
    "Clojure",
    "Elm",
    "F#",
    "Dart",
    "Objective-C",
    "Matlab",
    "VBA",
    "Visual Basic",
    "Abap",
    "Groovy",
    "Perl",
    "Cobol",
    "Solidity"
]

console.log(cuid());

export const languages: Interest[] = programmingLanguages.map(language => ({
    id: cuid(),
    name: language,
    createdAt: new Date(),
    updatedAt: new Date()
}));