package com.example.cm.service;

import com.example.cm.common.APIResponse;
import com.example.cm.common.Constants;
import com.example.cm.dto.ClientDTO;
import com.example.cm.exception.ClientServiceException;
import com.example.cm.model.Client;
import com.example.cm.repo.ClientRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClientService {
    private static String UPLOAD_DIR = "uploads/";
    private final ClientRepository clientRepository;

    public APIResponse createEmployee(ClientDTO clientDTO) {
        APIResponse apiResponse = new APIResponse();
        try {
            ModelMapper mapper = new ModelMapper();
            Client client = mapper.map(clientDTO, Client.class);
            // Check if an employee with the same ID already exists
            List<Client> existingEmployee = clientRepository.findByClientId(clientDTO.getClientId());
            if (existingEmployee.isEmpty()) {
                clientRepository.save(client);
                apiResponse.setCode(Constants.SUCCESS_CODE);
                apiResponse.setData(client);

            }else {
                throw new ClientServiceException(Constants.INVALID_INPUT, Constants.FAILURE_CODE);
            }
        } catch (ClientServiceException e) {
            apiResponse.setCode(e.getErrorCode());
            apiResponse.setError(e.getMessage());
        } catch (Exception e) {
            apiResponse.setCode(Constants.ERROR_CODE);
            apiResponse.setError("Error storing employee details: " + e.getMessage());
        }
        return apiResponse;
    }

    public APIResponse getAllClientDetails() {
        APIResponse apiResponse = new APIResponse();
        try {
            List<Client> employees = clientRepository.findAllByStatus(true);
            apiResponse.setData(employees);
            apiResponse.setCode(Constants.SUCCESS_CODE);
            apiResponse.setError(Constants.DATA_NEW);
        } catch (Exception e) {
            apiResponse.setCode(Constants.ERROR_CODE);
            apiResponse.setError("Failed to fetch employee details: " + e.getMessage());
        }
        return apiResponse;
    }

    public APIResponse findClientDetails(String clientId) {
        APIResponse apiResponse = new APIResponse();
        try {
            Optional<Client> employeeOptional = clientRepository.findByClientIdAndStatus(clientId,Constants.IS_ACTIVE);
            if (employeeOptional.isPresent()) {
                ModelMapper mapper = new ModelMapper();
                ClientDTO clientDTO = mapper.map(employeeOptional, ClientDTO.class);
                apiResponse.setData(clientDTO);
                apiResponse.setCode(Constants.SUCCESS_CODE);
            } else {
                throw new ResourceNotFoundException(Constants.NOT_FOUND+ clientId);
            }
        } catch (ResourceNotFoundException e) {
            apiResponse.setCode(HttpStatus.NOT_FOUND.value());
            apiResponse.setError(e.getMessage());
        } catch (Exception e) {
            apiResponse.setCode(Constants.ERROR_CODE);
            apiResponse.setError("An error occurred while fetching the employee: " + e.getMessage());
        }
        return apiResponse;
    }

    public APIResponse updateClientDetails(ClientDTO clientDTO) {
        APIResponse apiResponse = new APIResponse();
        try {
            if (!clientDTO.getClientId().isEmpty()) {
                ModelMapper mapper = new ModelMapper();
                Client client = mapper.map(clientDTO, Client.class);
                clientRepository.save(client);
                apiResponse.setData(clientDTO);
                apiResponse.setCode(Constants.SUCCESS_CODE);
            } else {
                throw new ResourceNotFoundException(Constants.NOT_FOUND + clientDTO.getClientId());
            }
        } catch (ResourceNotFoundException e) {
            apiResponse.setCode(HttpStatus.NOT_FOUND.value());
            apiResponse.setError(e.getMessage());
        } catch (Exception e) {
            apiResponse.setCode(Constants.ERROR_CODE);
            apiResponse.setError("An error occurred while updating: " + e.getMessage());
        }
        return apiResponse;
    }

    public APIResponse deleteClient(String clientId) {
        APIResponse apiResponse = new APIResponse();
        try {
            Optional<Client> employeeOptional = clientRepository.findById(clientId);
            if (employeeOptional.isPresent()) {
                Client client = employeeOptional.get();
                client.setStatus(false); // Set status to false
                clientRepository.save(client);
                apiResponse.setCode(Constants.SUCCESS_CODE);
                apiResponse.setData("Employee deleted successfully");
            } else {
                throw new ResourceNotFoundException("Employee not found with ID: " + clientId);
            }
        } catch (ResourceNotFoundException e) {
            apiResponse.setCode(HttpStatus.NOT_FOUND.value());
            apiResponse.setError(e.getMessage());
        } catch (Exception e) {
            apiResponse.setCode(Constants.ERROR_CODE);
            apiResponse.setError("An error occurred while deleting the employee: " + e.getMessage());
        }
        return apiResponse;
    }

    public APIResponse addMultipleClientDetails(List<ClientDTO> clientDto) {
        APIResponse apiResponse =new APIResponse();
        ModelMapper modelMapper = new ModelMapper();
        Set<Client> clientModel = clientDto.stream()
                .filter(dto -> clientRepository.findByClientId(dto.getClientId()).isEmpty())
                .map(dto -> modelMapper.map(dto, Client.class))
                .collect(Collectors.toSet());

        if (!clientModel.isEmpty()) {
            apiResponse.setData(clientRepository.saveAll(clientModel));
            apiResponse.setCode(HttpStatus.OK.value());
        } else {
            apiResponse.setData("No new clients to save");
        }

        return apiResponse;




    }

    public APIResponse fileUpload(MultipartFile file) {
        APIResponse apiResponse = new APIResponse();
        String uploadDirectory = "C:/Users/Vishnu Prabu/Downloads/ClientDocs/";
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path path = Paths.get(uploadDirectory + fileName);
        try {
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/download/")
                .path(fileName)
                .toUriString();
        apiResponse.setData(HttpStatus.OK.value() + (fileDownloadUri));
        return apiResponse;
    }
}
