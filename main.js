'use strict'


window.onload = function() {
	main();
}

function main() {
}

function validation(event){

    var email=document.getElementById("email").value.trim();
    var password=document.getElementById("password").value.trim();
    var error= false;

    var emailexpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var passwordexpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (emailexpression.test(email)){
        console.log("Valid email");
        if (passwordexpression.test(password) && password.length >=8){
            //console.log("Valid password");
            return true;
        }
        else{
            alert("Invalid password");
            return false;
        }        
    }

    if (error){
        alert("Invalid email");
        return false;
    }
}


function getpagedata(event, pagename, paramspage) {
	var prefix = "./";
	var suffix = ".php";
	var pagelink = prefix + pagename + suffix;

	if (paramspage != "") {
		pagelink = pagelink + paramspage;
	}
	getdata(event, pagelink, findelementbyid("content"));
}


function findelementbyid(id) {
	return document.getElementById(id);
}



function passdata(event, to, formdata, setto) {
	event.preventDefault();
	fetch(to, { method: 'POST', body: formdata })
	  .then(function(response) {
      if (response.status !== 200) {
        console.error(`Something went wrong. Status Code: ${response.status}`);
        // todo : write code to show user an error message, like a popup
        return;
      }

      // Get data and update ui
      response.text().then(function(promise) {
          updateUI(setto, promise);
      });
	  })
	  .catch(function(error) {
      console.error(`Fetching error: ${error}`);
	  });
}


function getdata(event, from, setto) {
	event.preventDefault();
	fetch(from)
	  .then(function(response) {
      if (response.status !== 200) {
        console.error(`Something went wrong. Status Code: ${response.status}`);
        // todo : write code to show user an error message, like a popup
        return;
      }

      // Get data and update ui
      response.text().then(function(promise) {
        setto.innerHTML = promise;
      });
	  })
	  .catch(function(error) {
      console.error(`Fetching error: ${error}`);
	  });
}


function logout() {
	if (confirm("Are you sure?")) {
		getpagedata(event, "logout", "");
		findelementbyid("side_bar").remove();
	}
}


function newuserlink() {
	getpagedata(event, "new_user", "");
}

function newissuelink() {
	getpagedata(event, "new_issue", "");	
}



function validatenewuserform(event) {
	event.preventDefault();
	var firstname = findelementbyid("firstname").value;
	var lastname = findelementbyid("lastname").value;
	var password = findelementbyid("password").value;
	var email = findelementbyid("email").value;

	var formdata = new FormData();
	formdata.append("firstname", firstname);
	form_dta.append("lastname", lastname);
	formdata.append("password", password);
	formdata.append("email", email);

	passdata(event, "./new_user.php", formdata, findelementbyid("content"));
}


function validatenewissueform(event) {
	event.preventDefault();
	var title = findelementbyid("title").value;
	var description = findelementbyid("description").value;
	var assigned = findelementbyid("assigned").value;
	var type = findelementbyid("type").value;
	var priority = findelementbyid("priority").value;

	var form_data = new FormData();
	form_data.append("title", title);
	form_data.append("description", description);
	form_data.append("assigned", assigned);
	form_data.append("type", type);
	form_data.append("priority", priority);

	passdata(event, "./home.php", formdata, findelementbyid("content"));
}