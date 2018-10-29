import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class TokenFile extends React.Component{
    
    render() {
    return (
      
                  <React.Fragment>
                    <Typography variant="headline" gutterBottom>
                      Thank you for your Subscription.            
                    </Typography>
                    <Typography variant="subheading">
                      Your activity has been subscribed. You can now use activities as per your subscription
  
                    </Typography>
                    <Button onClick = {() => this.props.downloadToken()}>
                      Download Token
                    </Button>
                  </React.Fragment>
                )
    }
}

export default TokenFile;