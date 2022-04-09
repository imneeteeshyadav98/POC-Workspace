// const fetch=require("node-fetch")
//import fetch from "node-fetch"
let appointment_list=[]
let url="http://3.222.189.18//api/v2/microservices1/appointment_type"
function getAppointmentName(){
    console.log("Get appointment Name")
    // url="http://3.222.189.18//api/v2/microservices1/appointment_type"
    fetch(url)
    .then((response)=>
    {
        return response.json();
    })
    .then((data)=>{
        for(let i=0;i<data.length;i++)
        {
            appointment_list.push(data[i])
            }
            })
    }
getAppointmentName()
console.log(appointment_list)