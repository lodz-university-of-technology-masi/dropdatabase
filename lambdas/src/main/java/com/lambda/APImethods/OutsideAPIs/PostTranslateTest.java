package com.lambda.APImethods.OutsideAPIs;

import com.amazonaws.services.lambda.runtime.Context;
import com.lambda.Model.Question;
import com.lambda.Model.Test;
import com.lambda.Tools.TranslateTool;

import javax.ws.rs.core.Response;
import java.util.LinkedList;

public class PostTranslateTest {
    public static Object handleRequest(Test request, Context context) {

        try {
            Test translated = new Test();
            String dir = request.getLang().toUpperCase().equals("PL") ? "pl-en" : "en-pl";
            String lang = request.getLang().toUpperCase().equals("PL") ? "EN" : "PL";
            translated.setName(TranslateTool.getTranslate(request.getName(), dir));
            translated.setTestUUID(request.getTestUUID());
            translated.setLang(lang);
            translated.setUser(request.getUser());
            LinkedList<Question> newQuestions = new LinkedList<>();
            for (Question item : request.getQuestions()) {
                newQuestions.add(translateQuestion(item, dir));
            }
            translated.setQuestions(newQuestions);
            return translated;
        } catch (Exception ex) {
            return Response.Status.INTERNAL_SERVER_ERROR;
        }
    }

    private static Question translateQuestion(Question question, String dir) {
        Question translated = new Question();
        translated.setId(question.getId());
        translated.setisClosed(question.getisClosed());
        translated.setisOpen(question.getisOpen());
        translated.setisNumerical(question.getisNumerical());
        translated.setQuestionContent(TranslateTool.getTranslate(question.getQuestionContent(), dir));
        if (question.getisClosed()) {
            translated.setAnswerA(TranslateTool.getTranslate(question.getAnswerA(), dir));
            translated.setAnswerB(TranslateTool.getTranslate(question.getAnswerB(), dir));
            translated.setAnswerC(TranslateTool.getTranslate(question.getAnswerC(), dir));
            translated.setAnswerD(TranslateTool.getTranslate(question.getAnswerD(), dir));
            translated.setCorrect(question.getCorrect());
        } else if (question.getisOpen()) {
            translated.setQuestionAnswer(TranslateTool.getTranslate(question.getQuestionAnswer(), dir));
            translated.setCorrect(TranslateTool.getTranslate(question.getCorrect(), dir));
        } else if (question.getisNumerical()) {
            translated.setQuestionAnswer(question.getQuestionAnswer());
            translated.setCorrect(question.getCorrect());
        }
        return translated;
    }
}
