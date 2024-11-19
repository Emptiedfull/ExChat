
import '../styles/messages.css';

function MessageSelf({data}){
    console.log(data)
    return (
        <div className="message self">
           
            <div className='MessageBody'>
            <p>{data}</p>
            </div>
            
        </div>
    )

}

export default MessageSelf;