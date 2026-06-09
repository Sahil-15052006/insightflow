import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function BackButton(){

    const router=useRouter()
    
    return(
        <View>
            <TouchableOpacity onPress={() => router.back()}>
                      <Text style={styles.back}> Back </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  back: {
    fontSize: 12,
    backgroundColor: "#7C5CFF",
    color:"#ffffff",
    paddingVertical: 6,
    marginBottom:20,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: "flex-start"
  },
})