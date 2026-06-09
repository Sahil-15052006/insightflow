import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import api from "../api";
import * as DocumentPicker from "expo-document-picker"
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import ButtonComponent from "@/components/Button";
import DatasetPreview from "@/components/dataset-preview";
import UploadButton from "@/components/UploadButton";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {

  const [userName,setUserName]=useState("")
  const [file,setFile]=useState<any>(null)
  const [btnTitle,setBtnTitle]=useState("Select Dataset File")
  const [data,setData] = useState<any>(null)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    getUserData()
  },[])

  const getUserData = async()=>{
    const res= await api.get('/userInfo')
    setUserName(res.data.user.name)
  }

  const selectFile=async()=>{
    try{
      const result = await DocumentPicker.getDocumentAsync({
        type:"*/*",
      })
      if (!result.canceled){
        const selectedFile = result.assets[0]
        setFile(selectedFile)
        setBtnTitle(selectedFile.name)
      }     
    }catch(err:any){
      console.log(`Error Picking File : ${err.message}`);
      console.log(file.uri);
    }
  }

const uploadFile = async () => {
  if (!file) {
    return Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Select a file first'
    });
  }

  const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    } as any);

    try {
      setLoading(true);

      const res = await fetch(`http://10.188.123.16:5000/uploadFile/upload`,{
        method:'POST',
        body:formData
      })
      const jsonData = await res.json()
      setData(jsonData.cleanedData);
      console.log(jsonData.cleanedData);

    } catch (err: any) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
};
  
  return (
    <View style={styles.container}>

      {loading && <LoadingOverlay/>}

      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.name}>{userName} 👋</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userName[0]}</Text>
        </View>
      </View>

      <UploadButton title={btnTitle} onPress={selectFile}/>
      
      <ButtonComponent title="Upload DataSet" method={uploadFile}/>

      <DatasetPreview data2={data}/>

      <Toast/>

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1F",
    padding: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 30,
  },

  welcome: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  name: {
    color: "#E5E7EB",
    fontSize: 22,
    fontWeight: "600",
  },

  avatar: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#7C5CFF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "white",
    fontWeight: "600",
  },

  uploadButton: {
    marginTop:20,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  uploadText: {
    color: "#fff",
    fontWeight: "600",
  },
});