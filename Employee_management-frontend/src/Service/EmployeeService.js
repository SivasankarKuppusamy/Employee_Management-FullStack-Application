import axios from 'axios'

const URL = 'http://localhost:8080/employees';

class EmployeeService{

    getAllEmployees(){
        return axios.get(URL)
    }

    createEmployee(employee){
        return axios.post(URL,employee)
    }

    getEmployeeById(employeeId){
        return axios.get(URL + '/' + employeeId);
    }

    updateEmployee(employeeId, employee){
        return axios.put(URL + '/' +employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(URL + '/' + employeeId);
    }
    deleteAllEmployee(employeeId){
        return axios.delete(URL);
    }
}

export default new EmployeeService();