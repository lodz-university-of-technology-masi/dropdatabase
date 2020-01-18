package com.lambda.Model;


import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

@DynamoDBDocument
public class Question {

    private String answerA;
    private String answerB;
    private String answerC;
    private String answerD;
    private String correct;
    private String id;
    private String questionContent;
    private String questionAnswer;
    private boolean isOpen;
    private boolean isClosed;
    private boolean isNumerical;

    public Question() {
    }

    @DynamoDBAttribute(attributeName = "AnswerA")
    public String getAnswerA() {
        return answerA;
    }

    public void setAnswerA(String answerA) {
        this.answerA = answerA;
    }


    @DynamoDBAttribute(attributeName = "AnswerB")
    public String getAnswerB() {
        return answerB;
    }

    public void setAnswerB(String answerB) {
        this.answerB = answerB;
    }


    @DynamoDBAttribute(attributeName = "AnswerC")
    public String getAnswerC() {
        return answerC;
    }

    public void setAnswerC(String answerC) {
        this.answerC = answerC;
    }

    @DynamoDBAttribute(attributeName = "AnswerD")
    public String getAnswerD() {
        return answerD;
    }

    public void setAnswerD(String answerD) {
        this.answerD = answerD;
    }


    @DynamoDBAttribute(attributeName = "Correct")
    public String getCorrect() {
        return correct;
    }

    public void setCorrect(String correct) {
        this.correct = correct;
    }

    @DynamoDBAttribute(attributeName = "QuestionID")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName = "isOpen")
    public boolean getisOpen() {
        return isOpen;
    }

    public void setisOpen(boolean open) {
        isOpen = open;
    }

    @DynamoDBAttribute(attributeName = "isClosed")
    public boolean getisClosed() {
        return isClosed;
    }

    public void setisClosed(boolean closed) {
        isClosed = closed;
    }

    @DynamoDBAttribute(attributeName = "isNumerical")
    public boolean getisNumerical() {
        return isNumerical;
    }

    public void setisNumerical(boolean numerical) {
        isNumerical = numerical;
    }

    @DynamoDBAttribute(attributeName = "questionAnswer")
    public String getQuestionAnswer() {
        return questionAnswer;
    }

    public void setQuestionAnswer(String questionAnswer) {
        this.questionAnswer = questionAnswer;
    }


    @DynamoDBAttribute(attributeName = "QuestionContent")
    public String getQuestionContent() {
        return questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }


}
