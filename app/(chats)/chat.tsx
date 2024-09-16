import { useRef } from 'react';
import { StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import getChats from '@/app/services/chats/get';
import postMessage from '@/app/services/chats/messages/post';
import { FontAwesome } from '@expo/vector-icons';
import IMessage from '@/interfaces/IMessage';
import { useAcc } from '@/contexts/accountContext';
import MessageBox from '@/components/MessageBox';

interface Chat {
  [key: string]: IMessage
}

export default function TabOneScreen() {
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();
  const [chats, setChats]: [Chat[], Function] = useState([]);
  const [chatIndex, setChatIndex] = useState(0);
  const [message, setMessage] = useState('');
  const { username } = useAcc();

  const key: string = Object.keys(chats)[chatIndex];
  const chat: IMessage[] = Object.values(Object.values(chats)[chatIndex] || {});

  useEffect(() => {
    getChats(setChats);
  }, []);

  const handlePress = () => {
    if (!username) {
      return alert('Provide a name, please :)');
    }

    if (!message) {
      return alert('Type a message, please :D');
    }

    postMessage(key, { sender: username, message: message });
    setMessage('');
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        <FlatList
          ref={flatListRef}
          data={chat}
          renderItem={({ item }) => <MessageBox key={item.id} message={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messages}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Message: " />
        <Pressable
          style={styles.button}
          onPress={handlePress}
        >
          {({ pressed }) => (
            <FontAwesome
              name={ pressed ? 'upload' : 'play'}
              color={Colors[colorScheme ?? 'light'].text}
              style={{ fontSize: pressed ? 25 : 18, color: 'lightgray' }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chat: {
    maxHeight: 400,
    marginBottom: 50,
  },
  messages: {
    alignItems: 'flex-start',
    rowGap: 20,
  },
  inputBox: {
    maxWidth: 800,
    minHeight: 50,
    columnGap: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexBasis: '80%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    color: "black",
    width: 300,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 10,
  },
});
