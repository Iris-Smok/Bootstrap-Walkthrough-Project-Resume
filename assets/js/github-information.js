function userInformationHTML(user) {
  // user is an object that's been returned from GitHub API https://docs.github.com/en/rest/reference/users you can console.log(user) to see all of the different things that you could display
  // this object has many methods such as the user's name,login name and links to their profile
  // we are going to return these in a formatted HTML string
  return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
  // takes one argument, repos the object returned from our GitHub API
  if (repos.length == 0) {
    // Github returns this object as an array so we will use standart length to see if it's equal to 0. If our array is empty and there are no repo for that user
    return `<div class ="clearfix repo-list">No repos!</div>`;
  }
  var listItemHTML = repos.map(function (repo) {
    // if data has been returned, then since it's an array, we want to iterate throught it and get that info out. So we are going to create a variable and that's going to take the results of the map() method
    // map method works like a forEach but it returns an array with the results of its function
    return `<li> 
                <a href ="${repo.html_url}" target="_blank">${repo.name}</a>

                </li>`; // this is the content of the array that we want to return
  });
  return `<div class="clearfix repo-list">
            <p>
                <strong>Repo List: </strong>
            </p>
            <ul>
                ${listItemHTML.join("\n")}
            </ul>
            </div>`;
}

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
    $.getJSON(`https://api.github.com/users/${username}`),
    // to issue the promise we use $.when method. When takes a function as its first argument.
    //We are going to pass int the funtion getJSON(). In here we can pass in the address of our GitHUb API and then the value of username that we've obtained from our input box
    $.getJSON(`https://api.github.com/users/${username}/repos`) // this will list the repo from that individual user
  ).then(
    // when that is done we want to do is to display it somehow in pur gh-user-data div
    function (firstResponse, secondResponse) {
      // we are doing two JSON call, we actually need to have two responses come back in our function
      // for that we have another function, which the first argument is response that came back from our getJSON() method
      var userData = firstResponse[0]; // we stored response in userData variable
      var repoData = secondResponse[0]; // when we do two calls the when() method packs a  response up into arrays, and each one is the first element of the array. So we need to put indexes on there for these responses
      $("#gh-user-data").html(userInformationHTML(userData)); // we selected the gh-user-data div and set the HTML to the results of another function userInformationHTML(userData) argument.
      $("#gh-repo-data").html(repoInformationHTML(repoData));
    },
    function (errorResponse) {
      //if the promose don't work put we add an error() function that takes  an errorResponse
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
      } else {
        console.log(errorResponse);
        $("#gh-user-data").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>` // if the error is not 404 then console.log entire error respone and set gh-user-data to say html error
        );
      }
    }
  );
}
