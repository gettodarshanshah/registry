import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
class ApplicationSubscribed extends React.Component {
  constructor(props) {
    super(props)
    this.state = { subscriptions: [] }
  }
  componentDidMount() {
    var name = this.props["organsiationName"];
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem("token"));
    fetch(`http://localhost:8002/subscription/${name}`, {
      method: 'GET',
      headers: myHeaders,

    }).then((response) => {
      return response.json();
    })
      .then((myJson) => {
        var list = [];
        myJson.forEach(function (element) {
          list.push(Object.keys(element))
        });
        this.setState({ subscriptions: list });

      })
  }
  render() {
    return (
      <div >
        <List component="nav">
          {
            this.state.subscriptions.map((subscription) => {
              return (<ListItem>{subscription.map((element) => {
                return (<ListItem>{element}</ListItem>)
              })
              }
              </ListItem>);

            })
          }
        </List>
      </div>
    );
  }
}
export default ApplicationSubscribed;