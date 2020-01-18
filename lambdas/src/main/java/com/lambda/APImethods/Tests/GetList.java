package com.lambda.APImethods.Tests;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsyncClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.lambda.Cognito.Authorizer;
import com.lambda.Model.Test;
import com.lambda.Tools.ResponeBuilder;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class GetList {
    private static AmazonDynamoDB client = AmazonDynamoDBAsyncClientBuilder.defaultClient();
    private static DynamoDBMapper mapper = new DynamoDBMapper(client);

    public static Object handleRequest(Test request, Context context) {
        return ResponeBuilder.RequestRecruter(() -> {
            List<Test> output = new ArrayList<>();
            List<Test> input = mapper.scan(Test.class, new DynamoDBScanExpression());

            String userName = Authorizer.getUserName(request.getUser().getUserToken());
            Test[] tests = filterNull(input);
            return filterTests(tests, userName);
        }, request.getUser().getUserToken());
    }

    private static Test[] filterNull(List<Test> input) {
        return (Test[]) input.stream().filter(test -> test.getQuestions() != null && test.getUser() != null).toArray();
    }

    public static LinkedList<Test> filterTests(Test[] tests, String username) {
        LinkedList<Test> output = new LinkedList<>();
        for (Test test : tests) {
            if (test.getUser().getUserName().equals(username)) {
                output.add(test);
            }
        }
        return output;
    }

}
