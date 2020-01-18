package com.Tests.APImethods.OutsideAPIs;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;
public class GetTranslate {
    @org.junit.Test
    public void Test() {
        assertEquals(Response.Status.INTERNAL_SERVER_ERROR,
                com.lambda.APImethods.OutsideAPIs.GetTranslate.handleRequest(null, null));
    }
}
