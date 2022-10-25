import { Component } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HomeService from "../services/HomeService";
import axios from "axios";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
    };
  }

  createAccount = async () => {
    const json = JSON.stringify({ id:"C001"})
    const promise = new Promise((resolve, reject) =>{
        axios.get('http://127.0.0.1:4000/user', json)
            .then((res) =>{
                console.log(res)
                return resolve(res)
            })
            .catch((err)=>{
                return resolve("Error :"+err)
            })
    })
    return await promise;
}


//   load = async () => {
//     const response = fetch('http://localhost:4000',{
//         method:'GET',
//         mode:'cors',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body:{"id":"C001"}
//     })

    
//     console.log(response)
//   }


  componentDidMount(){
    //this.load();
    this.createAccount()
   
  }

  render() {
    return (
      <>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item lg={8}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {this.state.data.map((row) => (
                                            <TableRow>
                                                <TableCell align="left">{row.id}</TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.address}</TableCell>
                                            </TableRow>
                                        ))
                                    }*/}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Home;
