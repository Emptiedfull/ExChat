
import './App.css';
import socket from './components/socket';
import { useEffect,useState } from 'react';


import Window from './components/window';


function App() {
  const [connected,setConnected] = useState(false);
  const [room_id,setRoomId] = useState('');
  const [username,setUsername] = useState('');


  const handleJoinResponse = (data) => {
    
    if (data.message === "Connected") {
      
      setConnected(true);
      console.log(data.room)
      setRoomId(data.room)
    }
  };


  useEffect(()=>{
    
    socket.on('join_response', (data)=>handleJoinResponse(data));

    
    return () => {
      socket.off('join_response', handleJoinResponse);
    };
  },[])

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.disconnect();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  const connect = () =>{
    const room = room_id.trim();
    const user = username.trim();

    if (!room || !user) return;

    socket.emit('join_room',{room,user});
    
  }
 
  return (
    <div className={`App ${connected ? 'connected':"disconnected"}`}>
      
      {connected ? <Window name={username} room_id={room_id}></Window> : 
      <div className='RoomCreds'>
        <h1>Enter Room Credentials</h1>
        <input
            type='text'
            placeholder='Room Name'
            value={room_id}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        <button onClick={()=>connect()}>Connect</button>

        </div>}
      
      

    </div>
  );
}

export default App;
