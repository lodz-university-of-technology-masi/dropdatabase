package com.Tests.APImethods.Tests;

import com.lambda.Model.Test;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class Post {
    @org.junit.Test
    public void Test() {
        assertEquals(Response.Status.UNAUTHORIZED,
                com.lambda.APImethods.Tests.Post.handleRequest(new Test(), null));
    }
}
