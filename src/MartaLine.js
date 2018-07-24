import React from "react";
import MartaTrain from "./MartaTrain";


// example usage: a bunch of trains , red line 

const MartaLine = ({ colorOfLine, arrOfTrains }) => {

    //we filter by the color of the train and we'll compare to the lower case version
    //so the "bouncer" aka .filter asks the first train if its red, then it passes into the club aka gets drawn the the screen

  let colorTrains = arrOfTrains.filter(train => {
      return train.LINE.toLowerCase() == colorOfLine
  });

  return <div>{colorTrains.map(_convertTrainToElement)}</div>;
};



const _convertTrainToElement = (train) => {
  return <MartaTrain key={train.TRAIN_ID} train={train} />;
};

export default MartaLine;

// Similar to the MartaTrain component, create a MartaLine component
// Each MartaLine should display MartaTrain components
// Your MartaDashboard component should render MartaLine components instead of MartaTrain components
// Pass an array of train information to each MartaLine, with each array only containing trains that are on the Red Line (or Gold, or Blue)
