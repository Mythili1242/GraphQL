import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers={
    Query:{
        games(){
            return db.games 
        },
        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        },
        review(_,args){
            return db.reviews.find((review)=>review.id===args.id)
        },
        game(_,args){
            return db.games.find((game)=>game.id===args.id)
        },
        author(_,args){
            return db.authors.find((author)=>author.id===args.id)
        }
    },
    Game:{
        reviews(parent){
            return db.reviews.filter((r)=>r.game_id===parent.id)
        }
    },
    Author:{
        reviews(parent){
            return db.reviews.filter((r)=>r.author_id===parent.id)
        }
    },
    Review:{
        author(parent){
            return db.authors.filter((a)=>a.id===parent.id)
        },
        game(parent){
            return db.games.filter((g)=>g.id===parent.id)
        }
    },
    Mutation:{
        deleteGame(_,args){
            db.games=db.games.filter((g)=>g.id!==args.id)
            return db.games
        },
        addGame(_,args){
            let game={
                ...args.game,
                id:Math.floor(Math.random()*10000).toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(_,args){
            db.games=db.games.map((g)=>{
                if(g.id===args.id){
                    return {...g,...args.edits}
                }
                return g 
                // if they dont match send original object

            })
            return db.games.find((g)=>g.id===args.id)
        }
    }

}

//server setup
const server=new ApolloServer({
  //takes two aruguments typedefs which is typedefinitions. these are desciptions of our datatype and relation they have with other data types and kinds of queries that can be made combined to form a schema
  //second is resolver propertywhich is basixally a bunch of resolver functions that determines how we respond to queries for different data on the graph  
    typeDefs,
    resolvers
})

const {url}=await startStandaloneServer(server,{
    listen:{port:4000}
})

console.log("server ready at port 4000")