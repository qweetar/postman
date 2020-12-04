import React from 'react';
import PropTypes from 'prop-types';
import Request from './Request';

class RequestList extends React.PureComponent {
    
    static propTypes = {
        requests: PropTypes.array,
    }

    render() {
        let requestsCode = this.props.requests.map(request => 
            <Request 
            key={request.id}
            id={request.id} 
            url={request.url} 
            method={request.method}
            accept={request.accept}
            />
        );

        return(
            <div>
                <h3>Список сформированных запросов</h3>
                <ul>
                    {requestsCode}
                </ul>
            </div>
        );
    }
}

export default RequestList;