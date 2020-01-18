package com.lambda.Tools;

import com.lambda.Cognito.Authorizer;

import javax.ws.rs.core.Response;

public class ResponeBuilder {

    public interface Handle {
        Object handle();
    }

    public static Object RequestRecruter(Handle handle, String requestToken) {
        try {
            Authorizer.authenticate(requestToken);
        } catch (Exception ex) {
            return Response.Status.UNAUTHORIZED;
        }
        if (Authorizer.verify(requestToken)) {
            return handle.handle();
        } else {
            return Response.Status.UNAUTHORIZED;
        }
    }

    public static Object Request(Handle handle, String requestToken) {
        try {
            Authorizer.authenticate(requestToken);
        } catch (Exception ex) {
            return Response.Status.UNAUTHORIZED;
        }
        return handle.handle();
    }
}
