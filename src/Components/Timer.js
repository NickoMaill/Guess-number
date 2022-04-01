import React, { Component } from 'react';
import "../Style/Timer.css"

class Timer extends Component {
    
    render() {

        return (

            <div className='timer-div'>
                <p className='timer'>{this.props.children}</p>     
            </div>

        );
    }
}

export default Timer;