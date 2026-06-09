import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import { useState } from 'react';
import api from './api';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store'

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    try {
      setLoading(true)
      if (!(email && password)) {
        Toast.show({
          type: "info",
          text1: "Alert",
          text2: "All fields are required"
        })
      }
      const res = await api.post('/auth/login', {
        email,
        password
      })
      await SecureStore.setItemAsync("token", res.data.token)
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged in successfully"
      })
      router.replace('/(tabs)/home')
      console.log('logged in ');
      
    } catch (err: any) {
      
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.response.data.message || 'something went wrong'
      })

      console.log('Error :',err.response.data.message);
      
    } finally {
      setLoading(false)
    }
  }

  const guest=async()=>{
    try{
      setLoading(true)
      const res = await api.post('/auth/guest')
      await SecureStore.setItemAsync('token',res.data.token)
            Toast.show({
        type: "success",
        text1: "Success",
        text2: "Guest logged in successfully"
      })
      router.replace('/(tabs)/home')
    } catch(err:any){
        Toast.show({
        type: "error",
        text1: "Error",
        text2: err.response.data.message || 'something went wrong'
      })
      console.log('Error :',err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      
      {loading && <LoadingOverlay />}

      <Text style={styles.title}>InsightFlow</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        placeholderTextColor="#6B7280"
        style={styles.input}
        />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#6B7280"
        secureTextEntry
        style={styles.input}
        />

      <Button title='Sign In' method={login} />

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.registerLink}>Create Account</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.guestButton}
        onPress={guest}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
          Guest account will be automatically deleted after 24 hours and will be not accessible after user logged out
      </Text>
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#E5E7EB',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    color: '#E5E7EB',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  registerText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 18,
  },

  registerLink: {
    color: "#7C5CFF",
    fontWeight: "500",
  },

  guestButton: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#7C5CFF",
    alignItems: "center",
  },

  guestText: {
    color: "#7C5CFF",
    fontWeight: "500",
  },
});