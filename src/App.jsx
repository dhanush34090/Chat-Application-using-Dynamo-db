import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import {
  createChat,
  fetchChats,
  fetchMessages,
  sendMessage as sendChatMessage,
} from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [chatsError, setChatsError] = useState("");

  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [newChatType, setNewChatType] = useState("GROUP");
  const [creatingChat, setCreatingChat] = useState(false);
  const [createChatError, setCreateChatError] = useState("");

  const [currentUser, setCurrentUser] = useState({
    id: "USER#101",
    name: "Ravi",
  });

  const [selectedChat, setSelectedChat] = useState(null);

  const loadChats = async () => {
    try {
      setChatsError("");
      setChatsLoading(true);

      const data = await fetchChats();
      const loadedChats = data.map((item) => ({
        id: item.PK,
        name: item.chatName,
        type: item.chatType,
        subtitle:
          item.chatType === "GROUP"
            ? "Group chat • DynamoDB Single-Table Design"
            : "Private chat",
        initial: item.chatName ? item.chatName.charAt(0).toUpperCase() : "C",
      }));

      setChats(loadedChats);

      setSelectedChat((previousChat) => {
        if (!loadedChats.length) {
          return null;
        }

        const existingChat = loadedChats.find(
          (chat) => chat.id === previousChat?.id
        );

        return existingChat || loadedChats[0];
      });
    } catch (err) {
      console.error("GET chats error:", err);
      setChatsError("Could not load chats from AWS API.");
      setChats([]);
      setSelectedChat(null);
    } finally {
      setChatsLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const createNewChat = async (event) => {
    event.preventDefault();

    const chatName = newChatName.trim();

    if (!chatName || creatingChat) {
      return;
    }

    try {
      setCreateChatError("");
      setCreatingChat(true);

      await createChat({
        chatName,
        chatType: newChatType,
        createdBy: currentUser.id,
      });

      setNewChatName("");
      setNewChatType("GROUP");
      setShowNewChat(false);

      await loadChats();
    } catch (err) {
      console.error("Create chat error:", err);
      setCreateChatError("Could not create chat. Please try again.");
    } finally {
      setCreatingChat(false);
    }
  };

  const handleCancelCreateChat = () => {
    setShowNewChat(false);
    setNewChatName("");
    setCreateChatError("");
  };

  const loadMessages = async () => {
    if (!selectedChat?.id) {
      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = await fetchMessages(selectedChat.id);
      setMessages(data);
    } catch (err) {
      console.error("GET messages error:", err);
      setError("Could not load messages from AWS API.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat?.id) {
      loadMessages();
    }
  }, [selectedChat?.id]);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => (a.SK || "").localeCompare(b.SK || "")),
    [messages]
  );

  const sendMessage = async (event) => {
    event.preventDefault();

    const messageText = text.trim();

    if (!messageText || sending || !selectedChat?.id) {
      return;
    }

    try {
      setError("");
      setSending(true);

      await sendChatMessage({
        chatId: selectedChat.id,
        senderId: currentUser.id,
        message: messageText,
      });

      setText("");
      await loadMessages();
    } catch (err) {
      console.error("POST message error:", err);
      setError("Could not send message to AWS.");
    } finally {
      setSending(false);
    }
  };

  const handleUserChange = (event) => {
    const selectedId = event.target.value;

    if (selectedId === "USER#101") {
      setCurrentUser({ id: "USER#101", name: "Ravi" });
    } else {
      setCurrentUser({ id: "USER#102", name: "Rahul" });
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        currentUser={currentUser}
        onUserChange={handleUserChange}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        showNewChat={showNewChat}
        setShowNewChat={setShowNewChat}
        newChatName={newChatName}
        setNewChatName={setNewChatName}
        newChatType={newChatType}
        setNewChatType={setNewChatType}
        creatingChat={creatingChat}
        createChatError={createChatError}
        onCreateChat={createNewChat}
        onCancelCreateChat={handleCancelCreateChat}
        chatsLoading={chatsLoading}
        chatsError={chatsError}
      />

      <ChatWindow
        selectedChat={selectedChat}
        loading={loading}
        error={error}
        messages={sortedMessages}
        currentUser={currentUser}
        text={text}
        setText={setText}
        onSend={sendMessage}
        onRefresh={loadMessages}
        sending={sending}
      />
    </div>
  );
}

export default App;

