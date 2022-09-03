import {Component} from "react";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import HomeService from "../services/HomeService";

class Home extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }

    load = async () => {
        const response = await HomeService.load();
        this.setState({
            data: response.data
        })
        console.log(this.state.data)
    }

    componentDidMount() {
        this.load()

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
                            <Table sx={{minWidth: 650}} aria-label="simple table">
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
        )
    }
}

export default Home
