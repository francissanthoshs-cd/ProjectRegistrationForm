package com.example.cm.common;

import lombok.Data;

@Data
public class APIResponse {
    private int code;
    private Object data;
    private  Object error;


}
