import React from "react";
import "./availability.css";

const AvailabilityCard = (props) => {
  //     <div>
  //     <label>Carpark Number</label>
  //     <label>{props.carparkNumber}</label>
  //     <br />
  //     <label>Address</label>
  //     <label>{props.address}</label>
  //     <br />
  //     <label>Availability</label>
  //     <label>{props.availability}</label>
  //   </div>
  return (
    <div className="row">
      <div className="col-md-4">{props.carparkNumber}</div>
      <div className="col-md-4">{props.address}</div>
      <div className="col-md-4">{props.availability}</div>
    </div>
  );
};

export default AvailabilityCard;
