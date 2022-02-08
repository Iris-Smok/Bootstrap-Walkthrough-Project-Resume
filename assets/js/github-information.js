function fetchGitHubInformation(event) {
  var username = $("#gh-username").val(); // create a variable to hold the username that we typed, used jQuery to select the gh-username ID and the value in the text field

  if (!username) {
    $("#gh-user-data").html(`<h2>Please eneter a Github username</h2>`); // if the username field is empty, there's no value then we are going to return a little piece of HTML
    return; // we don't want to go off looking at the GitHUb API if the field is empty so we're just going to return out this function
  }
  $("#gh-user-data")
    .html(
      // if text has been inputted into the field, then we're going to set our HTML to display a loader
      `<div id="loader"> 
      <img src= "/assets/css/loader.gif" alt="loading..."/>
      </div>`
    )
    .css("text-align", "center");

  $.when(
    $.getJSON(`http://api.github.com/users/${username}`)
    // to issue the promise we use $.when method. When takes a function as its first argument.
    //We are going to pass int the funtion getJSON(). In here we can pass in the address of our GitHUb API and then the value of username that we've obtained from our input box
  ).then(
    // when that is done we want to do is to display it somehow in pur gh-user-data div
    function (response) {
      // for that we have another function, which the first argument is response that came back from our getJSON() method
      var userData = response; // we stored response in userData variable
      $("gh-user-data").htmk(userInfromationHTML(userData)); // we selected the gh-user-data div and set the HTML to the results of another function userInformationHTML(userData) argument.
    },
    function (errorResponse) {
      //if the promose don't work put we add an error() function that takes  an errorResponse
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
      } else {
        console.log(errorResponse);
        $("gh-user-data").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>}` // if the error is not 404 then console.log entire error respone and set gh-user-data to say html error
        );
      }
    }
  );
}
