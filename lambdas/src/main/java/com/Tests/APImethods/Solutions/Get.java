package com.Tests.APImethods.Solutions;

import com.lambda.Model.CandidateTest;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class Get {
    @org.junit.Test
    public void Test() {
        assertEquals(Response.Status.UNAUTHORIZED,
                com.lambda.APImethods.Solutions.Get.handleRequest(new CandidateTest(), null));
    }
}
