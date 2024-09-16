import { ref, onValue } from 'firebase/database';
import { database } from '@/app/firebase';

export default (chatId: string, setChat: Function) => {
    const messagesRef = ref(database, `messages/${chatId}`);

    onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        setChat(messages ? [...Object.values(messages)] : []);
    });
}