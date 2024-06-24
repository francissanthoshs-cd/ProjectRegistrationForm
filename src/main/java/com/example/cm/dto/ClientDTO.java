package com.example.cm.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ClientDTO {

    private int id;
    private boolean status=true;
    private String createdBy;
    private LocalDateTime createdDateTime;
    private String updatedBy;
    private LocalDateTime updatedDateTime;
    private String clientId;
    private String clientFirstName;
    private String clientLastName;
    private String clientEmail;
    private String clientCompany;
    private String clientPhoneNo;
    private String clientAddress;
}
