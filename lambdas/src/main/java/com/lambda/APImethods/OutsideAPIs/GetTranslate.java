package com.lambda.APImethods.OutsideAPIs;

import com.amazonaws.services.lambda.runtime.Context;
import com.lambda.Model.APIRequestTest;
import com.lambda.Tools.TranslateTool;

import javax.ws.rs.core.Response;

public class GetTranslate {


    public static Object handleRequest(APIRequestTest request, Context context) {

        try {
            return TranslateTool.getTranslate(request.getText(), request.getLang());
        } catch (Exception ex) {
            return Response.Status.INTERNAL_SERVER_ERROR;
        }
    }
}
