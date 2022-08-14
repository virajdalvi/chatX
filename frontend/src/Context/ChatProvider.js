import {createContext,useContext,useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";



const ChatContext = createContext()
const ChatProvider=({children})=>{
    const history = useNavigate();
    const [user,setUser]=useState();
    const [selectedChat,setSelectedChat]=useState()
    const [chats,setChats]=useState([])
    const[loggedUser,setLoggedUser]=useState()
    const [notification,setNotification]=useState([])

    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        
        if(!userInfo){
            history('/',{replace:true})
        }
    },[history])
    return(
        <ChatContext.Provider value={{notification,setNotification,user,setUser,selectedChat,setSelectedChat,chats,setChats,loggedUser,setLoggedUser}}>
            {children}
        </ChatContext.Provider>
    )
        
    
};
export const ChatState=()=>{
    return useContext(ChatContext)
}
export default ChatProvider;