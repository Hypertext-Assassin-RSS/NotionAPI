import { Component } from "react";
import {
    Button,
  Grid,
  Input,
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
      id:'',
    };
  }

  loadData = async () => {
    const promise = new Promise((resolve, reject) =>{
        axios.get('http://127.0.0.1:4000/user', { params: { id: this.state.id } })
            .then((res) =>{
                console.log(res)
                this.setState({
                    data:res.data
                })
                console.log(this.state.data)
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
    //this.loadData()
   
  }

  render() {
    return (
      <>
        <h1>{this.state.data.name}</h1>
        <h1>{this.state.data.address}</h1>
        <h1>{this.state.data.id}</h1>
        <Input placeholder="id" onChange={(e) => {
            this.setState({
                id:e.target.value
            })
        }}/>
        <Button variant="contained"
        onClick={() => {this.loadData()}}
        >Submit</Button>
      </>
    );
  }
}

export default Home;
