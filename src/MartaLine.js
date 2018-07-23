import React from "react";
import MartaTrain from "./MartaTrain";

const MartaLine = ({ colorOfLine, arrOfTrains }) => {
  let colorTrains = arrOfTrains.filter(train => {
      return train.LINE.toLowerCase() == colorOfLine
  });

  return <div>{colorTrains.map(_convertTrainToElement)}</div>;
};
const _convertTrainToElement = train => {
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

export default MartaLine;

// Similar to the MartaTrain component, create a MartaLine component
// Each MartaLine should display MartaTrain components
// Your MartaDashboard component should render MartaLine components instead of MartaTrain components
// Pass an array of train information to each MartaLine, with each array only containing trains that are on the Red Line (or Gold, or Blue)
