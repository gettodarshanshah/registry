import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ApplicationDetails from "./AppplicationDetails";
import ApplicationSpecRegistration from './ActivitySpecRegistration';
import TokenFile from './download-token';

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class AppRegistration extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activeStep: 0,
      appDetail :'',
      appName : ''
    };
    this.onEnter = this.onEnter.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.downloadToken = this.downloadToken.bind(this);
    this.getSteps = this.getSteps.bind(this);
  }

  getSteps() {
    return ['', '', ''];
  }
  

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ApplicationDetails
          onEnter={this.onEnter} />;
      case 1:
        return <ApplicationSpecRegistration handleChange={this.handleChange} />;
      case 2:
        return <TokenFile downloadToken={this.downloadToken}></TokenFile>;
      default:
        return 'Uknown stepIndex';
    }
  }

  handleNext(){
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack(){
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset(){
    this.setState({
      activeStep: 0,
    });
  };

  handleChange () {
    let fileInput = document.getElementById('file');
    var file = fileInput.files[0];
    var jsyaml = require('js-yaml');
    var appDetails = this.state.appDetail;
    var reader = new FileReader();
    reader.onloadend = function (e) {
      let text = reader.result;
      console.log(jsyaml.load(text));
      let jsonText = jsyaml.load(text);
      let applicationName = {
        yaml: text,
        token: localStorage.getItem("token"),
        appDetails: appDetails
      }

      fetch('http://localhost:8002/register-yaml', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationName)
      })
      // app_name = jsyaml.load(applicationName.yaml);

    }
    reader.readAsText(file);

  }

  onEnter(event){

    console.log('in on key press');
    if (event.key === 'Enter') {
      var text = document.getElementById("appName").value;
      let applicationName = {
        name: text,
        token: localStorage.getItem("token")
      }
      console.log(applicationName);
      this.setState({
        appDetail: applicationName.name
      })

      fetch('http://localhost:8002/register-name', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationName)
      }).then(res => res.json())
        .then(res => console.log(res));


    }
  }

  downloadToken(){

    let data;

    fetch(`http://localhost:8002/get_data/?select=${this.state.appDetail}&app_name=${this.state.appName}`)
      .then(function (response) {
        console.log('res', response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson)
        data = JSON.stringify(myJson.arr);

        var fileDownload = require('js-file-download');
        fileDownload(data, 'filename.json');
      })
  }


  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
              <div>
                <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppRegistration);

