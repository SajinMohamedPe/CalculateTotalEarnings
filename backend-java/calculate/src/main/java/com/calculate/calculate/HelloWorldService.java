package com.calculate.calculate;

import java.util.List;

public interface HelloWorldService {
    public void getHelloWorld(HelloRequestDto helloRequestDto);
    public HelloWorld getHelloWorldTotalEarnings(HelloWorld helloWorld);
    public long putHelloWorld(HelloWorld helloWorld);
    public HelloWorld getHelloWorldWithData(HelloWorld helloWorld);
}
