import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {

    static propTypes = {
        cbheaderFilled: PropTypes.func.isRequired,
    };

    state = {
        isHeaderSent: false,
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
            this.props.cbheaderFilled(this.state.keyField, this.state.valueField);
            this.setState({isHeaderSent: true});
    };


    render() {
        // console.log("Header render");
        return(
            <div className='row'>
            <div className='col input-group mb-3'>
                <div className='input-group-text'>
                    <input className='form-check-input' onChange={this.checkFieldChange} disabled={this.state.keyField == '' || this.state.valueField == '' || this.state.isHeaderSent} type='checkbox' value='' aria-label='Checkbox for following text input'></input>
                </div>
                <input className='form-control' onChange={this.keyFieldChange} disabled={this.state.isHeaderSent} type='text' aria-label='Text input with checkbox'></input>
            </div>
            <div className='col'>
                <input className='form-control' onChange={this.valueFieldChange} disabled={this.state.isHeaderSent} type='text'></input>
            </div>
            </div>
        );
    }

}

export default Header;