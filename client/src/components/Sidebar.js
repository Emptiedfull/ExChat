import React from 'react';
import axios from 'axios'
import { useEffect,useState } from 'react';

import '../styles/sidebar.css'

function Sidebar({Handle_Room}){
    const [rooms,setRooms] = useState([]);

    const url = `http://${process.env.React_APP_API_HOST || "localhost"}:${process.env.React_APP_API_PORT || "5000"}/get_rooms`


    useEffect(()=>{
        console.log(url)
        async function fetchdata(params) {
            const data = await axios.get(url)
            const rooms = data.data
            setRooms(rooms)
       
        }
        fetchdata()
        
    },[])


    return (
        <div className={`Sidebar`}>
           {rooms.map((room,i)=>{
                return <button key={i} onClick={()=>Handle_Room(room)}>{room}</button>
           })}
        </div>
    )
}

export default Sidebar;