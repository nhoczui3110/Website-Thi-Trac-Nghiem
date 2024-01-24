package com.doantracnghiem.doantracnghiem;


import org.apache.commons.lang3.StringUtils;
import java.text.Normalizer;
import java.util.regex.Pattern;

public class test {
    public static void main(String[] args) {
        String input = "Hello123ấầậẫ";

        if (containsOnlyAlphanumericWithoutDiacritics(input)) {
            System.out.println("Chuỗi chỉ chứa chữ cái và số (không có dấu).");
        } else {
            System.out.println("Chuỗi không chỉ chứa chữ cái và số (không có dấu).");
        }
    }

    private static boolean containsOnlyAlphanumericWithoutDiacritics(String str) {
        String normalizedString = removeDiacritics(str);
        return StringUtils.isAlphanumeric(normalizedString);
    }

    private static String removeDiacritics(String str) {
        String normalizedString = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalizedString).replaceAll("");
    }
}
