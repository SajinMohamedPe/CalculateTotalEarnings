package com.calculate.calculate;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class HelloWorldId implements Serializable {
    private String yearOfCentury;
    private String monthOfYear;
    private String dayOfMonth;

    public HelloWorldId() {

    }
    public HelloWorldId(String yearOfCentury, String monthOfYear, String dayOfMonth) {
        this.yearOfCentury = yearOfCentury;
        this.monthOfYear = monthOfYear;
        this.dayOfMonth = dayOfMonth;
    }

    public String getYearOfCentury() {
        return yearOfCentury;
    }

    public void setYearOfCentury(String yearOfCentury) {
        this.yearOfCentury = yearOfCentury;
    }

    public String getMonthOfYear() {
        return monthOfYear;
    }

    public void setMonthOfYear(String monthOfYear) {
        this.monthOfYear = monthOfYear;
    }

    public String getDayOfMonth() {
        return dayOfMonth;
    }

    public void setDayOfMonth(String dayOfMonth) {
        this.dayOfMonth = dayOfMonth;
    }
}
