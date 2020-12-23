import React from 'react';
import PropTypes from 'prop-types';
import Request from './Request';

class RequestList extends React.PureComponent {
    
    static propTypes = {
        requests: PropTypes.array, 
        cbshowResponse: PropTypes.func.isRequired,
    }

    showResponse = (responseData) => {
        this.props.cbshowResponse(responseData);
    }

    render() {
        let requestsCode = this.props.requests.map(request => 
            <Request 
            key={request.id}
            id={request.id} 
            url={request.url} 
            method={request.method}
            cbshowResponse={this.showResponse}
            />
        );

        return(
            <div className='col'>
                <h3 className='h3'>Список сформированных запросов</h3>
                <ul className='list-group list-group-flush'>
                    {requestsCode}
                </ul>
            </div>
        );
    }
}

export default RequestList;