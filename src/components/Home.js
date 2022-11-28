import React, { useEffect, useState } from "react";
import HDB_Carpark_Information from "./HDB_Carpark_Information";
import CarparkAvailability from "./CarparkAvailability";
import Search from "./Search";

import AvailabilityCard from "./AvailabilityCard";
import "./availability.css";

const Home = (props) => {
  // today date
  const someDate = new Date(); //Mon Nov 28 2022 15:56:27 GMT+0800 (Singapore Standard Time)

  const today = new Date(someDate).toDateString(); //Mon Nov 28 2022

  const time = new Date(someDate.getTime()).toLocaleTimeString(); //3:57:19 PM

  //retrived carpark info from HDB carpark information

  const [dataRetrievedHDBCarparkInfo, setDataRetrievedHDBCarparkInfo] =
    useState("");

  const retrieveDataFromInfo = (data) => {
    setDataRetrievedHDBCarparkInfo(data);
  };
  //retrived carpark info from HDB carpark information
  const [dataRetrievedAvailability, setDataRetrievedAvailability] =
    useState("");

  const retrieveDataFromAvailability = (data) => {
    setDataRetrievedAvailability(data);
  };

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
    if (dataRetrievedHDBCarparkInfo.length > 0) {
      for (let i = 0; i < dataRetrievedHDBCarparkInfo.length; i++) {
        temp[dataRetrievedHDBCarparkInfo[i].car_park_no.toUpperCase()] =
          dataRetrievedHDBCarparkInfo[i].address.toUpperCase();
      }

      setHDBInfoObject(temp);
    }
  }, [dataRetrievedHDBCarparkInfo]);

  // to make array for Availability
  useEffect(() => {
    const CPAvail = [];
    for (let i = 0; i < dataRetrievedAvailability.length; i++) {
      if (dataRetrievedAvailability[i].lots_available != 0) {
        //show the lot that not 0
        CPAvail.push({
          car_park_no: dataRetrievedAvailability[i].car_park_no.toUpperCase(),
          lots_available: dataRetrievedAvailability[i].lots_available,
        });
      }
    }

    setCPAvail(CPAvail);
  }, [dataRetrievedAvailability]);

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
      <h1 className="header">Carpark Availability</h1>
      <span className="date">Date = {today} </span>
      <p></p>
      <span className="date">Time = {time} </span>

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
      <HDB_Carpark_Information onSave={retrieveDataFromInfo} />
      <CarparkAvailability onSaved={retrieveDataFromAvailability} />
      <div className="table">
        <p></p>
        <AvailabilityCard
          carparkNumber="Carpark Number"
          address="Address"
          availability="Lots Available"
        />

        {CPSelected.map((item, i) => {
          return (
            <AvailabilityCard
              carparkNumber={item.car_park_no}
              address={HDBInfoObj[item.car_park_no]}
              availability={item.lots_available}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
