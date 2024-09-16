import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAcc } from '@/contexts/accountContext';

export default function TabTwoScreen() {
  const { username: accUsername, setUsername: setAccUsername } = useAcc();
  const [username, setUsername] = useState(accUsername);
  const [buttonDisabled, setButtonDisabled] = useState(username === accUsername);

  useEffect(() => {
    setButtonDisabled(username === accUsername);
  }, [username, accUsername]);

  useEffect(() => {
    setUsername(accUsername);
  }, [accUsername]);
  
  const handlePress = () => {
    setAccUsername(username);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey! We need a username to forward your messages :)))</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      <Button title="Save" onPress={handlePress} disabled={buttonDisabled}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 50,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "white",
    color: "black",
    width: 300,
    borderRadius: 5,
  },
});
