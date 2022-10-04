import React, { useEffect } from "react";

const CarparkAvailability = (props) => {
  const fetchPost = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    const theData = data.items[0].carpark_data;
    const carparkAvailability = [];

    for (let i = 0; i < theData.length; i++) {
      carparkAvailability.push({
        car_park_no: theData[i].carpark_number,
        lots_available: theData[i].carpark_info[0].lots_available,
        total_lots: theData[i].carpark_info[0].total_lots,
        lot_type: theData[i].carpark_info[0].lot_type,
        dateTime: theData[i].update_datetime,
      });
    }

    props.onSaved(carparkAvailability);
  };

  useEffect(() => {
    const url = "https://api.data.gov.sg/v1/transport/carpark-availability";
    fetchPost(url);
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default CarparkAvailability;
