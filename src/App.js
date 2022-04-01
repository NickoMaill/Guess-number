//************************************************************************************************************************************************************************************//
//                                                                                                                                                                                    //                              
//                                                                                                                                                                                    //                              
// =====================  ||              ||  ||=================            //===========            ||               ||  ||=================  ||==============   ||==============   //                                                                                         
//           ||           ||              ||  ||                           //                         ||               ||  ||                   ||                 ||                 //                                           
//           ||           ||              ||  ||                         //                           ||               ||  ||                   ||                 ||                 //                                           
//           ||           ||              ||  ||                       //                             ||               ||  ||                   ||                 ||                 //                                            
//           ||           ||              ||  ||                     //                               ||               ||  ||                   ||                 ||                 //                                   
//           ||           ||==============||  ||=========          //                =============//  ||               ||  ||=========          ||=============||  ||=============||  // 
//           ||           ||              ||  ||                    \\                           //   ||               ||  ||                                  ||                 ||  //                                             
//           ||           ||              ||  ||                      \\                       //     ||               ||  ||                                  ||                 ||  //                                              
//           ||           ||              ||  ||                        \\                   //       \\               //  ||                                  ||                 ||  //                                              
//           ||           ||              ||  ||                          \\               //          \\             //   ||                                  ||                 ||  //                                          
//           ||           ||              ||  ||=================           \\============//            \\===========//    ||=================  ===============||  ===============||  //                                                                                                 
//                                                                                                                                                                                    //
//                                                           PROOVE THAT YOU'RE MORE SMART THAN HOMER SIMPSONS                                                                        //
//                                                                                                                                                                                    //    
//************************************************************************************************************************************************************************************//

/********************* LIBRARY IMPORT ***************************/

import React, { Component } from 'react';
import UIfx from 'uifx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

/********************** STYLE IMPORT *****************************/

import "./Style/App.css";
import 'animate.css';

/********************** MEDIA IMPORT *****************************/

import WinAudio from "./assets/audio/Woohoo.mp3";
import LooseAudio from "./assets/audio/D'oh.mp3";

//********************** COMPONENTS *******************************/

import Button from './Components/Button';
import Form from './Components/Form';
import Modal from './Components/Modal';
import Timer from './Components/Timer';

//AUDIO VARIABLES WITH UIFX METHODS

const winAudio = new UIfx(WinAudio);
const looseAudio = new UIfx(LooseAudio);

class App extends Component {

  constructor() {
    super()

    //Create State here

    this.state = {
      mysteryNum: 0,
      numUser: 0,
      response: "",
      isWin: null,
      count: 30,
      rules: "150",
      isPartyBegin: false,
      animation: "animate__animated animate__backInDown",
      volumeLevel: 0.5,
      volumeIcon: faVolumeUp,
    };

    //bind function here

    this.play = this.play.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.difficulty = this.difficulty.bind(this);
    this.cutVolume = this.cutVolume.bind(this);
    this.gameRules = this.gameRules.bind(this);
  };

  //***************** Function to start a game and the timer ****************/

  startGame() {

    this.setState({
      mysteryNum: Math.floor(Math.random() * 100) + 1,
      numUser: null,
      isWin: null,
      response: "",
      isPartyBegin: true,
    });

    /**************************** Create a timer **************************/

    this.myInterval = setInterval(() => {

      this.setState(prevState => ({
        count: prevState.count - 1
      }));

      //If timer equal zero the player loose the game Play HOMER "d'Oh!" audio .mp3 (.wave a too heavier for the website performance)

      if (this.state.count === 0) {

        clearInterval(this.myInterval)
        looseAudio.setVolume(this.state.volumeLevel).play();

        this.setState({
          isWin: false,
          count: 30,
        });

        return console.log("perdu");

      };

      // if counter is under 10 ad a "0" for a better format

      if (this.state.count < 10) {

        this.setState(prevState => ({
          count: "0" + prevState.count
        }),

        );

      };

    }, 1000);

  };

  //******************** Set difficulty ******************/

  difficulty(e) {

    //Level difficulty add more or less count for timer

    if (e === "easy") {

      this.setState({
        mysteryNum: Math.floor(Math.random() * 70) + 1,
        count: 59,
        rules: "70"
      });

    } else if (e === "difficult") {

      this.setState({
        mysteryNum: Math.floor(Math.random() * 150) + 1,
        count: 20,
        rules: "150",
      });

    } else if (e === "normal") {

      this.setState({
        count: 30,
      });

    };

  };

  //***************** Input Listener *****************/

  handleChange(e) {

    this.setState({
      numUser: parseInt(e.target.value)
    });

  };

  //****************** Function for check numbers *************/

  gameRules(max) {

    const { numUser, mysteryNum } = this.state;

    if (numUser > mysteryNum && numUser < max && numUser > 0) {

      this.setState({
        response: "C'est moins !"
      });

      // return console.log("C'est moins !");

      //display response text if numUser is more bigger than the mysteryNum

    } else if (numUser < mysteryNum && numUser > 0 && numUser < max && numUser !== null) {

      this.setState({
        response: "C'est plus !"
      });

      return console.log("C'est plus !");

      //guard if the numUser is not between 0 & max

    } else if (numUser > max || numUser < 0) {

      this.setState({
        response: `rentre une valeur entre 0 & ${max} ...`
      });

      return console.error(`rentre une valeur entre 0 & ${max}`);

    };
  }


  play(e) {
    e.preventDefault()

    // console.log(this.state.numUser);
    console.log(this.state.mysteryNum);

    const { numUser, mysteryNum, rules } = this.state;

    // Guard if it's not a number

    if (isNaN(numUser)) {

      this.setState({
        response: "Essaie de rentrer un nombre ..."
      });
      // console.error("Something went wrong");
      // console.warn("Please enter a number");

    };

    // Guard if input content is empty

    if (numUser === null) {

      this.setState({
        response: "essaie de rentrer une valeur ..."
      });
      // console.error("Something went wrong");
      // console.warn("Please enter a value");

    };

    //condition if player found mysteryNum

    if (numUser === mysteryNum) {

      this.setState({
        response: "Bravo!",
        isWin: true,
        count: 30,
      });

      //Play HOMER "woohoo" audio mp3 (waves a too heavier for the website performance)

      winAudio.setVolume(this.state.volumeLevel).play();
      clearInterval(this.myInterval); // ------> when player win the timer's stop
      // return console.log("Bravo !");

    } else if (rules === "70") {
      this.gameRules(70)

    } else if (rules === "100") {
      this.gameRules(100)

    } else if (rules === "150") {
      this.gameRules(150)

    }


  };

  cutVolume() {

    if (this.state.volumeLevel !== 0) {

      this.setState({
        volumeLevel: 0,
        volumeIcon: faVolumeXmark
      });

    } else {

      this.setState({
        volumeLevel: 0.5,
        volumeIcon: faVolumeUp,
      });

    };

  };

  //******************** Render for display HTML (JSX) **********************/

  render() {

    const { isPartyBegin, isWin } = this.state;

    if (isPartyBegin === false && isWin === null) {

      return (

        <section className={`start-section ${this.state.animation}`}>

          <div className='start-div'>

            <h1 className='main-title'>Welcome to The Guess</h1>


            <div className='difficulty-div'>

              <h4>Choisis ton niveau de difficulté</h4>

              <div className='difficulty-btn-div'>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("easy")}
                  type="button"
                >
                  Facile
                </Button>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("normal")}
                  type="button"
                >
                  Intermédiaire
                </Button>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("difficult")}
                  type="button"
                >
                  Difficile
                </Button>

              </div>

            </div>

            <div className='start-div-btn'>


              <Button
                classNameDiv="btnNum"
                onClick={this.startGame}
                className="new-game-btn btn"
              >
                Jouer
              </Button>

            </div>

            <Button
              className="cut-volume"
              classNameDiv="cut-volume-div"
              onClick={this.cutVolume}
            >
              <FontAwesomeIcon icon={this.state.volumeIcon} />
            </Button>

          </div>


        </section>

      );

    } else if (isWin === true) {

      return (
        <Modal
          srcImg={require("./assets/images/happy.png")}
          class="win-img"
        >

          <div className='restart-div'>

            <div className='start-div-btn'>

              <Button
                classNameDiv="btnNum"
                onClick={this.startGame}
                className="new-game-btn btn"
              >
                Rejouer
              </Button>

            </div>

            <div className='difficulty-div'>

              <h4>Choisis ton niveau de difficulté</h4>

              <div className='difficulty-btn-div'>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("easy")}
                  type="button"
                >
                  Facile
                </Button>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("normal")}
                  type="button"
                >
                  Intermédiaire
                </Button>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("difficult")}
                  type="button"
                >
                  Difficile
                </Button>

              </div>

            </div>

            <Button className="cut-volume" onClick={this.cutVolume}>
              <FontAwesomeIcon icon={this.state.volumeIcon} />
            </Button>

          </div>

        </Modal>
      );

    } else if (isWin === false) {

      return (

        <Modal
          srcImg={require("./assets/images/doh.png")}
          class="loose-img"
        >

          <div className='restart-div'>

            <div className='start-div-btn'>

              <Button
                classNameDiv="btnNum"
                onClick={this.startGame}
                className="new-game-btn btn"
              >
                Rejouer
              </Button>

            </div>

            <div className='difficulty-div'>

              <h4>Choisis ton niveau de difficulté</h4>

              <div className='difficulty-btn-div'>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("easy")}
                  type="button"
                >
                  Facile
                </Button>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("normal")}
                  type="button"
                >
                  Intermédiaire
                </Button>

                <Button
                  classNameDiv="btnNum2"
                  className="difficulty-btn btn"
                  onClick={() => this.difficulty("difficult")}
                  type="button"
                >
                  Difficile
                </Button>

              </div>

            </div>

            <Button className="cut-volume" onClick={this.cutVolume}>
              <FontAwesomeIcon icon={this.state.volumeIcon} />
            </Button>

          </div>

        </Modal>

      );

    } else if (isPartyBegin === true && isWin === null) {

      return (

        <div className='background-div'>

          <div className={`container-guess ${this.state.animation}`}>

            <h1>THE GUESS</h1>

            <Form
              onChange={this.handleChange}
              answer={this.state.response}
            >{`Trouve le nombre mystère entre 0 & ${this.state.rules}`}</Form>

            <Button
              onClick={(e) => this.play(e)}
              className="go-btn btn"
              type="button"
            >
              GO !
            </Button>

            <Timer>00 <span className='clignote'>:</span> {this.state.count}</Timer>

            <Button className="cut-volume" onClick={this.cutVolume}>
              <FontAwesomeIcon icon={this.state.volumeIcon} />
            </Button>
          </div>


        </div>

      );

    };

  };

};

export default App;
