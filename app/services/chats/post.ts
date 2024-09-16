import { push, ref, set } from "firebase/database"
import { database } from "@/app/firebase";

export default async (message: { sender: string, content: string } | undefined) => {
    const chats = ref(database, 'messages');
    const newChat = push(chats);

    const messages = ref(database, `messages/${newChat.key}`);
    const newMessage = push(messages);

    const format = (value: number) => {
        return value.toLocaleString('bg-BG', { minimumIntegerDigits: 2, useGrouping: false })
    };

    const date = new Date();
    await set(newMessage, {
        id: newChat.key,
        sender: message ? message.sender : 'SysAdmin',
        content: message ? message.content : 'New Chat Created!',
        date: `${format(date.getDate())}/${format(date.getMonth())}/${date.getFullYear()}`,
        time: `${format(date.getHours())}:${format(date.getMinutes())}`,
    });

    return newChat.key;
}