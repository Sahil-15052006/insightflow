import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
    title:string;
    method:()=>void;
}

export default function Button({title,method}:Props) {

  const router = useRouter()

  return (
    <View>
        <TouchableOpacity onPress={method}>
            <LinearGradient
                colors={["#7C5CFF", "#9B8AFB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})
