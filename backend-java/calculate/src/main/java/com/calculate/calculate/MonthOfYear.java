package com.calculate.calculate;

public enum MonthOfYear {
    JANUARY("1"),
    FEBRUARY("2"),
    MARCH("3"),
    APRIL("4"),
    MAY("5"),
    JUNE("6"),
    JULY("7"),
    AUGUST("8"),
    SEPTEMBER("9"),
    OCTOBER("10"),
    NOVEMBER("11"),
    DECEMBER("12");

    private final String value;

    // Constructor to set the numeric value for each month
    MonthOfYear(String value) {
        this.value = value;
    }

    // Getter method to retrieve the month number as a string
    public String getValue() {
        return value;
    }

    // Static method to convert a month name to its corresponding month number as a string
    public static String fromString(String monthName) {
        if (monthName == null) {
            return null;
        }
        try {
            // Converts the month name to uppercase and fetches its enum value
            return MonthOfYear.valueOf(monthName.toUpperCase()).getValue();
        } catch (IllegalArgumentException e) {
            // Returns null if the month name is invalid
            return null;
        }
    }
}
