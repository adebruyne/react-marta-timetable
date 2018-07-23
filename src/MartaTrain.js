import React from "react";

const MartaTrain = ({ train }) => {
  const destination = train.DESTINATION;
  const line = train.LINE;
  const direction = train.DIRECTION;
  const waitTime = train.WAITING_TIME;
  const eventTime = train.EVENT_TIME;

  return (
    <div className="train">
      <h3>Destination:{destination}</h3>
      <p>Line:{line}</p>
      <p>Wait-time:{waitTime}</p>
      <p>Event-time:{eventTime}</p>
    </div>
  );
};

export default MartaTrain;

// Create a separate component for each train's information
// Import and render your new component in the MartaDashboard component
// Pass the marta train information as props to the MartaTrain component
// Add a few styles and formatting (e.g., border, bullet list, train line as an h1)
