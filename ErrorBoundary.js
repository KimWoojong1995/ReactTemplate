import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        error: false
    };
    componentDidCatch(error, info) {
        console.log('에러가 발생됨');
        console.log({
            error,
            info,
        });
        this.setState({
            error: true,
        });
    }
    render() {
        if (this.state.error) {
            return <h1>에러입니다~</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;