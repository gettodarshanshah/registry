import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from "react-router-dom";
class ApplicationsRegistered extends React.Component {
  constructor(props) {
    super(props)
    this.state = { applications: [] }

  }
  componentDidMount() {
    var name = this.props["organsiationName"];
    fetch(`http://localhost:8002/register-name/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ applications: myJson });

      })
  }
  render() {
    return (
      <div >
        <List component="nav">
          {
            this.state.applications.map((application) => {
              let a = 10;
              return (<ListItem><Link to={`/app-view/${application}`}>{application}</Link></ListItem>);
            })
          }
        </List>
      </div>
    );
  }
}
export default ApplicationsRegistered;
