import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';
import HeaderBlock from './HeaderBlock';

class RequestBlock extends React.PureComponent {

    static propTypes = {
        cbrequestSent: PropTypes.func.isRequired,
    };

    state = {
        isCardChanged: false,
        urlField: null,
        method: null,
        header: null,
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

    bodyFieldChange = (event) => {
        this.setState({body: event.target.value});
    }

    sendRequest = () => {
        let req = {
            url: this.state.urlField,
            method: this.state.method,
            headers: this.state.header,
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

    headersFilled = (data) => {
        this.setState({
            headerNumFields: this.state.headerNumFields++,
            header: data,
        })
    }

    render() {
        console.log("RequstBlock render");
        let headerBlockCode = <HeaderBlock cbheadersFilled={this.headersFilled}/>
        return(
            <div className='col'>
                <h3 className='h3'>{'Блок ввода данных запроса'}</h3>
                <div>
                    <div className='input-group mb-3'>
                        <label className='input-group-text' htmlFor='inputGroupSelect01'>HTTP Method</label>
                        <select className='form-select' id='inputGroupSelect01' onChange={this.methodFieldChange}>
                            <option value=''>Выберите метод запроса...</option>
                            <option value='post'>{'POST'}</option>
                            <option value='get'>{'GET'}</option>
                            <option value='put'>{'PUT'}</option>
                        </select>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text' id='inputGroup-sizing-default'>URL метода</span>
                        <input className='form-control' type='text' aria-label='Sizing exapmle input' aria-describedby='inputGroup-sizing-default' onChange={this.urlFieldChange}></input>
                    </div>
                    {headerBlockCode}
                    <div className='mb-3'>
                        <label className='form-label h5' htmlFor='exampleFormControlTextarea1'>Параметры Body:</label><br/>
                        <textarea className='form-control' onChange={this.bodyFieldChange} id='exampleFormControlTextarea1' placeholder='{"name": "John", "surname": "Travolta"}' rows='5'></textarea>
                    </div>
                    <button className='btn btn-primary btn-sm' onClick={this.sendRequest}>{'Отправить'}</button>
                </div>
            </div>
        );
    }
}

export default RequestBlock;