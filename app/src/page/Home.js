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
  TextField,
} from "@mui/material";
import HomeService from "../services/HomeService";
import axios from "axios";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      id: "",
      form:{
        id:'',
        name:'',
        address:'',
      }
    };
  }

  loadData = async () => {
    const promise = new Promise((resolve, reject) => {
      axios.get("http://127.0.0.1:4000/user", { params: { id: this.state.id } })
        .then((res) => {
          console.log(res);
          this.setState({
            data: res.data,
          });
          console.log(this.state.data);
          return resolve(res);
        })
        .catch((err) => {
          return resolve("Error :" + err);
        });
    });
    return await promise;
  };

  saveData = async () => {
    console.log(this.state.form)
    axios.post('http://127.0.0.1:4000/user',{ id : this.state.form.id , name:this.state.form.name , address:this.state.form.address})
    .then((res) => {
        console.log(res)
    })
    .catch((err) =>{
        console.log("Error :",err)
    })
  }

 

  componentDidMount() {

  }

  render() {
    return (
      <>
        <h1>{this.state.data.name}</h1>
        <h1>{this.state.data.address}</h1>
        <h1>{this.state.data.id}</h1>
        <Input
          placeholder="id"
          onChange={(e) => {
            this.setState({
              id: e.target.value,
            });
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            this.loadData();
          }}
        >
          Search
        </Button>

        <TextField id="outlined-basic" label="id" variant="outlined" 
        onChange={(e) => {
            let form = this.state.form
            form.id = e.target.value
            this.setState({
              form
            });
          }}
        />
        <TextField id="outlined-basic" label="name" variant="outlined" 
         onChange={(e) => {
            let form = this.state.form
            form.name = e.target.value
            this.setState({
              form
            });
          }}
        />
        <TextField id="outlined-basic" label="address" variant="outlined" 
         onChange={(e) => {
            let form = this.state.form
            form.address = e.target.value
            this.setState({
              form
            });
          }}
        />
         <Button
          variant="contained"
          onClick={() => {
            this.saveData();
          }}
        >
          Save
        </Button>
      </>
    );
  }
}

export default Home;
