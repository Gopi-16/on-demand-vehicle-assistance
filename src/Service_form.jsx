
import React, {useState,useEffect} from "react";
import axios from "axios";

const ServiceForm=()=>{
    const [username,setuserName]=useState("");
    const [latitude,setLatitude]=useState("");
    const [longitude,setLongitude]=useState("");
    const [mobile,setMobile]=useState("");
    const [vehicle_number,setVehicle]=useState("");
    const [repair_msg,setRepair_msg]=useState("");
    const [createdAt,setCreatedAt]=useState("");
    //const [updatedAt,setUpdatedAt]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const date=new Date();
        const data={username,latitude,longitude,mobile,vehicle_number,repair_msg,createdAt:date};
        console.log(data);
        const response = await axios.post("http://localhost:8000/api/auth/service",data);
    }
    return(
        <div>
            Name:
            <input id="name" name="name" onChange={e=>setuserName(e.target.value)} required/>
            <br />
           Location:
           <button onClick={()=>{
            navigator.geolocation.getCurrentPosition((position)=>{
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
           }}>Get Location</button>
           <br />
           Latitude:
           <input id="latitude" name="latitude" value={latitude} readOnly></input>
           <br />
           Longitude:
           <input id="longitude" name="longitude" value={longitude} readOnly></input>
           <br />
            Mobile: 
            <input id="mobile" name="mobile" onChange={e=>setMobile(e.target.value)} required/>
            <br />
            Vehicle Number:
            <input id="vehicle_number" name="vehicle_number" onChange={e=>setVehicle(e.target.value)} />
            <br />
            Repair Message:
            <input id="repair_msg" name="repair_msg" onChange={e=>setRepair_msg(e.target.value)}></input>
            <br />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>

)
}

export default ServiceForm;