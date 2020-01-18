package com.lambda.APImethods.Tests;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsyncClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.lambda.Cognito.Authorizer;
import com.lambda.Model.Test;
import com.lambda.Tools.ResponeBuilder;

import javax.ws.rs.core.Response;

public class Post {

    private static AmazonDynamoDB client = AmazonDynamoDBAsyncClientBuilder.defaultClient();
    private static DynamoDBMapper mapper = new DynamoDBMapper(client);

    public static Object handleRequest(Test request, Context context) {
        return ResponeBuilder.RequestRecruter(() -> {
            request.getUser().setUserName(Authorizer.getUserName(request.getUser().getUserToken()));
            mapper.save(request);
            return Response.Status.CREATED;
        }, request.getUser().getUserToken());
    }
}
