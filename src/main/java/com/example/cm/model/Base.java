package com.example.cm.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public class Base implements Serializable{
	
	@Column(name = "status")
    private boolean status=true;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "created_date_time")
    private LocalDateTime createdDateTime;
    @Column(name = "updated_by")
    private String updatedBy;
    @Column(name = "updated_date_time")
    private LocalDateTime updatedDateTime;


}
