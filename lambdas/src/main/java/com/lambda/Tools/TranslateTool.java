package com.lambda.Tools;

import com.github.vbauer.yta.model.Direction;
import com.github.vbauer.yta.model.Language;
import com.github.vbauer.yta.model.Translation;
import com.github.vbauer.yta.service.YTranslateApiImpl;

public class TranslateTool {
    private static String key = "trnsl.1.1.20200102T105228Z.1c400edfb7c7ec87.a4db8950d6b70a4358f9146c436c957b9cded3f4";

    public static String getTranslate(String text, String lang) {
        if (text == null || text.equals("")) {
            return "";
        }
        YTranslateApiImpl api = new YTranslateApiImpl(key);
        Direction dir = Direction.of(Language.PL, Language.EN);
        if (lang.equals("en-pl")) {
            dir = Direction.of(Language.EN, Language.PL);
        }
        Translation translation = api.translationApi().translate(text, dir);
        return translation.text();
    }
}
