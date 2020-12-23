import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class HeaderBlock extends React.Component {

    static propTypes = {
        cbheadersFilled: PropTypes.func.isRequired,
    };

    state = {
        header: [],
        numFields: this.props.numFields,
    };

    headerFilled = (data) => {
        let tempArr = this.state.header;
        tempArr.push(data);
        this.setState({
            header: tempArr,
        });
        this.props.cbheadersFilled(this.state.header);
    }


    render() {
        // console.log("HeaderBlock render");
        let headersCode = [];
            for (let i = 0; i <= this.state.header.length; i++) {
                headersCode.push(
                    <Header key={i} cbheaderFilled={this.headerFilled}/>
                );
            }
        
        return(
            <Fragment>
                <span className='h5'>Headers</span>
                {headersCode}
            </Fragment>
        );
    }
}

export default HeaderBlock;