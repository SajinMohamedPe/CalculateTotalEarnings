package com.calculate.calculate;

import java.util.List;
import java.util.Optional;

public interface HelloWorldRepositoryCustom {
    List<HelloWorld> findByProperties(HelloWorld helloWorld);

    public HelloWorld saveUpdate(HelloWorld helloWorld);

    Optional<HelloWorld> findByHelloWorldId(HelloWorldId helloWorldId);

}
