package com.lambda.APImethods.Solutions;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsyncClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.lambda.Cognito.Authorizer;
import com.lambda.Model.Candidate;
import com.lambda.Model.CandidateTest;
import com.lambda.Model.Test;
import com.lambda.Tools.ResponeBuilder;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Put {
    private static AmazonDynamoDB client = AmazonDynamoDBAsyncClientBuilder.defaultClient();
    private static DynamoDBMapper mapper = new DynamoDBMapper(client);

    public static Object handleRequest(CandidateTest request, Context context) {
        return ResponeBuilder.Request(() -> {
            if (request.getScore() != null) {
                return Response.Status.NOT_ACCEPTABLE;
            } else if (request.getTest() == null) {
                return Response.Status.NOT_ACCEPTABLE;
            } else {
                request.setUsername(Authorizer.getUserName(request.getRequestToken()));

                Map<String, AttributeValue> eav = new HashMap<>();

                eav.put(":val", new AttributeValue()
                        .withS(request.getUsername()));
                DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                        .withFilterExpression(" candidateName =  :val ").withExpressionAttributeValues(eav);

                Candidate candidate = mapper.scan(Candidate.class, scanExpression).get(0);

                if (candidate.getDoneTests() != null) {
                    for (int i = 0; i < candidate.getDoneTests().size(); i++) {
                        if (candidate.getDoneTests().get(i).getTestUUID().equals(request.getTest().getTestUUID())) {
                            return "No kolego ten test juz był rozwiazywany";
                        }
                    }
                } else {
                    candidate.setDoneTests(new ArrayList<>());
                }

                Test doneTest = new Test();
                doneTest.setTestUUID(request.getTest().getTestUUID());
                candidate.getDoneTests().add(doneTest);
                request.setCandidateUUID(candidate.getTestUUID());
                request.setRecruiter(candidate.getRecruiterName());
                mapper.save(request);
                mapper.save(candidate);
                return Response.Status.ACCEPTED;
            }
        }, request.getRequestToken());
    }
}
