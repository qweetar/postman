import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';

class Request extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        cbshowResponse: PropTypes.func.isRequired,
    };

    tryRequest = () => {
        let data = {id: this.props.id};
        console.log("Run requst # " + data.id);
        isoFetch('/run', {
            method: 'post',
            headers: {
                'Content-Type': 'text/html'
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('fetch error ' + response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            this.fetchTryRequestSuccess(data);
        })
        .catch(error => {
            this.fetchError(error.message);
        });
    };


    fetchTryRequestSuccess = (loadedData) => {
        this.props.cbshowResponse(loadedData);
    };

    fetchError = (errorMessage) => {
        console.log(errorMessage);
    }



    render() {
        return(
            <li className='list-group-item'>
                <span className='h6'>URL запроса: </span>{this.props.url}
                <span className='h6'> HTTP метод: </span>{this.props.method.toUpperCase()}
                <button className='btn btn-outline-success btn-sm float-end' onClick={this.tryRequest}>Выполнить запрос</button>
            </li>
        );
    }
}

export default Request;