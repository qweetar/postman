import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class HeaderBlock extends React.Component {

    static propTypes = {
        cbheadersFilled: PropTypes.func.isRequired,
    };

    state = {
        header: {},
        numFields: 0,
    };

    headerFilled = (keyField, keyValue) => {
        let tempObj = this.state.header;
        tempObj[keyField] = keyValue;
        this.setState({
            header: tempObj,
            numFields: this.state.numFields++,
        });
        this.props.cbheadersFilled(this.state.header);
    }


    render() {
        // console.log("HeaderBlock render");
        let headersCode = [];
            for (let i = 0; i <= this.state.numFields; i++) {
                headersCode.push(
                    <Header key={i} cbheaderFilled={this.headerFilled}/>
                );
            }
        
        return(
            <Fragment>
                <span className='h5'>Headers</span>
                <p>Для фиксации введенных данных поставьте галочку</p>
                {headersCode}
            </Fragment>
        );
    }
}

export default HeaderBlock;