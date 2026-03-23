import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const firstName = user?.firstName;

    useEffect(() => {
    if (!targetUserId) return;

    const fetchMessages = async () => {
        try {
            const chat = await axios.get(
                BASE_URL + "/chat/" + targetUserId,
                { withCredentials: true }
            );

            const chatMessages = chat?.data?.messages.map((msg) => ({
                firstName: msg?.senderId?.firstName,
                text: msg?.text
            }));

            setMessages(chatMessages); 
        } catch (err) {
            console.error(err);
        }
    };

    fetchMessages();
}, [targetUserId]);

    useEffect(() => {
        if (!userId) return;
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId });

        socket.on("messageRecieved", ({ firstName, text }) => {
            setMessages((messages) => [...messages, { firstName, text }]);
        })

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName, userId, targetUserId, text: newMessage });
        setNewMessage("");
    }

    return (
        <div className="w-4/5 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-2xl">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {
                    messages.map((msg, index) => {
                        return (
                            <div key={index} className={"chat " + (user.firstName===msg.firstName ? "chat-end":"chat-start")}>
                                <div className="chat-header">
                                    {msg.firstName}
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 border border-gray-500 text-white rounded-2xl p-2"></input>
                <button onClick={sendMessage} className="btn btn-secondary text-black">Send</button>
            </div>
        </div>
    )
}

export default Chat;