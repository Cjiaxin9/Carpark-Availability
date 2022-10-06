import React, { useEffect, useState } from "react";
import Search from "./Search";
import useFetch from "../hooks/useFetch";
import AvailabilityCard from "./AvailabilityCard";
import "./availability.css";

const Home = (props) => {
  //retrived carpark info from HDB carpark information
  const HDBData = useFetch(
    "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2182"
  );
  const [dataRetrievedHDBCarparkInfo, setDataRetrievedHDBCarparkInfo] =
    useState([]);
  useEffect(() => {
    setDataRetrievedHDBCarparkInfo(HDBData);
  });
  const HDBDataInfo = dataRetrievedHDBCarparkInfo.result?.records;
  const HDBCarparkInfo = [];
  useEffect(() => {
    for (let i = 0; i < HDBDataInfo?.length; i++) {
      HDBCarparkInfo.push({
        car_park_no: HDBDataInfo[i].car_park_no,
        address: HDBDataInfo[i].address,
      });
    }
  }, [HDBDataInfo]);

  //retrived carpark info from HDB carpark information
  const availData = useFetch(
    "https://api.data.gov.sg/v1/transport/carpark-availability"
  );
  const [dataRetrievedAvailability, setDataRetrievedAvailability] = useState(
    []
  );
  useEffect(() => {
    setDataRetrievedAvailability(availData);
  });

  const carparkAvailability = [];
  const availDataInfo = dataRetrievedAvailability.items?.[0].carpark_data;
  useEffect(() => {
    for (let i = 0; i < availDataInfo?.length; i++) {
      carparkAvailability.push({
        car_park_no: availDataInfo[i].carpark_number,
        lots_available: availDataInfo[i].carpark_info[0].lots_available,
      });
    }
  }, [availDataInfo]);

  // Search for Nos
  const [query, setQuery] = useState(""); //(Carpark no being searched)
  const [userInput, setUserInput] = useState(""); // User Input
  const [hasSearched, setHasSearched] = useState(false); //boolean determining
  const [HDBInfoObj, setHDBInfoObject] = useState({});
  const [CPAvail, setCPAvail] = useState([]);
  // by CP number
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(userInput);
    setHasSearched(true);
  };

  useEffect(() => {
    // convert from array to  key-value pairs
    const temp = {};
    if (HDBCarparkInfo.length > 0) {
      for (let i = 0; i < HDBCarparkInfo.length; i++) {
        temp[HDBCarparkInfo[i].car_park_no.toUpperCase()] =
          HDBCarparkInfo[i].address.toUpperCase();
      }

      setHDBInfoObject(temp);
    }
  }, [HDBCarparkInfo]);

  // to mark array for Availability
  useEffect(() => {
    const CPAvail = [];
    for (let i = 0; i < carparkAvailability.length; i++) {
      CPAvail.push({
        car_park_no: carparkAvailability[i].car_park_no.toUpperCase(),
        lots_available: carparkAvailability[i].lots_available,
      });
    }

    setCPAvail(CPAvail);
  }, [carparkAvailability]);

  // find using value
  //filter the value in value
  let addressQuery = Object.values(HDBInfoObj);
  function checkaddress(addressQuery) {
    return addressQuery.includes(query.toUpperCase());
  }
  let searchAddress = addressQuery.filter(checkaddress); // have the value(address)

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  let CPKeyFromValue = []; //key search using address
  for (let i = 0; i < searchAddress.length; i++) {
    CPKeyFromValue.push(getKeyByValue(HDBInfoObj, searchAddress[i]));
  }

  //query
  let CPSelected = [];
  for (let i = 0; i < CPAvail.length; i++) {
    if (CPAvail[i].car_park_no.includes(query.toUpperCase())) {
      CPSelected.push({
        car_park_no: CPAvail[i].car_park_no,
        lots_available: CPAvail[i].lots_available,
      });
    }
    if (CPKeyFromValue[i]) {
      CPSelected.push({
        car_park_no: CPKeyFromValue[i],
        lots_available: CPAvail[i].lots_available,
      });
    }
  }
  const onSearchAgain = (event) => {
    setQuery("");
    setHasSearched(false);
  };
  return (
    <div ClassName="container">
      <h1 className="header">HDB Carpark Availability</h1>
      <Search
        handleUserInput={handleUserInput}
        handleSubmit={handleSubmit}
        hasSearched={hasSearched}
        onSearchAgain={onSearchAgain}
      />
      {hasSearched ? (
        <img
          className="image"
          src="https://media.giphy.com/media/NfY2xu127irrG/giphy.gif"
        />
      ) : (
        <img
          className="image"
          src="https://media.giphy.com/media/SclQC1VGlH0GyQvbkr/giphy.gif"
        />
      )}

      <div className="table">
        <p></p>
        <AvailabilityCard
          carparkNumber="Carpark Number"
          address="Address"
          availability="Lots Available"
        />
        {CPSelected.map((item) => {
          return (
            <AvailabilityCard
              carparkNumber={item.car_park_no}
              address={HDBInfoObj[item.car_park_no]}
              availability={item.lots_available}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
