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
      form: {
        id: "",
        name: "",
        address: "",
      },
    };
  }

  loadData = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:4000/user", { params: { id: this.state.id } })
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
    console.log(this.state.form);
    axios
      .post("http://127.0.0.1:4000/user", {
        id: this.state.form.id,
        name: this.state.form.name,
        address: this.state.form.address,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  };

  componentDidMount() {}

  render() {
    return (
      <>
        <Grid container rowSpacing={2} columnSpacing={2} padding={5}>
          <Grid xs={12}>
            <Grid xs={4}>
              <h1>ID : {this.state.data.id}</h1>
            </Grid>
            <Grid xs={4}>
              <h1>Name : {this.state.data.name}</h1>
            </Grid>
            <Grid xs={4}>
              <h1>Address : {this.state.data.address}</h1>
            </Grid>
          </Grid>
          <Grid xs={12} display='flex' margin={2}>
            <Grid xs={2}>
              <Input
                placeholder="id"
                onChange={(e) => {
                  this.setState({
                    id: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid xs={6}>
                <Button
              variant="contained"
              onClick={() => {
                this.loadData();
              }}
            >
              Search
            </Button>
            </Grid>
          </Grid>
          <Grid xs={12}  display='flex' flexDirection='row' margin={2}>
          <Grid xs={2}>
            <TextField
              id="outlined-basic"
              label="id"
              variant="outlined"
              onChange={(e) => {
                let form = this.state.form;
                form.id = e.target.value;
                this.setState({
                  form,
                });
              }}
            />
          </Grid>
          <Grid xs={2}>
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              onChange={(e) => {
                let form = this.state.form;
                form.name = e.target.value;
                this.setState({
                  form,
                });
              }}
            />
          </Grid>
          <Grid xs={2}>
            <TextField
              id="outlined-basic"
              label="address"
              variant="outlined"
              onChange={(e) => {
                let form = this.state.form;
                form.address = e.target.value;
                this.setState({
                  form,
                });
              }}
            />
          </Grid>
          </Grid>
          <Grid xs={12} margin={2}>
            <Button
              variant="contained"
              onClick={() => {
                this.saveData();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Home;
