package com.calculate.calculate;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public class HelloWorldRepositoryImpl implements HelloWorldRepositoryCustom{

    @Autowired
    EntityManager entityManager;

    @Override
    public List<HelloWorld> findByProperties(HelloWorld helloWorld) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<HelloWorld> criteriaQuery = criteriaBuilder.createQuery(HelloWorld.class);
        Root<HelloWorld> root = criteriaQuery.from(HelloWorld.class);

        List<Predicate> predicateList = new ArrayList<>();
        if (helloWorld.getDateOfWork() != null) {
            predicateList.add(criteriaBuilder.equal(root.get("dateOfWork"), helloWorld.getDateOfWork()));
            }

        Predicate predicate = criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        criteriaQuery.where(predicate);
        List<HelloWorld> result = entityManager.createQuery(criteriaQuery).getResultList();
        return result;
        }

    @Override
    @Transactional
    public HelloWorld saveUpdate(HelloWorld helloWorld) {
        return entityManager.merge(helloWorld);
    }

    @Override
    public Optional<HelloWorld> findByHelloWorldId(HelloWorldId helloWorldId) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<HelloWorld> helloWorldIdCriteriaQuery = criteriaBuilder.createQuery(HelloWorld.class);
        Root<HelloWorld> root = helloWorldIdCriteriaQuery.from(HelloWorld.class);

//        Path<HelloWorldId> helloWorldIdRoot = root.get("helloWorldId");

        List<Predicate> predicateList = new ArrayList<>();
        if (helloWorldId.getDayOfMonth() != null && !helloWorldId.getDayOfMonth().isEmpty()) {
            predicateList.add(criteriaBuilder.equal(root.get("dayOfMonth"), helloWorldId.getDayOfMonth()));
        }
        if (helloWorldId.getYearOfCentury() != null && !helloWorldId.getYearOfCentury().isEmpty()) {
            predicateList.add(criteriaBuilder.equal(root.get("yearOfCentury"), helloWorldId.getYearOfCentury()));
        }
        if (helloWorldId.getMonthOfYear() != null && !helloWorldId.getMonthOfYear().isEmpty()) {
            predicateList.add(criteriaBuilder.equal(root.get("monthOfYear"), helloWorldId.getMonthOfYear()));
        }

        Predicate predicate = criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        helloWorldIdCriteriaQuery.where(predicate);

        Optional<List<HelloWorld>> helloWorldList = Optional.ofNullable(entityManager.createQuery(helloWorldIdCriteriaQuery).getResultList());
        Optional<HelloWorld> filteredHelloWorld = helloWorldList.filter(helloWorlds -> !helloWorlds.isEmpty()).map(helloWorlds -> helloWorlds.get(0));
        return filteredHelloWorld;
    }

}
