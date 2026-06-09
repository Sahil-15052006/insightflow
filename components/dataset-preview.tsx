import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

export default function DatasetPreview(data2:any) {
  const router = useRouter();

  const data = [
    { id: "001", name: "Alpha", sales: "$2,450", date: "12/01" },
    { id: "002", name: "Beta", sales: "$3,120", date: "12/02" },
    { id: "003", name: "Gamma", sales: "$1,890", date: "12/03" },
    { id: "004", name: "Delta", sales: "$4,210", date: "12/04" },
    { id: "005", name: "Epsilon", sales: "$2,780", date: "12/05" },
  ];

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dataset Preview</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>

        {/* Table Header */}
        <View style={styles.rowHeader}>
          <Text style={styles.headerText}>ID</Text>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Sales</Text>
          <Text style={styles.headerText}>Date</Text>
        </View>

        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.sales}</Text>
            <Text style={styles.cell}>{item.date}</Text>
          </View>
        ))}

      </View>
      <Button title="Analyze Data" method={()=>router.push('/(analysis)/dashboard')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1F",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },


  title: {
    fontSize: 18,
    color: "#E5E7EB",
    fontWeight: "600",
  },

  table: {
    backgroundColor: "#111B35",
    borderRadius: 12,
    overflow: "hidden",
  },

  rowHeader: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#1E2A4A",
  },

  headerText: {
    flex: 1,
    color: "#9CA3AF",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#1F2A44",
  },

  cell: {
    flex: 1,
    color: "#E5E7EB",
    fontSize: 13,
  },

  buttons: {
    flexDirection: "row",
    marginTop: 24,
    gap: 10,
  },

  analyzeBtn: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  analyzeText: {
    color: "#fff",
    fontWeight: "600",
  },

  editBtn: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#1F2A44",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  editText: {
    color: "#E5E7EB",
  },
});