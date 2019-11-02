
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
            window.open("https://dropdatabase-private.s3.amazonaws.com/Testowy/profile.html","_self");
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