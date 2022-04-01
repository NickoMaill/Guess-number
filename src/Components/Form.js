import React, { Component } from 'react';
import "../Style/Form.css"

class Form extends Component {

    render() {

        return (


            <div className="content">

                <h3>{this.props.children}</h3>

                <div className="numberSection">

                    <form>

                        <input
                            className="num"
                            onChange={this.props.onChange}
                            name="number"
                            placeholder='XXX'
                            autoComplete="off"
                            type="text"
                            >
                        </input>

                    </form>

                </div>

                <div className="answer">
                    <p className="answer-sentence">{this.props.answer}</p>
                </div>

            </div>

        );
    }
}

export default Form;