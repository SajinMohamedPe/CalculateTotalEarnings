package com.calculate.calculate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface HelloWorldRepository extends JpaRepository<HelloWorld, Integer> {

    @Query("SELECT SUM(h.timeDifference) FROM HelloWorld h")
    float sumOfEarnings();

    List<HelloWorld> findByDateOfWorkBetween(Date startDate, Date endDate);



}

