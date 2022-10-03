import React, { useState } from "react";
import HDB_Carpark_Information from "./HDB_Carpark_Information";
import CarparkAvailability from "./CarparkAvailability";
import Search from "./Search";

const Home = (props) => {
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

  let userInput = "";

  const handleUserInput = (event) => {
    userInput = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(userInput);
  };
  // find query from HDB info
  let HDBinfo = [];
  for (let i = 0; i < dataRetrievedHDBCarparkInfo.length; i++) {
    if (
      dataRetrievedHDBCarparkInfo[i].car_park_no
        .toUpperCase()
        .includes(query.toUpperCase())
    ) {
      HDBinfo.push({
        car_park_no: dataRetrievedHDBCarparkInfo[i].car_park_no,
        address: dataRetrievedHDBCarparkInfo[i].address,
      });
    }
  }

  // find query from HDB info
  let CPAvail = [];
  for (let i = 0; i < dataRetrievedAvailability.length; i++) {
    if (
      dataRetrievedAvailability[i].car_park_no
        .toUpperCase()
        .includes(query.toUpperCase())
    ) {
      CPAvail.push({
        car_park_no: dataRetrievedAvailability[i].car_park_no,
        lots_available: dataRetrievedAvailability[i].lots_available,
      });
    }
  }

  //table
  function builtTable() {
    const infoTable = document.createElement("table");
    document.querySelector("body").append(infoTable);
    infoTable.className = "info-table";
    infoTable.innerHTML = `<thead>
  <tr>
      <th>Carpark number</th>
      <th>Address</th>
      <th>lots available</th>
  </tr>
</thead>`;

    for (let i = 0; i < HDBinfo.length; i++) {
      if (HDBinfo[i].car_park_no === CPAvail[i].car_park_no) {
        addData(
          HDBinfo[i].car_park_no,
          HDBinfo[i].address,
          CPAvail[i].lots_available
        );
      }
    }
  }

  // console.log(query);
  let result = [];
  function addData(car_park_no, address, lots_available, createTable = true) {
    if (!createTable) {
      result.push({
        car_park_no: car_park_no,
        address: address,
        "lots available": lots_available,
      });
    }
    const infoRow = document.createElement("tr");

    const carParkNoCell = document.createElement("td");
    carParkNoCell.classname = "Carpark number";
    carParkNoCell.innerText = car_park_no;

    const locationCell = document.createElement("td");
    locationCell.className = "address";
    locationCell.innerText = address;

    const lotAvailableCell = document.createElement("td");
    lotAvailableCell.className = "lots available";
    lotAvailableCell.innerText = lots_available;
    infoRow.append(carParkNoCell, locationCell, lotAvailableCell);

    const infoTable = document.querySelector("table");
    infoTable.append(infoRow);
  }

  builtTable();

  return (
    <div ClassName="container">
      <h1 className="header">HDB Carpark Availability</h1>
      <Search handleUserInput={handleUserInput} handleSubmit={handleSubmit} />
      <HDB_Carpark_Information onSave={retrieveDataFromInfo} />
      <CarparkAvailability onSaved={retrieveDataFromAvailability} />

      {/*  <div>{JSON.stringify([dataRetrievedHDBCarparkInfo])}</div>
      <div>{JSON.stringify([dataRetrievedAvailability])}</div>
      <div>{JSON.stringify([dataRetrievedAvailability[0].car_park_no])}</div>
      
 
        ))}
        </div>*/}
    </div>
  );
};

export default Home;
