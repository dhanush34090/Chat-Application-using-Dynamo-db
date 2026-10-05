function MessageInput({ text, setText, onSend, sending, currentUserName }) {
  return (
    <form className="composer" onSubmit={onSend}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={`Message as ${currentUserName}...`}
        disabled={sending}
      />

      <button type="submit" disabled={sending || !text.trim()}>
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default MessageInput;
