import React from 'react';
import isoFetch from 'isomorphic-fetch';

import RequestBlock from './RequestBlock';
// import ResponseBlock from '.ResponseBlock';
import RequestList from './RequestList';


class PostmanBlock extends React.PureComponent {
    constructor(props) {
        super(props);
    };   

    componentDidMount() {
        this.loadRequests();
    };

    state = {
        requestsReady: false,
        requestsResult: [],
    };

    loadRequests = () => {
        isoFetch('/reqlist', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('fetch error ' + response.status);
            } else {
                return response.json();
            }
        })
        .then(data => {
            this.fetchReqListSuccess(data);
        })
        .catch(error => {
            this.fetchError(error.message);
        });
    };

    fetchReqListSuccess = (loadedData) => {
        console.log(loadedData);
        this.setState({
            requestsReady: true,
            requestsResult: loadedData,
        });
    };

    fetchError = (errorMessage) => {
        console.log(errorMessage);
    };

    requestSent = (data) => {
        console.log(data);
        this.loadRequests();
    }

    render() {
        if (!this.state.requestsResult) {
            return <div>loading...</div>
        };

        let requestListCode = <RequestList requests={this.state.requestsResult} />;

        let requestBlockCode = <RequestBlock cbrequestSent={this.requestSent} />

        return (
            <div>
                {requestBlockCode}
                {requestListCode}
            </div>
        );
    };
};

export default PostmanBlock;