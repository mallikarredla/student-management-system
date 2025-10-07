package com.example.student_management.repository;

import com.example.student_management.model.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepositoryImpl implements StudentRepositoryCustom{
    @PersistenceContext
    private EntityManager entityManager;

    public List<Student>findStudentWithCustomLogic(){
        return entityManager.createQuery("SELECT s from Student WHERE s.course='java'",Student.class).getResultList();
    }
    // Delete


}
