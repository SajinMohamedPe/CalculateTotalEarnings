package com.calculate.calculate;

import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class StringToSqlDateConverter implements Converter<String, java.sql.Date> {

    private final SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd yyyy");

    @Override
    public java.sql.Date convert(MappingContext<String, java.sql.Date> context) {
        try {
            java.util.Date utilDate = formatter.parse(context.getSource());
            return new java.sql.Date(utilDate.getTime());
        } catch (ParseException e) {
            throw new RuntimeException("Failed to parse date: " + context.getSource(), e);
        }
    }
}
