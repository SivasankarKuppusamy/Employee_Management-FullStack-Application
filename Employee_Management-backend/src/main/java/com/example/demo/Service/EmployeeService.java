package com.example.demo.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Employees;
import com.example.demo.Repository.EmployeeRepository;
@Service
public class EmployeeService {
	@Autowired
	EmployeeRepository employeeRepository;
	public  List <Employees> sortinform(String field){
		return employeeRepository.findAll(Sort.by(field));
		}
		public Page<Employees> paging (int page,int size) {
			PageRequest paging=PageRequest.of(page,size);
			return employeeRepository.findAll(paging);
		}
		public Page<Employees> SortingAndPaging(int page,int size,String field){
			Pageable paging=PageRequest.of(page, size).withSort(Sort.by(field));
			return employeeRepository.findAll(paging);
		}
		
}
