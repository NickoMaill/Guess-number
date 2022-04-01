import React, { Component } from 'react';
import "../Style/Button.css"

class Button extends Component {
    render() {
        return (

            <div className={this.props.classNameDiv}>
                <button onClick={this.props.onClick} type={this.props.type} className={this.props.className}>{this.props.children}</button>
            </div>

        );
    }
}

export default Button;