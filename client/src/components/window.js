import '../styles/window.css';

import MessageSelf from './message_self';
import MessageOther from './message_other';
import socket from './socket';
import Sidebar from './Sidebar';

import { useEffect,useState } from 'react';

function Window({name,room_id}) {

  const [messages,setMessages] = useState([]);
  const [msg,setMsg] = useState('');
  const [RoomId,setRoomId] = useState(room_id);

  useEffect(()=>{
    console.log('useEffect')
    socket.on('message',(data)=>{
     
      setMessages([...messages,data]);
 
    })

    return () => {
        socket.off('message');
    }
  })


  const sendMessage = () =>{
    
    const message = msg.trim()
    const author = name.trim()
    const room  = room_id.trim()

    if(!message || !author) return;

    socket.emit('message',{author,message,room});
  }

  const Handle_Room = (room) =>{
    if (room === RoomId) return;
    socket.emit('leave_room',{room_id:RoomId,user:name})
    setMessages([])
    setRoomId(room)
    socket.emit('join_room',{room,user:name})
    
  }


  

  return (
 
      <div className='Window'>
        <header className='Window-header'>
            <h1> ExChat</h1>
        </header>
        <div className='Window-body'>
            <Sidebar Handle_Room={Handle_Room}></Sidebar>
            <div className='Chat'>
                <div className='Messages'>
                    {messages.map((msg,i)=>{
                        
                        if(msg.author === name){
                            return <MessageSelf key={i} data={msg.message}></MessageSelf>
                        }else{
                            return <MessageOther key={i} data={msg.message} author={msg.author}></MessageOther>
                        }
                    })}

                </div>
                <div className='input'>
                    <input 
                        type='text'
                        value={msg}
                        onChange={(e)=>setMsg(e.target.value)}
                    ></input>
                    <button onClick={()=>sendMessage()}>Send</button>
                </div>
            </div>
        </div>
      </div>


  );
}

export default Window;
