import React, { Component } from 'react';
import "../Style/Modal.css"


class Modal extends Component {

    render() {

        return (

            <div>

                <div className="modal">

                    <div className="modal-content">

                        <div className="img-div">

                            <img className={this.props.class} src={this.props.srcImg} alt="Vous avez gagné" />

                        </div>

                        <div>{this.props.children}</div>

                    </div>

                </div>

            </div>

        );

    }

}

export default Modal;