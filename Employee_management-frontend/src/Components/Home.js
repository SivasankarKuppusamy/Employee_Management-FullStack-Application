import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmployeeService from '../Service/EmployeeService';

const Home=()=> {
  const nav=useNavigate();
  function myFunction() {
    var x = document.getElementById("table");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  const [employees, setEmployees] = useState([])
  useEffect(() => {
      getAllEmployees();
  }, [])

  const getAllEmployees = () => {
      EmployeeService.getAllEmployees().then((response) => {
          setEmployees(response.data)
          console.log(response.data);
      }).catch(error =>{
          console.log(error);
      })
  }

  const deleteEmployee = (employeeId) => {
    if(window.confirm("Sure to Delete?")){
     EmployeeService.deleteEmployee(employeeId).then((response) =>{
      getAllEmployees();

     }).catch(error =>{
         console.log(error);
     })
    }
  }
  const deleteAllEmployee = () => {
    if(window.confirm("Sure to Delete All Employees?")){
     EmployeeService.deleteAllEmployee().then((response) =>{
      getAllEmployees();

     }).catch(error =>{
         console.log(error);
     })
    }
  }
  const LogoutHandler=()=>{
    if(window.confirm("Sure to Logout?")){
      nav("/")
    }
  }
  return (
    <div id="container">
            <h1>SS Groups</h1>
    <Link to="/add"><button id="addbtn">Add Employees</button></Link>
    <button id="viewbtn" onClick={deleteAllEmployee} >Delete All Employees</button>
  
    <table id="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Position</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
                employees.map(
                    employee => (
      <tr>
             <th> {employee.id}</th>
             <th> {employee.name}</th>
             <th> {employee.age}</th>
             <th> {employee.phone}</th>
             <th> {employee.position}</th>
             <th> {employee.salary}</th>
             <th><Link  to={`/update/${employee.id}`}><button id="actions">Update</button></Link> 
             <button id="actions"  onClick = {() => deleteEmployee(employee.id)}
            > Delete!</button></th>
            
      </tr>
    ))}
              </tbody>
            </table>
    <button id="logout" onClick={LogoutHandler}>Logout</button>
        
    </div>
  )
}

export default Home