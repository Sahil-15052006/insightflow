import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type Props ={
    title:string,
    onPress:()=>void
}

export default function UploadButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: "#2196F3",
    borderStyle: "solid", 
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(33,150,243,0.08)", 
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    color: "#2196F3",
    fontSize: 15,
    fontWeight: "600",
  },
});