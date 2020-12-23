import React from 'react';
import PropTypes from 'prop-types';

class ResponseBlock extends React.PureComponent {
    
    static propTypes = {
        responseResult: PropTypes.object,
    };

    render() {
        if (this.props.responseResult == null) {
            return ( 
            <div style={{width: '50%', float: 'left'}}>
            <h3>{'Реузьтат ответа'}</h3>
            </div>
            );
        };
        console.log(this.props.responseResult);
        return(
            <div className='col' >
                <h3 className='h3'>{'Реузьтат ответа'}</h3>
                <p className='h6'>{JSON.stringify(this.props.responseResult)}</p>
            </div>
        );
    }
}


export default ResponseBlock;