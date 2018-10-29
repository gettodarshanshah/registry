import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
class ApplicationSpecRegister extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="title" gutterBottom>
                    Activity Schema
      </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={6} md={4}>
                        <hr />

                        <Typography variant="title" gutterBottom className="title">
                            Enter Activity Schema
        </Typography>

                        <input type="file"
                            name="myFile"
                            id="file"
                            onChange={() => {this.props.handleChange()}} 
                            />
                        <hr />
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="title" gutterBottom>
                            Download Sample Schema
        </Typography>
                        <a href="https://drive.google.com/file/d/1kNMZ4n464x7Dbj4hcHfiPmJuzfoExmWL/view?usp=sharing" target="_blank" download>
                            <Button variant="contained" color="primary" >
                                Download Sample Schema
      </Button>
                        </a>
                    </Grid>
                </Grid>
                <Typography variant="subheading" gutterBottom>
                    Please enter your schema in yaml format. You can check the through or
                    sample document provided above. You can check more infromation on YAML through
                    the link  provided below
        </Typography>
                <a href="http://yaml.org/" target="-blank">
                    <Button variant="contained" color="primary" >
                        YAML Info
            </Button>
                </a>
            </div>
        );
    }
}
export default ApplicationSpecRegister;