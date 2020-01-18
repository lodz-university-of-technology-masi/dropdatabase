package com.Tests.Tools;

import static org.junit.Assert.assertEquals;

public class TranslateTool {
    @org.junit.Test
    public void Test() {
        assertEquals("TestTest", com.lambda.Tools.TranslateTool.getTranslate("TestTest", "pl-en"));
    }
}
