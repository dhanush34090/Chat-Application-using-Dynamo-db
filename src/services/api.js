import axios from "axios";

export const API_URL =
  "https://bkcnw2nx4f.execute-api.us-east-1.amazonaws.com/messages";

export const CHATS_API_URL =
  "https://bkcnw2nx4f.execute-api.us-east-1.amazonaws.com/chats";

export const fetchChats = async () => {
  const response = await axios.get(CHATS_API_URL);
  return Array.isArray(response.data) ? response.data : [];
};

export const createChat = async ({ chatName, chatType, createdBy }) => {
  const response = await axios.post(CHATS_API_URL, {
    chatName,
    chatType,
    createdBy,
  });

  return response.data;
};

export const fetchMessages = async (chatId) => {
  const response = await axios.get(API_URL, {
    params: {
      chatId,
    },
  });

  const data = Array.isArray(response.data) ? response.data : [];
  return data.filter((item) => item.SK?.startsWith("MSG#"));
};

export const sendMessage = async ({ chatId, senderId, message }) => {
  const response = await axios.post(API_URL, {
    chatId,
    senderId,
    message,
  });

  return response.data;
};
