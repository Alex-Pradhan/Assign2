const fs = require("fs");
var employeesArray = [];
var departmentsArray = [];

module.exports.initialize = function () {

    var promise = new Promise((resolve, reject) => {
       
        try {
            fs.readFile('./data/employees.json', (err, data) => {
                if (err) throw err;
                employeesArray = JSON.parse(data);
                console.log("Employees has been initialized");
            })

            fs.readFile('./data/departments.json', (err, data) => {
                if (err) throw err;
                departmentsArray = JSON.parse(data);
                console.log("Departments has been initialized");
            })

        } catch (ex) {
            console.log("Initialization failed");
            reject("Initialization failed");
        }
        console.log("Successfully initalized");
        resolve("Successfully initalized");
    })

    return promise;
};

module.exports.getAllEmployees = function () {

    var promise = new Promise((resolve, reject) => {
       if(employeesArray.length === 0) {
           var err = "function getAllEmployees() contains no data";
           reject({message: err});
       }  

    resolve (employeesArray);
    })
    return promise;
};

module.exports.getManagers = function () {

    var managersArray = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < employeesArray.length; i++){
           if (employeesArray[i].isManager == true) {
            managersArray.push(employeesArray[i]);
           }
       }

       if(managersArray.length === 0) {
           var err = "function getManagers() contains no data";
            reject({managersArray: err});
       }  

    resolve (managersArray);
    })
    return promise;
};

module.exports.getDepartments = function () {

    var promise = new Promise((resolve, reject) => {
        if(departmentsArray.length === 0) {
            var err = "function getDepartments() contains no data";
            reject({message: err});
        }  
 
     resolve (departmentsArray);
     })
     return promise;
};



module.exports.addEmployee = function (employeeData) {
    var promise = new Promise((resolve, reject) => {
       if (employeeData.isManager === "undefined") {
            employeeData.isManager = false;

       } else {

            employeeData.isManager = true;

       }

       if(employeesArr.length === 0){

           var err = "function getAllEmployees() has no data";
           reject({message: err});

       }else{

           employeeData.employeeNum = employeesArr.length + 1;
           employeesArr.push(employeeData);

       }        

       resolve (employeesArr);
    })
    return promise;

};


module.exports.getEmployeesByStatus = function (status) {
    var employeesArrStatus = [];
    var promise = new Promise((resolve, reject) => {

        for (var i=0; i < employeesArr.length; i++){

            if (employeesArr[i].status.toLowerCase() == status.toLowerCase()) {
                employeesArrStatus.push(employeesArr[i]);

            }

        }

        if(employeesArrStatus === 0) {

            var err = "NO RESULTS";
            reject({message: err});

        }  

        resolve (employeesArrStatus);
    })

    return promise;
};



module.exports.getEmployeesByDepartment = function (department) {
    var employeesArrDepartment = [];
    var promise = new Promise((resolve, reject) => {

        for (var i=0; i < employeesArr.length; i++){

            if (employeesArr[i].department == department) {
                employeesArrDepartment.push(employeesArr[i]);

            }

        }

        if (employeesArrDepartment === 0) {

            var err = "NO RESULTS";
            reject({message: err});

        }  

        resolve (employeesArrDepartment);
    })
    return promise;
};



module.exports.getEmployeesByManager = function (manager) {
    var employeesArrManager = [];
    var promise = new Promise((resolve, reject) => {

        for (var i=0; i < employeesArr.length; i++){

            if (employeesArr[i].employeeManagerNum == manager) {

                employeesArrManager.push(employeesArr[i]);
            }
        }

        if (employeesArrManager === 0) {

            var err = "NO RESULTS";
            reject({message: err});

        }  

        resolve (employeesArrManager);
    })

    return promise;
};

module.exports.getEmployeeByNum = function (num) {
    var employeesArrNum;
    var promise = new Promise((resolve, reject) => {

        for (var i=0; i < employeesArr.length; i++){

            if (employeesArr[i].employeeNum == num) {

                employeesArrNum = employeesArr[i];
                i = employeesArr.length;

            }
        }

        if(employeesArrNum === "undefined") {

            var err = "NO RESULTS";
            reject({message: err});

        }  

        resolve (employeesArrNum);
    })
    
    return promise;
};