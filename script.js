window.addEventListener("load", function() {

    submitButton = document.getElementById('formSubmit')
    form = document.querySelector('form')

    form.addEventListener('submit', function(event) {
    event.preventDefault()
    missionTargetDiv = document.getElementById('missionTarget')
    
    let pilotName = form.pilotName.value.trim()
    let copilotName = form.copilotName.value.trim()
    let fuelLevel = parseInt(form.fuelLevel.value.trim())
    let cargoMass = parseInt(form.cargoMass.value.trim())

    //what does the second 'document' need to be? what does it need to do?
    formSubmission(document, document, pilotName, copilotName, fuelLevel, cargoMass);
    })

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch()

   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
    //    console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       
      
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        planetPicked = pickPlanet(listedPlanets)
        document.getElementById('missionTarget')
        addDestinationInfo(document.getElementById('missionTarget'), planetPicked.name, planetPicked.diameter, planetPicked.star, planetPicked.distance, planetPicked.moons, planetPicked.image)
   })
   
});