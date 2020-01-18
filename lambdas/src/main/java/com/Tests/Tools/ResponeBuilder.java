package com.Tests.Tools;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class ResponeBuilder {
    @org.junit.Test
    public void Test() {
        assertEquals(Response.Status.UNAUTHORIZED, com.lambda.Tools.ResponeBuilder.Request(null, null));
    }
}
