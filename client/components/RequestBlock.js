import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';

class RequestBlock extends React.PureComponent {

    static propTypes = {
        cbrequestSent: PropTypes.func.isRequired,
    };

    state = {
        isCardChanged: false,
        urlField: null,
        method: null,
        accept: null,
        body: null,
    };

    urlFieldChange = (event) => {
        if (event.target.value != "") {
            this.setState({urlField: event.target.value});
        }
        this.setState({isCardChanged: true});
    };

    methodFieldChange = (event) => {
        this.setState({method: event.target.value});
    };

    acceptFieldChange = (event) => {
        this.setState({accept: event.target.value});
    }

    bodyFieldChange = (event) => {
        this.setState({body: event.target.value});
    }

    sendRequest = () => {
        let req = {
            url: this.state.urlField,
            method: this.state.method,
            accept: this.state.accept,
            body: this.state.body,
        }
        console.log(req);
        if (this.state.isCardChanged) {
            isoFetch('/request', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req),
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error('fetch error ' + response.status);
                } else {
                    this.fetchRequestSuccess(response);
                }
            })
            .catch(error => {
                this.fetchError(error.message);
            });

        }
    };

    fetchRequestSuccess = (loadedData) => {
        this.props.cbrequestSent(loadedData);
    };

    fetchError = (errorMessage) => {
        console.log(errorMessage);
    };

    render() {
        
        return(
            <div style={{width: '50%', float: 'left', margin: '0'}}>
                <h3>{'Блок ввода данных запроса'}</h3>
                <div>
                    <div>
                        <label>{'URL метода'}</label><br/>
                        <input onChange={this.urlFieldChange}></input>
                    </div><br/>
                    <div>
                        <select onChange={this.methodFieldChange}>
                            <option value=''>{'Выберите HTTP метод'}</option>
                            <option value='post'>{'POST'}</option>
                            <option value='get'>{'GET'}</option>
                        </select>
                    </div><br/>
                    <div>
                        <select onChange={this.acceptFieldChange}>
                            <option value=''>{'Выберите Accept-type'}</option>
                            <option value='application/json'>{'application/json'}</option>
                            <option value='text/html'>{'text/html'}</option>
                            <option value='application/xml'>{'application/xml'}</option>
                        </select>
                    </div><br/>
                    <div>
                        <label>Body параметры:</label><br/>
                        <textarea onChange={this.bodyFieldChange} placeholder='{"name": "John", "surname": "Travolta"}' cols='30' rows='5'></textarea>
                    </div><br/>
                    <button onClick={this.sendRequest}>{'Отправить'}</button>
                </div>
            </div>
        );
    }
}

export default RequestBlock;