import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    var name = this.props["applicationName"];
    fetch(`http://localhost:8002/render-table/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ data: myJson });

      })
  }
  render() {
    const { classes } = this.props;

    return (
      <div >

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>activity_code</TableCell>
                <TableCell numeric>name</TableCell>
                <TableCell numeric>description</TableCell>
                <TableCell numeric>activity-schema</TableCell>
                <TableCell numeric>example</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(t => {
                return (
                  <TableRow key={t.id}>
                    <TableCell component="th" scope="row">
                      {t.activity_code}
                    </TableCell>
                    <TableCell numeric>{t.name}</TableCell>
                    <TableCell numeric>{t.description}</TableCell>
                    <TableCell numeric>
                      <TableRow>
                        <TableCell>Actor</TableCell>
                        <TableCell>{t.activity_schema.actor}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Target</TableCell>
                        <TableCell>{t.activity_schema.target}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Object</TableCell>
                        <TableCell>{t.activity_schema.object}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Published</TableCell>
                        <TableCell>{t.activity_schema.published}</TableCell>
                      </TableRow>
                    </TableCell>
                    <TableCell numeric>{t.example}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>

    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);