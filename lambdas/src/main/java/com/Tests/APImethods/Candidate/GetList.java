package com.Tests.APImethods.Candidate;

import com.lambda.Model.Candidate;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;
public class GetList {
    @org.junit.Test
    public void Test() {
        assertEquals(Response.Status.UNAUTHORIZED, com.lambda.APImethods.Candidate.GetList.handleRequest(new Candidate(), null));
    }
}
