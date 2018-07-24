import React from "react";

import MartaLine from "./MartaLine";

//sort by order of stations
const stations = {};

const Marta_URL =
  "https://my-little-cors-proxy.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1";
class MartaDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      visibleLineNames: ["green", "blue", "red", "gold"]
    };
  }

  render() {
    let martaLines = this.state.visibleLineNames.map(line => {
      return <MartaLine colorOfLine={line} arrOfTrains={this.state.data} />;
    });

    return (
      <div>
        <h1 className="border border-primary">
          Marta! Why you late all the time?!
        </h1>
        <div>
          <button onClick={()=> { this._toggleLine("all")}}>All Lines</button>
          <button onClick={()=> { this._toggleLine("green")}}>green</button>
          <button onClick={()=> { this._toggleLine("blue")}}>blue</button>
          <button onClick={()=> { this._toggleLine("red")}}>red</button>
          <button onClick={()=> { this._toggleLine("gold")}}>gold</button>
        </div>
        {martaLines}

        {/* <MartaLine 
        colorOfLine= "blue"
        arrOfTrains= {this.state.data}
        />
        <MartaLine 
        colorOfLine= "gold"
        arrOfTrains= {this.state.data}
        /> */}
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

  //sortByTime needs to recieve an array- so we pass in the trainArrayInfo which could be called anything "jeff"

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


  //subtracts the lines from the screen once clicked
  _toggleLine = (nameOfLine) => {
      //check if nameOfLine is 'all'
        if(nameOfLine === "all") {
            this.setState({
                visibleLineNames: ["green", "blue", "red", "gold"]
            })
        } else {
      //if not, check if nameOfLine is in this.state.visibleLineNames
            if (this.state.visibleLineNames.includes(nameOfLine)) {
                //if so, filter it out
                this.setState({
                    visibleLineNames: this.state.visibleLineNames.filter(name => name !== nameOfLine)
                })
            } else {
                //otherwise put it in
                this.setState({
                    visibleLineNames: [nameOfLine]
                })
            }
    }
      

  }

}

export default MartaDashboard;
