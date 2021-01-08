import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Query extends React.PureComponent {

    static propTypes = {
        cbqueryFilled: PropTypes.func.isRequired,
    };

    state = {
        isQuerySent: false,
        keyField: '',
        valueField: '',
    };

    keyFieldChange = (event) => {
        this.setState({keyField: event.target.value});
    };

    valueFieldChange = (event) => {
        this.setState({valueField: event.target.value});
    };

    checkFieldChange = () => {
            // let tempObj = {};
            // tempObj[this.state.keyField] = this.state.valueField;
            // this.props.cbqueryFilled(tempObj);
            let tempQuery = '';
            tempQuery = this.state.keyField + '=' + this.state.valueField;
            this.props.cbqueryFilled(tempQuery);
            this.setState({isQuerySent: true});
    };


    render() {
        // console.log("Header render");
        return(
            <div className='row'>
            <div className='col input-group mb-3'>
                <div className='input-group-text'>
                    <input className='form-check-input' onChange={this.checkFieldChange} disabled={this.state.keyField == '' || this.state.valueField == '' || this.state.isQuerySent} type='checkbox' value='' aria-label='Checkbox for following text input'></input>
                </div>
                <input className='form-control' onChange={this.keyFieldChange} disabled={this.state.isQuerySent} type='text' aria-label='Text input with checkbox'></input>
            </div>
            <div className='col'>
                <input className='form-control' onChange={this.valueFieldChange} disabled={this.state.isQuerySent} type='text'></input>
            </div>
            </div>
        );
    }

}

export default Query;