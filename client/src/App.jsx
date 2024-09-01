import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io.connect("http://localhost:5000")

const App = () => {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", {message})
    setMessage("")
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat(prev => [...prev, payload])
    })
  }, [])

  return (
    <div>
      {chat.map((payload, index) => {
        return(
          <p key={index}>{payload.message}</p>
        )
      })}
      <form onSubmit={sendChat}>
        <input type="text" placeholder="Send Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>Send Message</button>
      </form>
    </div>
  )

  // const [message, setMessage] = useState("")
  // const [messageReceived, setMessageReceived] = useState("")

  // const sendMessage = () => {
  //   socket.emit("send_message", {message})
  // }

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageReceived(data.message)
  //   })
  // }, [socket])

  // return(
  //   <div>
  //     <input onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder="Message" />
  //     <button onClick={sendMessage}>Send Message</button>
  //     <h1>Message: </h1>
  //     {messageReceived}
  //   </div>
  // )
}

export default App;