package com.lambda.Cognito;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;


public class Authorizer {

    private static Algorithm algorithm = Algorithm.RSA256(new CognitoRSAKeyProvider());
    private static JWTVerifier verifier = JWT.require(algorithm)
            .withIssuer("https://cognito-idp.us-east-1.amazonaws.com/us-east-1_rHL3nVPk0")
            .build();

    public static Object authenticate(String token) {
        return verifier.verify(token);
    }

    public static Boolean verify(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        String roleID = decodedJWT.getClaim("custom:custom:account_type").asString();
        return Integer.valueOf(roleID) == 1;
    }

    public static String getUserName(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getClaim("cognito:username").asString();
    }
}
