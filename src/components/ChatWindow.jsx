import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function ChatWindow({
  selectedChat,
  loading,
  error,
  messages,
  currentUser,
  text,
  setText,
  onSend,
  onRefresh,
  sending,
}) {
  if (!selectedChat) {
    return <main className="chat-panel"><div className="state">No chat selected.</div></main>;
  }

  return (
    <main className="chat-panel">
      <header className="chat-header">
        <div>
          <h2>{selectedChat.name}</h2>
          <p>{selectedChat.subtitle}</p>
        </div>

        <button className="refresh-btn" onClick={onRefresh} disabled={loading} type="button">
          ↻ Refresh
        </button>
      </header>

      <section className="messages">
        <MessageList
          messages={messages}
          currentUserId={currentUser.id}
          loading={loading}
          error={error}
        />
      </section>

      <MessageInput
        text={text}
        setText={setText}
        onSend={onSend}
        sending={sending}
        currentUserName={currentUser.name}
      />

      <p className="demo-note">Messages are saved to DynamoDB through API Gateway and Lambda.</p>
    </main>
  );
}

export default ChatWindow;
