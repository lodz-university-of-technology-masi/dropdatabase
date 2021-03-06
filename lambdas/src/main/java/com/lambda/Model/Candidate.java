package com.lambda.Model;


import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.util.List;

@DynamoDBTable(tableName = "cc_tests")
public class Candidate {

    private String testUUID;
    private String candidateName;
    private String recruiterName;
    private String requestToken;
    private List<Test> doneTests;



    public Candidate() {

    }


    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    public String getTestUUID() {
        return testUUID;
    }
    public void setTestUUID(String testUUID) {
        this.testUUID = testUUID;
    }

    @DynamoDBAttribute(attributeName = "candidateName")
    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    @DynamoDBAttribute(attributeName = "recruiterName")
    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }

    @DynamoDBAttribute(attributeName = "doneTests")
    public List<Test> getDoneTests() {
        return doneTests;
    }

    public void setDoneTests(List<Test> doneTests) {
        this.doneTests = doneTests;
    }

    @DynamoDBIgnore
    public String getRequestToken() {
        return requestToken;
    }

    public void setRequestToken(String requestToken) {
        this.requestToken = requestToken;
    }
}
