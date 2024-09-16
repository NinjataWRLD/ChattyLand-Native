import { onValue, ref } from "firebase/database";
import { database } from "@/app/firebase"

export default (setChat: Function) => {
    const messagesRef = ref(database, 'messages');

    onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val() || {};
        setChat(messages);
    });   
}