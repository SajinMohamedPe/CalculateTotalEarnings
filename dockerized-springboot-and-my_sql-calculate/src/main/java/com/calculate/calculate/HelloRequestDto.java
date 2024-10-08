package com.calculate.calculate;

import java.util.Date;

public class HelloRequestDto {
    private String message;
    private int number;
    private String  year;
    private String  month;
    private String  day;
    private String startTime;
    private String endTime;
    private int lunch;
    private long totalWorkTime;
    private long totalEarnings;
    private float payPerHour;

    private String startOfWeek;

    private String endOfWeek;

    private float totalEarningsForWeek;

    private float totalHoursForWeek;


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getLunch() {
        return lunch;
    }

    public void setLunch(int lunch) {
        this.lunch = lunch;
    }

    public long getTotalWorkTime() {
        return totalWorkTime;
    }

    public void setTotalWorkTime(long totalWorkTime) {
        this.totalWorkTime = totalWorkTime;
    }

    public long getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(long totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public float getPayPerHour() {
        return payPerHour;
    }

    public void setPayPerHour(float payPerHour) {
        this.payPerHour = payPerHour;
    }

    public String getStartOfWeek() {
        return startOfWeek;
    }

    public void setStartOfWeek(String startOfWeek) {
        this.startOfWeek = startOfWeek;
    }

    public String getEndOfWeek() {
        return endOfWeek;
    }

    public void setEndOfWeek(String endOfWeek) {
        this.endOfWeek = endOfWeek;
    }

    public float getTotalEarningsForWeek() {
        return totalEarningsForWeek;
    }

    public void setTotalEarningsForWeek(float totalEarningsForWeek) {
        this.totalEarningsForWeek = totalEarningsForWeek;
    }

    public float getTotalHoursForWeek() {
        return totalHoursForWeek;
    }

    public void setTotalHoursForWeek(float totalHoursForWeek) {
        this.totalHoursForWeek = totalHoursForWeek;
    }
}

