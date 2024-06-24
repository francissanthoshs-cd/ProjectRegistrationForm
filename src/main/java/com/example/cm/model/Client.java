package com.example.cm.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.factory.annotation.Value;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "client_details")
public class Client extends Base {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private  int id;
	@Column(name = "client_id")
	private String clientId;
	@Column(name = "client_first_name")
	private String clientFirstName;
	@Column(name = "client_last_name")
	private String clientLastName;
	@Column(name = "client_email")
	private String clientEmail;
	@Column(name = "client_company")
	private String clientCompany;
	@Column(name = "client_phone")
	private String clientPhoneNo;
	@Column(name = "client_address")
	private String clientAddress;

//	@Column(name = "file_upload")
//	//@Value("${file.upload-dir}")
//	private String uploadDir;
	
}
