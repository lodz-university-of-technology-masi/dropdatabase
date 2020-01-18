package com.Tests.Cognito;


import static org.junit.Assert.assertNull;
public class CognitoRSAKeyProvider {
    @org.junit.Test
    public void Test() {
        assertNull(new com.lambda.Cognito.CognitoRSAKeyProvider().getPrivateKeyId());
    }
}
