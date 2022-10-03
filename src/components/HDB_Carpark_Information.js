import React, { useEffect, useState } from "react";

const HDB_Carpark_Information = (props) => {
  const [HDBCarparkInformationPost, setHDBCarparkInformationPost] =
    useState("");

  const fetchPost = async (url, signal) => {
    const res = await fetch(url, { signal });

    const data = await res.json();
    setHDBCarparkInformationPost(data.result.records);
    // console.log(HDBCarparkInformationPost); // => this works
  };

  let HDBCarparkInfo = [];

  useEffect(() => {
    const url =
      "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2182";
    fetchPost(url);
  }, []);
  useEffect(() => {
    for (let i = 0; i < HDBCarparkInformationPost.length; i++) {
      HDBCarparkInfo.push({
        car_park_no: HDBCarparkInformationPost[i].car_park_no,
        address: HDBCarparkInformationPost[i].address,
      });
    }
    // console.log(HDBCarparkInfo);
    props.onSave(HDBCarparkInfo);
  }, [HDBCarparkInformationPost]);

  return <div></div>;
};

export default HDB_Carpark_Information;
