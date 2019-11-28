
function signInButton() {
	var authenticationData = {
        Username : document.getElementById("inputUsername").value,
        Password : document.getElementById("inputPassword").value,
    };
	
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
	var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId, // Your client id here
    };
	
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
    var userData = {
        Username : document.getElementById("inputUsername").value,
        Pool : userPool,
    };
	
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
	cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
			var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);	
            /*window.open("https://dropdatabase-private.s3.amazonaws.com/Testowy/profile.html","_self");*/
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
  }

  function signOut(){
    if (cognitoUser != null) {
      cognitoUser.signOut();
      window.open('https://dropdatabase-private.s3.amazonaws.com/Testowy/login.html','_self')	  
    }
}
			
  function registerButton() {
    var username;
	var password;
	var personalname;
	var poolData;
	
	personalnamename =  document.getElementById("personalnameRegister").value;	
    username = document.getElementById("emailInputRegister").value;
    userClass = document.getElementById("userClass").value;
	
	if (document.getElementById("passwordInputRegister").value != document.getElementById("confirmationpassword").value) {
		alert("Passwords Do Not Match!")
		throw "Passwords Do Not Match!"
	} else {
		password =  document.getElementById("passwordInputRegister").value;	
	}
	
	poolData = {
			UserPoolId : _config.cognito.userPoolId, // Your user pool id here
			ClientId : _config.cognito.clientId // Your client id here
		};		
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	var attributeList = [];
	
	var dataEmail = {
		Name : 'email', 
		Value : username, //get from form field
    }
	
	var dataPersonalName = {
		Name : 'custom:custom:account_type', 
		Value : userClass, //get from form field
    };
	var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);
	
	
	attributeList.push(attributeEmail);
	attributeList.push(attributePersonalName);
	userPool.signUp(personalnamename, password, attributeList, null, function(err, result){
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
		}
		cognitoUser = result.user;
		console.log('user name is ' + cognitoUser.getUsername());
		//change elements of page
		document.getElementById("titleheader").innerHTML = "Check your email for a verification link";
		window.open("https://dropdatabase-private.s3.amazonaws.com/Testowy/login.html","_self");
	});
  }