window.addEventListener("load", function() {

    submitButton = document.getElementById('formSubmit')
    form = document.querySelector('form')
    let list = this.document.getElementById('faultyItems')

    form.addEventListener('submit', function(event) {
    event.preventDefault()
    missionTargetDiv = document.getElementById('missionTarget')
    
    let pilotName = form.pilotName.value
    let copilotName = form.copilotName.value
    let fuelLevel = form.fuelLevel.value
    let cargoMass = form.cargoMass.value || ''

    formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass);
    })

   let listedPlanets;

   //sets variable as what myFetch() returns
   let listedPlanetsResponse = myFetch()

   listedPlanetsResponse.then(function (result) {

    //makes new variable that contains a list of all the planets
       listedPlanets = result;
   }).then(function () {
       
       //picks a planet to use. then displays the information
        planetPicked = pickPlanet(listedPlanets)
        document.getElementById('missionTarget')
        addDestinationInfo(document.getElementById('missionTarget'), planetPicked.name, planetPicked.diameter, planetPicked.star, planetPicked.distance, planetPicked.moons, planetPicked.image)
   })
   
});