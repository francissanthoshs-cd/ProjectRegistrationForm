package com.example.cm.repo;

import com.example.cm.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client,String> {

    List<Client> findAllByStatus(boolean status);
    List<Client> findByClientId(String employeeId);
    Optional<Client> findByClientIdAndStatus(String employeeId,boolean status);
}
