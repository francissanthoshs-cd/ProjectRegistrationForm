package com.example.cm.controller;

import com.example.cm.common.APIResponse;
import com.example.cm.common.Constants;
import com.example.cm.dto.ClientDTO;
import com.example.cm.exception.ClientServiceException;
import com.example.cm.service.ClientService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/client")
@CrossOrigin(origins = "*")
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/newClient")
    public APIResponse createEmployee(@RequestBody @Valid ClientDTO clientDTO) {
        return clientService.createEmployee(clientDTO);
    }

    @PostMapping("/addmultipleclient")
    public APIResponse addMultipleClient(@RequestBody List<ClientDTO> clientDTO)
    {
        return clientService.addMultipleClientDetails(clientDTO);
    }

    @GetMapping("/all")
    public APIResponse getAllEmployeeDetails() {
        return clientService.getAllClientDetails();
    }


    @PutMapping ("/updateClient")
    public APIResponse updateEmployee(@RequestBody @Valid ClientDTO clientDTO){
        return clientService.updateClientDetails(clientDTO);
    }

    @DeleteMapping("/deleteClient")
    public APIResponse deleteEmployee(@RequestParam String clientId){
        if (StringUtils.isEmpty(clientId)) {
            throw  new ClientServiceException(Constants.NULL_ID, HttpStatus.BAD_REQUEST.value());
        }
        return clientService.deleteClient(clientId);
    }

    @PostMapping(value = "/uploadfile",consumes = {"multipart/form-data"})
    public APIResponse uploadFile(@RequestParam("file") MultipartFile file) {
        return clientService.fileUpload(file);
    }

//    @PostMapping(value = "/multi-upload",consumes = {"multipart/form-data"})
//    public APIResponse multiUpload(@RequestParam("files") MultipartFile[] files) {
//        return clientService.multiFileUpload(files);
//    }
}

