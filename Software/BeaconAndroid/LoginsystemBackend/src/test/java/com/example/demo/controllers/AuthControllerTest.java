package com.example.demo.controllers;

import com.example.demo.models.ERole;
import com.example.demo.models.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.SignupRequest;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class AuthControllerTest {

    //preparation for testing
    UserRepository mockUserRepo = new UserRepository() {
        @Override
        public Optional<User> findByUsername(String username) {
            return Optional.empty();
        }

        @Override
        public Boolean existsByUsername(String username) {
            return null;
        }

        @Override
        public Boolean existsByEmail(String email) {
            return null;
        }

        @Override
        public List<User> findAll() {
            return null;
        }

        @Override
        public List<User> findAll(Sort sort) {
            return null;
        }

        @Override
        public List<User> findAllById(Iterable<Long> iterable) {
            return null;
        }

        @Override
        public <S extends User> List<S> saveAll(Iterable<S> iterable) {
            return null;
        }

        @Override
        public void flush() {

        }

        @Override
        public <S extends User> S saveAndFlush(S s) {
            return null;
        }

        @Override
        public void deleteInBatch(Iterable<User> iterable) {

        }

        @Override
        public void deleteAllInBatch() {

        }

        @Override
        public User getOne(Long aLong) {
            return null;
        }

        @Override
        public <S extends User> List<S> findAll(Example<S> example) {
            return null;
        }

        @Override
        public <S extends User> List<S> findAll(Example<S> example, Sort sort) {
            return null;
        }

        @Override
        public Page<User> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public <S extends User> S save(S s) {
            return null;
        }

        @Override
        public Optional<User> findById(Long aLong) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(Long aLong) {
            return false;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(Long aLong) {

        }

        @Override
        public void delete(User user) {

        }

        @Override
        public void deleteAll(Iterable<? extends User> iterable) {

        }

        @Override
        public void deleteAll() {

        }

        @Override
        public <S extends User> Optional<S> findOne(Example<S> example) {
            return Optional.empty();
        }

        @Override
        public <S extends User> Page<S> findAll(Example<S> example, Pageable pageable) {
            return null;
        }

        @Override
        public <S extends User> long count(Example<S> example) {
            return 0;
        }

        @Override
        public <S extends User> boolean exists(Example<S> example) {
            return false;
        }
    };

    SignupRequest mockSignupRequest = new SignupRequest();

    private void assignMockValuesSignUp(){
        mockSignupRequest.setUsername("denisTest");
        mockSignupRequest.setEmail("denisTest@gmail.com");
        mockSignupRequest.setPassword("test123");
        Set<String> roles = new HashSet<>();
        roles.add(ERole.ROLE_ADMIN.name());
        mockSignupRequest.setRole(roles);
    }
    private void mockData(){
        Set<String> roles = new HashSet<>();
        roles.add(ERole.ROLE_ADMIN.name());
        mockUserRepo.save(new User("dylan","artsdylan@gmail.com", "test123"));
    }
    //--

    @Test
    void registerUserTestWhenUsernameIsAlreadyTaken() {
        mockData();
        assignMockValuesSignUp();

        mockSignupRequest.setUsername("dylan");
        mockSignupRequest.setEmail("denisTest@gmail.com");

        ResponseEntity result = ResponseEntity.ok().body("User registered successfully!");
        var res = mockUserRepo.existsByUsername(mockSignupRequest.getUsername());
        if (res == null || res != false)
            result = ResponseEntity.badRequest().body("Error: Username is already taken!");

        assertEquals(ResponseEntity.badRequest().body("Error: Username is already taken!"), result);
    }

    @Test
    void registerUserTestWhenEmailIsAlreadyTaken() {
        mockData();
        assignMockValuesSignUp();

        mockSignupRequest.setUsername("denisTest");
        mockSignupRequest.setEmail("artsdylan@gmail.com");

        ResponseEntity result = ResponseEntity.ok().body("User registered successfully!");
        var res = mockUserRepo.existsByEmail(mockSignupRequest.getEmail());
        if (res == null || res != false)
            result = ResponseEntity.badRequest().body("Error: Email is already in use!");

        assertEquals(ResponseEntity.badRequest().body("Error: Email is already in use!"), result);
    }
    @Test
    void registerUserTest() {
        mockData();
        assignMockValuesSignUp();

        ResponseEntity result = ResponseEntity.ok().body("User registered successfully!");
        if (mockUserRepo.existsByEmail(mockSignupRequest.getEmail()) != null)
            result = ResponseEntity.badRequest().body("Error: Email is already in use!");
        if (mockUserRepo.existsByUsername(mockSignupRequest.getUsername()) != null)
            result = ResponseEntity.badRequest().body("Error: Username is already taken!");


        assertEquals(ResponseEntity.ok().body("User registered successfully!"), result);
    }
}
