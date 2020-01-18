package com.Tests.Model;

import com.lambda.Model.UserTest;

import static org.junit.Assert.assertEquals;

public class TestUser {
    @org.junit.Test
    public void Test() {
        UserTest temp = new UserTest();
        assertEquals(temp, temp);
    }
}
