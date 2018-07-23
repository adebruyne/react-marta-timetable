import React from "react";
import MartaTrain from "./MartaTrain";

//sort by order of stations
const stations = {};

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
        <h1 className="border border-primary">
          Marta! Why you late all the time?!
        </h1>
        {this.state.data.map(this._convertTrainToElement)}
      </div>
    );
  }

  componentDidMount() {
    this._getMartaData();
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
      .then(this._sortByTime)
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
    // let trainPara = (
    //   <p key={train.TRAIN_ID}>
    //     {train.DESTINATION},
    //     {train.LINE},
    //     {train.DIRECTION},
    //     {train.WAITING_TIME}
    //   </p>
    // );

    return <MartaTrain key={train.TRAIN_ID} train={train} />;
  };

  _sortByTime = trainArrayInfo => {
    trainArrayInfo.sort(function(a, b) {
      let aTime = new Date(a.EVENT_TIME);
      let bTime = new Date(b.EVENT_TIME);

      if (aTime < bTime) {
        return -1;
      } else if (bTime < aTime) {
        return 1;
      } else {
        return 0;
      }
    });
    return trainArrayInfo;
  };
}

export default MartaDashboard;
