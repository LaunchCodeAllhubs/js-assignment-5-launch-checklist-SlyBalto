// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

    document.innerHTML += `<h2>Mission Destination<h2>
    <ol>   
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`
}

//returning true means it is a string!
function validateInput(testInput) {
    if (typeof testInput === 'string' || isNaN(testInput)){
        return true
    } else {
        return false
    }
}

//Known issues: entries requiring numbers left empty are read as strings, instead showing user wrong error. 'list' argument is not used.
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
console.log(pilot, copilot, fuelLevel, cargoLevel)
    
    allInputs = [pilot, copilot, fuelLevel, cargoLevel]
    //clever way to check if anything is empty. found online. fun way to remember how to use the some() is to think 'somebody in the group say "yes!" '. group refers to the array. 'say yes' refers to an element that fulfills the condition given to some()
    if (allInputs.some(input => input.length === 0)) {
        alert('All fields are required!')
    
    //if no length issues found, continue with test that checks each field is correct type:
    } else {
    if (validateInput(pilot) === true &&
    validateInput(copilot) === true &&
    validateInput(fuelLevel) === false &&
    validateInput(cargoLevel) === false) {
        
    //code to execute if all checks pass
    
    let faultyItems = document.getElementById('faultyItems')
    let pilotStatus = document.getElementById('pilotStatus')
    let copilotStatus = document.getElementById('copilotStatus')
    let fuelStatus = document.getElementById('fuelStatus')
    let cargoStatus  = document.getElementById('cargoStatus')
    let launchStatus = document.getElementById('launchStatus')

    pilotStatus.innerHTML = `Pilot ${pilot} Ready`
    copilotStatus.innerHTML = `Co-pilot ${copilot} Ready`
    
    //custom function to toggle launch status.
    function toggleLaunchStatusRed(ready) {
        if (ready){
            launchStatus.style = 'Color: rgb(65, 159, 106)'
            launchStatus.innerHTML = 'Shuttle is ready for launch'
        } else {
            launchStatus.style = 'Color: rgb(199, 37, 78);'
            launchStatus.innerHTML = 'Shuttle not ready for launch'
        }
    }

    faultyItems.style = 'visibility: visible;'

    //defaults text warnings in case user puts in incompatable info, then puts in correct info.
    fuelStatus.innerHTML = 'Fuel level high enough for launch'
    cargoStatus.innerHTML = 'Cargo mass low enough for launch'

    //Each warning text has it's own if statment, chaining them with if/else if doesn't work.
    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = 'Insufficient fuel for the journey!'
    }

    if (cargoLevel > 10000) {
        cargoStatus.innerHTML = 'Cargo mass too high for launch!'
    }

    //if we find something wrong (true), then warn user.
    if (fuelLevel < 10000 || cargoLevel > 10000) {
        toggleLaunchStatusRed(false)
    } else {
        toggleLaunchStatusRed(true)
    }
    
    //if validateInputs are not correct:
    } else {
        alert('Please enter the correct type of info!')
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * (planets.length))]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;