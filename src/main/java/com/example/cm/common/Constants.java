package com.example.cm.common;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class Constants {
    public static final String DATA_NEW = "Object";
    public static final int SUCCESS_CODE =200;
    public static final int FAILURE_CODE =400;
    public static final String INVALID_INPUT="INVALID_INPUT";
    public static final String EMPLOYEE_EXIST="Employee ID already exist";
    public static final int ERROR_CODE =100;
    public static final String NOT_FOUND="Employee Not Found";
    public static final boolean IS_ACTIVE = true;
    public static final String NULL_ID="Employee Id cannot be null";
    public static final String APPROVED_STATUS="approved";
    public static final String REJECTED_STATUS="rejected";




}
