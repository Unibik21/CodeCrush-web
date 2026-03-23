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
        <div className="w-full max-w-4xl mx-auto border border-white/10 bg-white/5 backdrop-blur-xl mt-8 h-[80vh] flex flex-col rounded-3xl shadow-2xl shadow-purple-500/10">
            <h1 className="p-5 border-b border-white/10 bg-white/5 rounded-t-3xl backdrop-blur-md text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {
                    messages.map((msg, index) => {
                        return (
                            <div key={index} className={"chat " + (user.firstName===msg.firstName ? "chat-end":"chat-start")}>
                                <div className="chat-header text-slate-300 mb-1">
                                    {msg.firstName}
                                </div>
                                <div className={"chat-bubble shadow-md " + (user.firstName===msg.firstName ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white" : "bg-slate-800 text-slate-200")}>{msg.text}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-5 border-t border-white/10 bg-white/5 rounded-b-3xl flex items-center gap-3 backdrop-blur-md">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 bg-slate-900/50 border border-white/10 text-white rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"></input>
                <button onClick={sendMessage} className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 border-none text-white rounded-2xl shadow-lg shadow-indigo-500/30 px-6 transition-all duration-300 hover:scale-[1.02]">Send</button>
            </div>
        </div>
    )
}

export default Chat;