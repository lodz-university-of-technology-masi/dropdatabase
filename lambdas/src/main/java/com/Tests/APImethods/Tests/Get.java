package com.Tests.APImethods.Tests;

import com.lambda.Model.Test;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class Get {
    @org.junit.Test
    public void Test() {
        assertEquals(Response.Status.UNAUTHORIZED,
                com.lambda.APImethods.Tests.Get.handleRequest(new Test(), null));
    }

}
