import React from 'react';

class Modal extends React.Component {
    render() {
        return (
            <div>

                <div id="myWinModal" className="modal">

                    <div className="modal-content">

                        <div className="img-div">

                            <img className="winner-img" src="./img/happy.jpg" alt="Vous avez gagné" />
                            <img src="./img/retry.png" alt="rejouer" className="retry"
                                onClick="window.location.reload();" />

                        </div>

                    </div>

                </div>
                
            </div>
        );
    }
}

export default Modal;