package com.lambda.Cognito;

import com.auth0.jwk.*;
import com.auth0.jwt.interfaces.RSAKeyProvider;

import java.net.MalformedURLException;
import java.net.URL;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public class CognitoRSAKeyProvider implements RSAKeyProvider {

    public RSAPublicKey getPublicKeyById(String token) {
        try {
            JwkProvider provider = new UrlJwkProvider(new URL("https://cognito-idp.us-east-1.amazonaws.com/us-east-1_rHL3nVPk0/.well-known/jwks.json"));
            Jwk jwk = provider.get(token);
            return (RSAPublicKey) jwk.getPublicKey();
        }
        catch (InvalidPublicKeyException e) {
            return null;
        } catch (JwkException e) {
            return null;
        } catch (MalformedURLException e) {
            return null;
        }
    }

    public RSAPrivateKey getPrivateKey() {
        return null;
    }

    public String getPrivateKeyId() {
        return null;
    }
}
