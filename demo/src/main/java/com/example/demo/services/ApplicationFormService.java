package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.repositories.form.ApplicationFormRepository;
import com.example.demo.repositories.form.GroupFormRepository;
import com.example.demo.repositories.form.IndividualFormRepository;

@Service
public class ApplicationFormService {
    private final ApplicationFormRepository applicationFormRepository;
    private final GroupFormRepository groupFormRepository;
    private final IndividualFormRepository individualFormRepository;

    public ApplicationFormService(ApplicationFormRepository applicationFormRepo, GroupFormRepository groupFormRepo,
                                    IndividualFormRepository individualFormRepo){
        this.applicationFormRepository = applicationFormRepo;
        this.groupFormRepository = groupFormRepo;
        this.individualFormRepository = individualFormRepo;
    }
}
