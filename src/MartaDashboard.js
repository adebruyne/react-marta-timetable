import React from "react";

const Marta_URL =
  "https://my-little-cors-proxy.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1";
class MartaDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div>
        <h1>Marta! Why you late all the time?!</h1>
        {this.state.data.map(this._convertTrainToElement)}
      </div>
    );
  }

  componentDidMount() {
    setInterval(this._getMartaData, 5000);
  }

  //////ALL the extra helper functions///////////
  _getMartaData = () => {
    console.log("about to fetch");
    fetch(Marta_URL, {
      method: "get"
    })
      .then(response => {
        console.log("got a response");
        return response.json();
      })
      //this cleans up the duplicated infor
      .then(this._cleanUpMarta)
      .then(jsonData => {
        console.log(jsonData);
        console.log("got the date");
        this.setState(
          {
            data: jsonData
          },
          () => {
            console.log("you should now see the data");
          }
        );
      })
      .catch(err => {
        // Error :(
      });
  };

  _cleanUpMarta = allTrainArray => {
    let trainsById = new Map();
    allTrainArray.forEach(train => {
      trainsById.set(train.TRAIN_ID, train);
    });
    let justTheTrains = trainsById.values();
    return Array.from(justTheTrains);
    //Array.from converts information into an array
  };

  _convertTrainToElement = train => {
    let trainPara = (
      <p key={train.TRAIN_ID}>
        {train.DESTINATION},
        {train.LINE},
        {train.DIRECTION},
        {train.WAITING_TIME}
      </p>
    );

    return trainPara;
  };
}

export default MartaDashboard;
