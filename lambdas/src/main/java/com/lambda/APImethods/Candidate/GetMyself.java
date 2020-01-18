package com.lambda.APImethods.Candidate;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsyncClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.lambda.Cognito.Authorizer;
import com.lambda.Model.Candidate;
import com.lambda.Model.Test;
import com.lambda.Tools.ResponeBuilder;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetMyself {
    private static AmazonDynamoDB client = AmazonDynamoDBAsyncClientBuilder.defaultClient();
    private static DynamoDBMapper mapper = new DynamoDBMapper(client);

    public static Object handleRequest(Candidate request, Context context) {
        return ResponeBuilder.Request(() -> {
            Map<String, AttributeValue> eav = new HashMap<>();
            eav.put(":val", new AttributeValue().withS(Authorizer.getUserName(request.getRequestToken())));
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("candidateName =  :val").withExpressionAttributeValues(eav);
            Candidate candidate;
            try {
                candidate = mapper.scan(Candidate.class, scanExpression).get(0);
            } catch (Exception ex) {
                return Response.Status.NOT_FOUND;
            }
            eav.clear();
            eav.put(":val", new AttributeValue().withS(candidate.getRecruiterName()));
            scanExpression = new DynamoDBScanExpression()
                    .withFilterExpression("testOwner.userName = :val").withExpressionAttributeValues(eav);
            List<Test> output = new ArrayList<>();
            List<Test> input = mapper.scan(Test.class, scanExpression);
            for (Test test : filterNull(input)) {
                for (Test done : candidate.getDoneTests()) {
                    if (checkTest(test.getTestUUID(), done.getTestUUID())) {
                        output.add(test);
                        break;
                    }
                }

            }
            return output;
        }, request.getRequestToken());
    }

    private static Test[] filterNull(List<Test> input) {
        return (Test[]) input.stream().filter(test -> test.getQuestions() != null && test.getUser() != null).toArray();
    }

    private static boolean checkTest(String testUUDI, String doneUUID) {
        return testUUDI.equals(doneUUID);
    }
}