function doctor_details(data){
    fetch("http://192.168.29.197/api/v2/microservices1/doctor_details")
        .then((response)=>{
            // console.log(response.json());
            return response.json();
        })
        .then((data)=>{
            // console.log(data[0].Name)
            let name=""
            for (let i=0;i<data.length;i++)
            {
                name +=data[i].Name
            }
            console.log(name)
        }) 
}