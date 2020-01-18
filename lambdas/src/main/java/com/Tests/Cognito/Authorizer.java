package com.Tests.Cognito;

import static org.junit.Assert.assertEquals;
public class Authorizer {
    @org.junit.Test
    public void Test() {
        assertEquals(Boolean.FALSE,
                com.lambda.Cognito.Authorizer.verify(""));
    }
}
