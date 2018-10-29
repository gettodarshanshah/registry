import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';

class ApplicationDetails extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom>
                    Application Details
          </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>

                        <Input
                            name="applicationName"
                            type="email"
                            id="appName"
                            onKeyPress={(event)=> {this.props.onEnter(event)}}
                        />


                    </Grid>
                    <Grid item xs={12} sm={6}>

                    </Grid>



                </Grid>


            </React.Fragment>
        );

    }


}

export default ApplicationDetails;
