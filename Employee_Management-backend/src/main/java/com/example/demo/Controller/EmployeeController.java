package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.Employees;
import com.example.demo.Repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employees> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employees createEmployee(@RequestBody Employees employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("{id}")
    public ResponseEntity<Optional<Employees>> getEmployeeById(@PathVariable  int id){
        Optional<Employees> employee = employeeRepository.findById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("{id}")
	public Employees updateBookDetails(@RequestBody Employees b)
	{
		System.out.println("Changes Made Have Been Successfully Updated");
		return employeeRepository.save(b);		
	}
    @DeleteMapping("{id}")
	public String deleteDetails(@PathVariable int id)
	{
		employeeRepository.deleteById(id);
		return "Id : "+id+" is deleted";
	}
    @DeleteMapping
    public String deleteAllDetails()
    {
    	employeeRepository.deleteAll();
    	return "All employees deleted";
    }
}