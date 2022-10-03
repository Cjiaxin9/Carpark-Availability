import React, { useEffect, useState } from "react";

const CarparkAvailability = (props) => {
  const [carparkAvailability, setCarparkAvailability] = useState("");

  const fetchPost = async (url, signal) => {
    const res = await fetch(url, { signal });
    const data = await res.json();
    setCarparkAvailability(data.items[0].carpark_data);
  };

  useEffect(() => {
    const url = "https://api.data.gov.sg/v1/transport/carpark-availability";
    fetchPost(url);
  }, []);
  let availability = [];

  useEffect(() => {
    for (let i = 0; i < carparkAvailability.length; i++) {
      availability.push({
        car_park_no: carparkAvailability[i].carpark_number,
        lots_available: carparkAvailability[i].carpark_info[0].lots_available,
        total_lots: carparkAvailability[i].carpark_info[0].total_lots,
        lot_type: carparkAvailability[i].carpark_info[0].lot_type,
        dateTime: carparkAvailability[i].update_datetime,
      });
    }

    // console.log(availability);
    props.onSaved(availability);
  }, [carparkAvailability]);
  return <React.Fragment></React.Fragment>;
};

export default CarparkAvailability;
