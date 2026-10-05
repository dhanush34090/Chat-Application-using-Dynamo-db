function NewChatForm({
  showNewChat,
  newChatName,
  setNewChatName,
  newChatType,
  setNewChatType,
  creatingChat,
  createChatError,
  onSubmit,
  onCancel,
}) {
  if (!showNewChat) {
    return null;
  }

  return (
    <form className="new-chat-form" onSubmit={onSubmit}>
      <input
        type="text"
        value={newChatName}
        onChange={(event) => setNewChatName(event.target.value)}
        placeholder="Enter chat name"
        autoFocus
        disabled={creatingChat}
      />

      <select
        value={newChatType}
        onChange={(event) => setNewChatType(event.target.value)}
        disabled={creatingChat}
      >
        <option value="GROUP">Group Chat</option>
        <option value="PRIVATE">Private Chat</option>
      </select>

      {createChatError && <div className="state error">{createChatError}</div>}

      <div className="new-chat-actions">
        <button type="button" onClick={onCancel} disabled={creatingChat}>
          Cancel
        </button>

        <button type="submit" disabled={creatingChat || !newChatName.trim()}>
          {creatingChat ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}

export default NewChatForm;
