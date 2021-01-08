import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Query from './Query';

class QueryBlock extends React.Component {

    static propTypes = {
        cbqueriesFilled: PropTypes.func.isRequired,
    };

    state = {
        query: [],
        numFields: this.props.numFields,
    };

    queryFilled = (data) => {
        let tempArr = this.state.query;
        tempArr.push(data);
        this.setState({
            query: tempArr,
        });
        this.props.cbqueriesFilled(this.state.query);
    }


    render() {
        // console.log("HeaderBlock render");
        let queriesCode = [];
            for (let i = 0; i <= this.state.query.length; i++) {
                queriesCode.push(
                    <Query key={i} cbqueryFilled={this.queryFilled}/>
                );
            }
        
        return(
            <Fragment>
                <span className='h5'>Query Params </span>
                <p>Для фиксации введенных данных поставьте галочку</p>
                {queriesCode}
            </Fragment>
        );
    }
}

export default QueryBlock;