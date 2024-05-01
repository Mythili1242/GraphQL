import React, { useState } from "react";
import {ApolloClient,InMemoryCache,ApolloProvider,useQuery,gql} from "@apollo/client"; //npm i @apollo/client
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




function App() {
  const client=new ApolloClient({
    uri:"http://localhost:4000",
    cache:new InMemoryCache()
  });
  
  const getGames=gql `
  query getgames{
    games{
      id,platform,title
    }
  }
  `;

  const editGames=gql `
  mutation updateGame($id:ID!,$edits:editGameInput!) {
  updateGame(id: $id,edits:$edits) {
   
    platform,
    title
  }
}
  `

// const {loading,error,data}=useQuery(getGames);
//     if(loading) return <p>Loading...</p>
//     if(error) return <p>error :</p>
//     if (!data || !data.games) return <p>No games found</p>;
//     console.log(data,"data")
  const Games=()=>{ 
    const {loading,error,data}=useQuery(getGames);
    if(loading) return <p>Loading...</p>
    if(error) return <p>error </p>
  
  return (
    <div >
 {/* <ul>
  {data.games.map(game=>(

    <li>{game.title}</li>
  ))}
 </ul> */}
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="center">Platform</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.games.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.platform}</TableCell>
              <TableCell align="center" onClick={()=>UpdateGames(row.id)}>Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );}

  
    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   const UpdateGames=()=>{
    setLoading(true);
    // const {loading,error,data}=useQuery(editGames,{
      client.mutate({
        mutation: editGames,
      variables:{
        "id": "5",
        "edits":{
           "title":"pokemon1",
         
        }
      }
    })
    .then((result) => {
      setData(result.data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });

  //   if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
   }

  return(
    <ApolloProvider client={client}>
      <div><Games  /></div>
{/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.games.map((game) => (
            <li key={game.id}>
              <strong>{game.title}</strong> - {game.platform}
            </li>
          ))}
        </ul>
      )} */}
      
    </ApolloProvider>
  )
}

export default App;
