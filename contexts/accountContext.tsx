import { useState, createContext, useContext, Context, ReactNode, SetStateAction, Dispatch, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ContextValues {
    username: string 
    setUsername: (username: string) => Promise<void>
}
const AccountContext: Context<ContextValues> = createContext<ContextValues>({ username: '', setUsername: async () => {}});

const STORAGE_KEY = 'USERNAME';
const AccountProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const loadUsername = async () => {
            const storedUsername = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedUsername) {
                setUsername(storedUsername);
            } else {
                setUsername('');
            }
        };
        loadUsername();
    }, []);

    const persist = async (newUsername: string) => {
        if (newUsername) {
            console.log(`New username: ${newUsername}`);
            await AsyncStorage.setItem(STORAGE_KEY, newUsername);
            setUsername(newUsername);
        } else {
            await AsyncStorage.removeItem(STORAGE_KEY);
        }
    };

    const values: ContextValues = { username, setUsername: persist };
    return (
        <AccountContext.Provider value={values}>
            {children}
        </AccountContext.Provider>
    );
}

const useAcc = () => useContext(AccountContext);

export { AccountProvider, useAcc };