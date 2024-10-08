package com.calculate.calculate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HelloWorldServiceImpl implements HelloWorldService{

    @Autowired
    HelloWorldRepository helloWorldRepository;

    @Autowired
    HelloWorldRepositoryCustom helloWorldRepositoryCustom;
    @Override
    public void getHelloWorld(HelloRequestDto helloRequestDto) {
        System.out.println("get Hello world service called");
        HelloWorldId helloWorldId = new HelloWorldId();
        helloWorldId.setDayOfMonth("1");
        helloWorldId.setMonthOfYear("05");
        helloWorldId.setYearOfCentury("2024");
        Optional<HelloWorld> helloWorld = helloWorldRepositoryCustom.findByHelloWorldId(helloWorldId);
        System.out.println(helloWorld.get().getNumber());
        System.out.println("hello world");
    }

    @Override
    public HelloWorld getHelloWorldTotalEarnings(HelloWorld helloWorld) {
        float timeWorked = helloWorldRepository.sumOfEarnings();
        float totalTimeWorkedInHours = timeWorked / 60;
        float sumOfEarnings = totalTimeWorkedInHours * helloWorld.getPayPerHour();
        helloWorld.setTotalTimeWorked((long) totalTimeWorkedInHours);
        helloWorld.setSumOfEarnings((long) sumOfEarnings);

        List<HelloWorld> helloWorldList = helloWorldRepository.findByDateOfWorkBetween(helloWorld.startOfWeek,
                helloWorld.endOfWeek);
        float totalTimeWorkedInHoursForWeek = (float) helloWorldList.stream().mapToDouble(helloWorld1 ->
                helloWorld1.getTimeDifference()/60).sum();
        float totalEarningsForWeek = totalTimeWorkedInHoursForWeek * helloWorld.getPayPerHour();
        helloWorld.setTotalTimeWorkedForWeek(totalTimeWorkedInHoursForWeek);
        helloWorld.setTotalEarningsForWeek(totalEarningsForWeek);
        return helloWorld;
    }

    @Override
    public long putHelloWorld(HelloWorld helloWorld) {
//        System.out.println("put Hello world service called");
        long timeDifference = calculateTimeDifference(helloWorld.getStartTime(), helloWorld.getEndTime());
        timeDifference = timeDifference - helloWorld.getLunch();
        if (timeDifference < 0) {
            timeDifference = 0;
        }
        helloWorld.setTimeDifference(timeDifference);
        helloWorldRepositoryCustom.saveUpdate(helloWorld);
//        helloWorldRepositoryCustom.saveUpdate(helloWorld);
        System.out.println("put Hello world service called with time difference" + helloWorld.getTimeDifference());
        return timeDifference;
    }

    private long calculateTimeDifference(String startTime, String endTime) {
        long durationInMinutes = 0;
        if (startTime != null &&!startTime.isEmpty() && endTime != null && !endTime.isEmpty()) {
            DateTimeFormatter pattern = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime startTimeAfterParsing = LocalTime.parse(startTime, pattern);
            LocalTime endTimeAfterParsing = LocalTime.parse(endTime, pattern);
            Duration duration = Duration.between(startTimeAfterParsing, endTimeAfterParsing);
            durationInMinutes = duration.toMinutes();
        }
        return durationInMinutes;
    }

    @Override
    public HelloWorld getHelloWorldWithData(HelloWorld helloWorld) {
        List<HelloWorld> helloWorldList = helloWorldRepositoryCustom.findByProperties(helloWorld);
        if (helloWorldList == null || helloWorldList.isEmpty()) {
            return new HelloWorld();
        } else {
            return helloWorldList.get(0);
        }


    }
}
