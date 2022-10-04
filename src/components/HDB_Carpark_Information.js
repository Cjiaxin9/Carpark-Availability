import React, { useEffect } from "react";

const HDB_Carpark_Information = (props) => {
  const fetchPost = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    const theData = data.result.records;
    const HDBCarparkInfo = [];

    for (let i = 0; i < theData.length; i++) {
      HDBCarparkInfo.push({
        car_park_no: theData[i].car_park_no,
        address: theData[i].address,
      });
    }

    props.onSave(HDBCarparkInfo);
  };

  useEffect(() => {
    const url =
      "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2182";
    fetchPost(url);
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default HDB_Carpark_Information;
