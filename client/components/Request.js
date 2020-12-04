import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';

class Request extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        accept: PropTypes.string.isRequired
    };

    tryRequest = () => {
        isoFetch('/try', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.props.id}),
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('fetch error ' + response.status);
            } else {
                return response.json();
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
        alert('Ответ на HTTP запрос');
    };

    fetchError = (errorMessage) => {
        console.log(errorMessage);
    }



    render() {
        return(
            <li>
                <span>URL запроса: </span>{this.props.url}<br/>
                <span> HTTP метод: </span>{this.props.method.toUpperCase()}<br/>
                <span> Content-Type: </span>{this.props.accept}<br/>
                <button onClick={this.tryRequest}>Выполнить запрос</button>
            </li>
        );
    }
}

export default Request;