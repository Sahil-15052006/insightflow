import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Insights() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>💡</Text>
        </View>

        <View>
          <Text style={styles.title}>AI Generated Insights</Text>
          <Text style={styles.subtitle}>
            Powered by Machine Learning
          </Text>
        </View>
      </View>

      {/* Main Insight Card */}
      <View style={styles.mainCard}>

        <View style={styles.tagRow}>
          <Text style={styles.tag}>Growth</Text>
          <Text style={styles.tagSecondary}>High Impact</Text>
        </View>

        <Text style={styles.insightText}>
          Revenue increased by 23.5% compared to the previous quarter.
          The growth is primarily driven by the Western region,
          which accounts for 42% of total sales.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.confidence}>Confidence: 94%</Text>
          <Text style={styles.details}>View Details →</Text>
        </View>

      </View>

      {/* Top Category */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Category</Text>
        <Text style={styles.cardSubtitle}>Trending</Text>

        <Text style={styles.cardText}>
          Electronics leads with 38% market share
        </Text>
      </View>

      {/* Alert */}
      <View style={styles.cardAlert}>
        <Text style={styles.cardTitle}>Attention Needed</Text>
        <Text style={styles.cardSubtitleAlert}>Alert</Text>

        <Text style={styles.cardText}>
          Q4 inventory levels below threshold
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#050E1F",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical:25,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#7C5CFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  icon: {
    fontSize: 18,
  },

  title: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "600",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  mainCard: {
    backgroundColor: "#0F1A33",
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#7C5CFF",
  },

  tagRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  tag: {
    backgroundColor: "#22C55E",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
    marginRight: 6,
  },

  tagSecondary: {
    backgroundColor: "#7C5CFF",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
  },

  insightText: {
    color: "#E5E7EB",
    lineHeight: 20,
    marginBottom: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  confidence: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  details: {
    color: "#7C5CFF",
    fontSize: 12,
  },

  card: {
    backgroundColor: "#0F1A33",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },

  cardAlert: {
    backgroundColor: "#0F1A33",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F59E0B",
  },

  cardTitle: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  cardSubtitle: {
    color: "#3B82F6",
    fontSize: 12,
    marginBottom: 6,
  },

  cardSubtitleAlert: {
    color: "#F59E0B",
    fontSize: 12,
    marginBottom: 6,
  },

  cardText: {
    color: "#9CA3AF",
  },

});