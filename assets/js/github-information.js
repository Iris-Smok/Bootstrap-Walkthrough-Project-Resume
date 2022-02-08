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
}
