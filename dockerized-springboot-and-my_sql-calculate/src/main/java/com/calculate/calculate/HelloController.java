package com.calculate.calculate;

import ch.qos.logback.classic.pattern.DateConverter;
import org.modelmapper.Converter;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.modelmapper.ModelMapper;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
public class HelloController {
    @Autowired
    HelloWorldService helloWorldService;

    @GetMapping(path = "/get-hello-world", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> getHelloWorld(@RequestBody(required = false) HelloRequestDto helloRequestDto) {
        helloWorldService.getHelloWorld(helloRequestDto);
        return ResponseEntity.ok("got Hello world!!!");
    }

    @PostMapping(path = "/get-hello-world-total-earnings", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HelloRequestDto> getHelloWorldTotalEarnings(@RequestBody(required = false) HelloRequestDto helloRequestDto) {
        // Initialize HelloWorld object
        HelloWorld helloWorld = new HelloWorld();

        // Create ModelMapper and apply the custom mappings
        ModelMapper modelMapper = new ModelMapper();
        Converter<String, Date> dateConverter = new StringToSqlDateConverter();

        // Add converters to ModelMapper
        modelMapper.addConverter(dateConverter);


        // Map HelloRequestDto to HelloWorld (including date parsing handled by HelloWorldDateMap)
        modelMapper.map(helloRequestDto, helloWorld);

        // Fetch earnings and total work time using the service
        HelloWorld helloWorld_result = helloWorldService.getHelloWorldTotalEarnings(helloWorld);

        // Update the DTO with the calculated earnings and total work time
        helloRequestDto.setTotalEarnings(helloWorld_result.getSumOfEarnings());
        helloRequestDto.setTotalWorkTime(helloWorld_result.getTotalTimeWorked());
        helloRequestDto.setTotalEarningsForWeek(helloWorld_result.getTotalEarningsForWeek());
        helloRequestDto.setTotalHoursForWeek(helloWorld_result.getTotalTimeWorkedForWeek());
        // Return the response with updated data
        return ResponseEntity.ok(helloRequestDto);
    }

    ModelMapper modelMapper;

    @PostMapping(path = "/update-hello-world", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HelloRequestDto> helloWorld(@RequestBody HelloRequestDto helloRequestDto) {

        modelMapper = new ModelMapper();

        HelloWorld helloWorld = new HelloWorld();

        if (helloRequestDto.getMessage() == null || helloRequestDto.getMessage().isEmpty()) {
            throw new BadRequestException("JSON must contain a 'message' field with a non-empty value.");
        }
        System.out.println("post method called with " + helloRequestDto.getMessage());
//        assembleHelloRequest(helloRequestDto, helloWorld);

        helloWorld = modelMapper.map(helloRequestDto, HelloWorld.class);
        int year = Integer.parseInt(helloRequestDto.getYear());
        int month = Integer.parseInt(MonthOfYear.fromString(helloRequestDto.getMonth()));
        int day = Integer.parseInt(helloRequestDto.getDay());
        LocalDate localDate = LocalDate.of(year, month, day);
        helloWorld.setDateOfWork(Date.valueOf(localDate));
        long durationInMinutes = helloWorldService.putHelloWorld(helloWorld);
        helloRequestDto.setTotalWorkTime(durationInMinutes);
        return ResponseEntity.ok(helloRequestDto);
    }

    @PostMapping(path = "/get-hello-world-data", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HelloWorld> getHelloWorldData(@RequestBody HelloRequestDto helloRequestDto) {

        modelMapper = new ModelMapper();
        HelloWorld helloWorld = new HelloWorld();
       // Assuming you have a setDate method in HelloWorld


        if (helloRequestDto.getMessage() == null || helloRequestDto.getMessage().isEmpty()) {
            throw new BadRequestException("JSON must contain a 'message' field with a non-empty value.");
        }
        System.out.println("post method called with " + helloRequestDto.getMessage());
//        assembleHelloRequest(helloRequestDto, helloWorld);
        helloWorld = modelMapper.map(helloRequestDto, HelloWorld.class);
        int year = Integer.parseInt(helloRequestDto.getYear());
        int month = Integer.parseInt(MonthOfYear.fromString(helloRequestDto.getMonth()));
        int day = Integer.parseInt(helloRequestDto.getDay());
        LocalDate localDate = LocalDate.of(year, month, day);
        helloWorld.setDateOfWork(Date.valueOf(localDate));
        HelloWorld helloWorldResponse = helloWorldService.getHelloWorldWithData(helloWorld);
        return ResponseEntity.ok(helloWorldResponse);
    }


//    private void assembleHelloRequest(HelloRequestDto helloRequestDto, HelloWorld helloWorld) {
//        helloWorld.setName(helloRequestDto.getMessage());
//        helloWorld.setNumber(helloRequestDto.getNumber());
//    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleBadRequestException(BadRequestException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}

// Define a custom exception for bad requests
class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
