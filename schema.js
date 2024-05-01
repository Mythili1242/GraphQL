export const typeDefs=`#graphql
    type Game {
        id:ID!    
        # ! indiacted required field
        title:String!
        platform:[String!]!  
        #array should be there and data should also be there inside array so two ! 
        reviews:[Review!]!
        # author:Author!
    }
    type Review {
        id:ID!
        rating:Int!
        content:String!
        game:Game!
        author:Author!
    }
    type Author {
        id:ID!
        name:String!
        verified:Boolean!
        reviews:[Review!]
    }
    type Query {
        # this is mandatory.it defines entry points of the graph and specify he return types of those entry points
        reviews:[Review]
        # return type of this entry point is list of reviews.user would be able to enter the graph with this point and then navigate throughtout the grapgh to get related data
        review(id:ID!):Review 
        # returns single review object
        games:[Game]
        game(id:ID!):Game 
        authors:[Author]
        author(id:ID!):Author 
    }
    type Mutation {
        addGame(game:addGameInput):Game
        deleteGame(id:ID!): [Game]
        updateGame(id:ID!,edits:editGameInput):Game
    }
    input addGameInput{
# not a type of data but collection of fields that we can use in mutation as a single argument
title:String!,
platform:[String!]!

}
input editGameInput{
   
    title:String,
platform:[String!]

}
`

    