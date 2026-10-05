import ChatList from "./ChatList";
import NewChatForm from "./NewChatForm";

function Sidebar({
  currentUser,
  onUserChange,
  chats,
  selectedChat,
  onSelectChat,
  showNewChat,
  setShowNewChat,
  newChatName,
  setNewChatName,
  newChatType,
  setNewChatType,
  creatingChat,
  createChatError,
  onCreateChat,
  onCancelCreateChat,
  chatsLoading,
  chatsError,
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">C</div>

        <div>
          <h1>ChatApp</h1>
          <p>DynamoDB Chat</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="avatar">{currentUser.name.charAt(0)}</div>

        <div>
          <strong>{currentUser.name}</strong>
          <span className="online">● Online</span>
        </div>
      </div>

      <div className="user-selector">
        <label>Chat as:</label>

        <select value={currentUser.id} onChange={onUserChange}>
          <option value="USER#101">Ravi</option>
          <option value="USER#102">Rahul</option>
        </select>
      </div>

      <div className="section-title chat-section-header">
        <span>CHATS</span>

        <button
          className="new-chat-btn"
          onClick={() => {
            setShowNewChat(!showNewChat);
          }}
          type="button"
        >
          + New Chat
        </button>
      </div>

      <NewChatForm
        showNewChat={showNewChat}
        newChatName={newChatName}
        setNewChatName={setNewChatName}
        newChatType={newChatType}
        setNewChatType={setNewChatType}
        creatingChat={creatingChat}
        createChatError={createChatError}
        onSubmit={onCreateChat}
        onCancel={onCancelCreateChat}
      />

      {chatsLoading && <div className="state">Loading chats...</div>}

      {chatsError && <div className="state error">{chatsError}</div>}

      {!chatsLoading && !chatsError && (
        <ChatList chats={chats} selectedChat={selectedChat} onSelectChat={onSelectChat} />
      )}

      {!chatsLoading && !chatsError && chats.length === 0 && (
        <div className="state">No chats found.</div>
      )}

      <div className="aws-card">
        <span>AWS ARCHITECTURE</span>
        <p>React → API Gateway → Lambda → DynamoDB</p>
      </div>
    </aside>
  );
}

export default Sidebar;
