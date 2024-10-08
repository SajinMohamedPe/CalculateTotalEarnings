package com.calculate.calculate;

import jakarta.persistence.*;

import java.sql.Date;


@Entity
@Table(name = "hello_world", schema = "hello_world_schema")
public class HelloWorld {
    int number;
    String name;
    @Id
    Date dateOfWork;
    @Column(name = "start_time")
    String startTime;
    @Column(name = "end_time")
    String endTime;
    @Column(name = "time_difference")
    long timeDifference;

    int lunch;

    @Transient
    long totalTimeWorked;

    @Transient
    long sumOfEarnings;

    @Transient
    Date startOfWeek;

    @Transient
    Date endOfWeek;

    @Transient
    private float payPerHour;


    @Transient
    private float totalEarningsForWeek;
    @Transient
    private float totalTimeWorkedForWeek;

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateOfWork() {
        return dateOfWork;
    }

    public void setDateOfWork(Date dateOfWork) {
        this.dateOfWork = dateOfWork;
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

    public long getTimeDifference() {
        return timeDifference;
    }

    public void setTimeDifference(long timeDifference) {
        this.timeDifference = timeDifference;
    }

    public int getLunch() {
        return lunch;
    }

    public void setLunch(int lunch) {
        this.lunch = lunch;
    }

    public long getTotalTimeWorked() {
        return totalTimeWorked;
    }

    public void setTotalTimeWorked(long totalTimeWorked) {
        this.totalTimeWorked = totalTimeWorked;
    }

    public long getSumOfEarnings() {
        return sumOfEarnings;
    }

    public void setSumOfEarnings(long sumOfEarnings) {
        this.sumOfEarnings = sumOfEarnings;
    }

    public Date getStartOfWeek() {
        return startOfWeek;
    }

    public void setStartOfWeek(Date startOfWeek) {
        this.startOfWeek = startOfWeek;
    }

    public Date getEndOfWeek() {
        return endOfWeek;
    }

    public void setEndOfWeek(Date endOfWeek) {
        this.endOfWeek = endOfWeek;
    }

    public float getPayPerHour() {
        return payPerHour;
    }

    public void setPayPerHour(float payPerHour) {
        this.payPerHour = payPerHour;
    }


    public float getTotalEarningsForWeek() {
        return totalEarningsForWeek;
    }

    public void setTotalEarningsForWeek(float totalEarningsForWeek) {
        this.totalEarningsForWeek = totalEarningsForWeek;
    }

    public float getTotalTimeWorkedForWeek() {
        return totalTimeWorkedForWeek;
    }

    public void setTotalTimeWorkedForWeek(float totalTimeWorkedForWeek) {
        this.totalTimeWorkedForWeek = totalTimeWorkedForWeek;
    }
}
