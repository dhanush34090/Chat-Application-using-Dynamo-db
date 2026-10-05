function ChatList({ chats, selectedChat, onSelectChat }) {
  return (
    <>
      {chats.map((chat) => (
        <button
          key={chat.id}
          className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
          onClick={() => onSelectChat(chat)}
          type="button"
        >
          <div className="avatar small">{chat.initial}</div>

          <div className="chat-info">
            <strong>{chat.name}</strong>
            <span>{chat.type === "GROUP" ? "Group chat" : "Private chat"}</span>
          </div>
        </button>
      ))}
    </>
  );
}

export default ChatList;
