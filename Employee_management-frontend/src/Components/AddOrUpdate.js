import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../Service/EmployeeService';

const AddOrUpdate=()=> {
  const nav=useNavigate();
  const[name,setname]=useState('');
  const[age,setAge]=useState('');
  const[phone,setphone]=useState('');
  const[position,setposition]=useState('');
  const[salary,setsalary]=useState('');
  const {id} = useParams();
    const saveOrUpdateEmployee = (e) => {
      e.preventDefault();
      if(age.length==0||salary.length==0||position.length==0||name.length==0||phone.length==0){
        alert("Enter All fields")
      }
      else if(phone.length<10){
        alert("Enter Correct Phone Number!")
      }
      
      else if(age<18||age>65){
        alert("Enter Correct Age!")
      }
      else{
      if (window.confirm("Confirm Details!") == true) {
        e.preventDefault();
          const employee = {id, name, age,phone,salary,position}
          if(id){
              EmployeeService.updateEmployee(id, employee).then((response) => {
                  nav('/home')
              }).catch(error => {
                  console.log(error)
              })
  
          }else{
              EmployeeService.createEmployee(employee).then((response) =>{
                  console.log(response.data)
                  nav('/home');
              }).catch(error => {
                  console.log(error)
              })
          }
        }
      }
    } 
  
      useEffect(() => {
          EmployeeService.getEmployeeById(id).then((response) =>{
              setname(response.data.name)
              setAge(response.data.age)
              setphone(response.data.phone)
              setsalary(response.data.salary)
              setposition(response.data.position)
          }).catch(error => {
              console.log(error)
          })
      }, [])
      const title = () => {

        if(id){
            return <h1>Update Employee</h1>
        }else{
            return <h1>Add Employee</h1>
        }
    }
  return (
    <div id="body">
    <div className="signup-form">
    <div className="container">
      <div className="header">
        {title()}
        <p>Enter Employee Details</p>
      </div>
      <form>
        <div className="input">
          <input type="text" placeholder="Employee name" value={name} onChange={(e)=>setname(e.target.value)}  />
        </div>
        <div className="input">
          <input type="text" placeholder="Employee Phone" value={phone}  pattern="[0-9]+"
                   maxLength="10"  onChange={(e)=>setphone(e.target.value)} />
        </div>
        <div className="input">
          <input type="number" placeholder="Employee Age" value={age}  onChange={(e)=>setAge(e.target.value)}/>
        </div>
        <div className="input">
          <input type="text" placeholder="Employee Position" value={position} onChange={(e)=>setposition(e.target.value)}/>
        </div>
        <div className="input">
          <input type="text" placeholder="Employee Salary" value={salary} pattern="[0-9]+"   onChange={(e)=>setsalary(e.target.value)} />
        </div>
        
        <input onClick={saveOrUpdateEmployee} className="e-signup-btn" type="submit" value="Submit" />
      <Link to="/home">  <button className="e-cancel-btn" >Cancel </button></Link>
        </form>
    </div>
  </div>
    </div>
  )
}

export default AddOrUpdate