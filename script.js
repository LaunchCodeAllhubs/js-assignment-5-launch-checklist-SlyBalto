import { formSubmission, validateInput, myFetch } from "./scriptHelper";

window.addEventListener("load", function() {

    submitButton = document.getElementById('formSubmit')
    form = document.getElementById('testForm')

    submitButton.addEventListener('submit', function(event) {
    event.preventDefault()
    console.log('something')
    alert('showing')
    // validateInput(form)
    formSubmission();
    })

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse;
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   })
   
});