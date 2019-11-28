import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ActionButtons from '../inputs/ActionButtons';
import exportTo from './exportToExcel'

class ExportToExel extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillReceiveProps(nextProps) {

    }

    handleClick(event) {
        let { data, name } = this.props;
        return exportTo(data, name)
    }

    render() {
        let { classes, data } = this.props;
        return (<ActionButtons buttonType="download"
            text="Download"
            disableed={data && Object.keys(data).length == 0}
            // clas = { classes.clearbtn }
            handleClick={this.handleClick.bind(this)}
        />
        )
    }
}

export default withStyles(styles)(ExportToExel);