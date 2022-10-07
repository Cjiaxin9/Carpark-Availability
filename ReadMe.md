Project #2: HDB Carpark Availability Webpage

1. User Stories
   a. The user can search the available lots by carpark number or address

2. Hierarchy chart of the Webpage
<p></p>
  <img src="https://www.linkpicture.com/q/Hierarchychart.png" type="image"></a>

3. APIs Used
   a. HDB Carpark Information: [Data.gov.sg]
   (https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2182)

   b. Carpark availability: [Data.gov.sg]
   (https://api.data.gov.sg/v1/transport/carpark-availability)

4. React Element

   a. components

   1. HDB Carpark information : fetch the data for the carpark no and address
   2. Carpark Availability : fetch the data for carpark no and lots available
   3. Availability Card : display the carpark no , address and lots available
   4. Search : update the handleuserInput, handleSubmit and onSearchAgain to search and display the correct information
   5. Home

      b. props

   6. Carpark Number
   7. Address
   8. Availability
   9. Handle input
   10. Handle submit
   11. On search again

       c. lifting state

   12. Data from HDB Carpark information
   13. Data from Carpark Availability

       d. states /setState

   14. ` `[query, setQuery]
   15. [userInput, setUserInput]
   16. ` `[hasSearched, setHasSearched]
   17. ` `[HDBInfoObj, setHDBInfoObject]
   18. [CPAvail, setCPAvail]
   19. [dataRetrievedAvailability, setDataRetrievedAvailability]
   20. [dataRetrievedHDBCarparkInfo, setDataRetrievedHDBCarparkInfo]

5. What would you like to add next?


   a. date and time
