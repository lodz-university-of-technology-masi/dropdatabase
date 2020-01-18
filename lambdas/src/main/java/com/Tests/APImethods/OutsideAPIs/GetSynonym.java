package com.Tests.APImethods.OutsideAPIs;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;
public class GetSynonym {
    @org.junit.Test
    public void Test() {
        assertEquals(Response.Status.INTERNAL_SERVER_ERROR,
                com.lambda.APImethods.OutsideAPIs.GetSynonym.handleRequest(null, null));
    }
}
