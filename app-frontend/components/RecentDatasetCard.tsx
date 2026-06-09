import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function RecentDatasetCard() {
  return (
    <View>
        <Text style={styles.section}>Recent Datasets</Text>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Sales_Q4_2024.csv</Text>
            <Text style={styles.cardDate}>Dec 15, 2024</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
      section: {
    marginTop: 30,
    marginBottom: 12,
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#0F1A33",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#E5E7EB",
    fontWeight: "500",
  },

  cardDate: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
})

export default RecentDatasetCard