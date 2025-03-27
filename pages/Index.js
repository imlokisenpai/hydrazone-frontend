import { useState, useEffect } from "react";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch("https://earnest-solace.vercel.app/posts")
            .then(res => res.json())
            .then(data => setPosts(data));

        fetch("https://earnest-solace.vercel.app/files")
            .then(res => res.json())
            .then(data => setFiles(data));

        const ws = new WebSocket("wss:earnest-solace.vercel.app/chat");
        ws.onmessage = (event) => console.log("Chat message:", event.data);
        setSocket(ws);
    }, []);

    const sendMessage = () => {
        if (socket) {
            socket.send(message);
        }
    };

    return (
        <div style={{
            backgroundColor: "#1a1a1a", color: "#80ff80", minHeight: "100vh",
            padding: "20px", fontFamily: "VT323, monospace", textShadow: "0 0 5px #80ff80"
        }}>
            <h1 style={{ borderBottom: "2px solid #80ff80", paddingBottom: "5px" }}>Hydrazone Club</h1>
            <div>
                <input style={{ backgroundColor: "#333", color: "#80ff80", border: "1px solid #80ff80" }} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
                <button style={{ backgroundColor: "#444", color: "#80ff80", border: "1px solid #80ff80" }} onClick={sendMessage}>Send</button>
            </div>
            <h2>Posts</h2>
            {posts.map((post, index) => (
                <div key={index}>
                    <strong>{post.user}</strong>: {post.content}
                </div>
            ))}
            <h2>Download Archive</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}><a href={`https://your-backend-url/download/${file}`} download>{file}</a></li>
                ))}
            </ul>
        </div>
    );
}
