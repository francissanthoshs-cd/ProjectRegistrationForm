package com.example.cm.exception;

public class ClientServiceException extends RuntimeException {

    private final int errorCode;

    public ClientServiceException(String message, int errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
}

