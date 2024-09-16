import { StyleSheet, Text, View } from "react-native";
import IMessage from "@/interfaces/IMessage";

interface MessageBoxParams {
    message: IMessage
}

const styles = StyleSheet.create({
    message: {
        rowGap: 0,
    },
    sender: {
        color: 'white',
    },
    content: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'white',
        padding: 10,
        marginVertical: 15,
        backgroundColor: 'gray',
        fontSize: 20,
        borderRadius: 10,
        borderCurve: 'continuous'
    },
});

function MessageBox({ message }: MessageBoxParams) {
    return (
        <View style={styles.message}>
            <Text style={styles.sender}>{message.sender}</Text>
            <Text style={styles.content}>{message.content}</Text>
        </View>
    );
}

export default MessageBox;