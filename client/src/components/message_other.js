
import '../styles/messages.css';

function MessageOther({data,author}){
    console.log(data)
    return (
        <div className="message">
            <h1 className='author'> {author}</h1>
            <div className='MessageBody'>
            <p>{data}</p>
            </div>
            
        </div>
    )

}

export default MessageOther