package com.example.demo.repositories.form;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.form.ApplicationForm;

public interface ApplicationFormRepository<T extends ApplicationForm> extends JpaRepository<T, Long>{

}
