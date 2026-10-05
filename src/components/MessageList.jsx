function MessageList({ messages, currentUserId, loading, error }) {
  if (loading) {
    return <div className="state">Loading messages...</div>;
  }

  if (error) {
    return <div className="state error">{error}</div>;
  }

  if (messages.length === 0) {
    return <div className="state">No messages found.</div>;
  }

  return (
    <>
      {messages.map((item) => {
        const mine = item.senderId === currentUserId;
        const senderName = item.senderId === "USER#101" ? "Ravi" : "Rahul";
        const senderInitial = senderName.charAt(0);

        return (
          <div className={`message-row ${mine ? "mine" : ""}`} key={item.SK}>
            <div className="message-avatar">{senderInitial}</div>

            <div className="bubble-wrap">
              <span className="sender">{senderName}</span>
              <div className="bubble">{item.message}</div>
              <span className="time">
                {item.timestamp
                  ? new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MessageList;
