// Write your helper functions here!
require("isomorphic-fetch");

//adds HMTL to display info of the trip
function addDestinationInfo(
  document, name, diameter, star, distance, moons, imageUrl
) {
  document.innerHTML += `<h2>Mission Destination<h2>
    <ol>   
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`;
}

//returning true means it is a string!
function validateInput(testInput) {
return testInput;
  }
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

  allInputs = [pilot, copilot, fuelLevel, cargoLevel];
  //checks to see if anything is empty. for number stuff, also checks if they are NaN.
  if (
    validateInput(pilot) === '' ||
    validateInput(copilot) === '' ||
    validateInput(fuelLevel) === '' || validateInput(fuelLevel) === NaN ||
    validateInput(cargoLevel) === '' || validateInput(cargoLevel) === NaN
  ) {
    alert("All fields are required!");

    //if no issues found, continue with test that checks each field is correct type:
  } else {
    if (
      (validateInput(pilot)).length != 0 && isNaN(validateInput(pilot)) &&
      (validateInput(copilot)).length != 0 && isNaN(validateInput(copilot)) &&
      !isNaN(parseInt(validateInput(fuelLevel))) &&
      !isNaN(parseInt(validateInput(cargoLevel)))
        ) 
    {

        console.log('fuel level after parseInt is:' + (validateInput(fuelLevel)))
      //code to execute if all checks pass

      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let launchStatus = document.getElementById("launchStatus");

      pilotStatus.innerHTML = `Pilot ${pilot} Ready`;
      copilotStatus.innerHTML = `Co-pilot ${copilot} Ready`;

      //custom function to toggle launch status.
      function toggleLaunchStatusRed(ready) {
        if (ready) {
          launchStatus.style = "Color: rgb(65, 159, 106)";
          launchStatus.innerHTML = "Shuttle is ready for launch";
        } else {
          launchStatus.style = "Color: rgb(199, 37, 78);";
          launchStatus.innerHTML = "Shuttle not ready for launch";
        }
      }

      list.style = "visibility: visible;";

      //defaults text warnings in case user puts in incompatable info, then puts in correct info.
      fuelStatus.innerHTML = "Fuel level high enough for launch";
      cargoStatus.innerHTML = "Cargo mass low enough for launch";

      //Each warning text has it's own if statement, chaining them with if/else if doesn't work.
      //these are seperate because we want to do something different if something goes wrong.
      if (fuelLevel < 10000) {
        fuelStatus.innerHTML = "Insufficient fuel for the journey!";
      }

      if (cargoLevel > 10000) {
        cargoStatus.innerHTML = "Cargo mass too high for launch!";
      }

      //if we find something wrong (true), then warn user.
      if (fuelLevel < 10000 || cargoLevel > 10000) {
        toggleLaunchStatusRed(false);
      } else {
        toggleLaunchStatusRed(true);
      }

      //if previous validateInputs are not correct:
    } else {
      alert("Please enter the correct type of info!");
    }
  }
}

async function myFetch() {
  let planetsReturned;

  //await makes sure we only continue after grabbing the .json
  planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    //if we get an error response (400 and up)
    if (response.status >= 400){
        throw new Error ('Planets not found!')
    } else {
        //if everything goes well, return the list of planets!
    return response.json();
    }
  });
  return planetsReturned;
}

//randomly chooses a planet to use
function pickPlanet(planets) {
  return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;
