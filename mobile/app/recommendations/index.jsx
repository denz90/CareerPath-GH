import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getRecommendations } from '../../services/api';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecommendationsScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const riasecScores = JSON.parse(await AsyncStorage.getItem('careerPath_riasecScores') || '{}');
      const coreGrades = JSON.parse(await AsyncStorage.getItem('careerPath_coreGrades') || '{}');
      const electiveGrades = JSON.parse(await AsyncStorage.getItem('careerPath_electiveGrades') || '{}');

      if (Object.keys(riasecScores).length === 0) {
        setError("Missing assessment data. Please complete the quiz first.");
        setLoading(false);
        return;
      }

      const result = await getRecommendations(riasecScores, coreGrades, electiveGrades);
      setRecommendations(result.recommendations || []);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch recommendations. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const renderRecommendation = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => router.push(`/programmes/${item.programme.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchPercentage}>
            {item.scores?.final_score ? Math.round(item.scores.final_score * 100) : 0}% Match
          </Text>
        </View>
        <Text style={[styles.degreeType, { color: colors.primary }]}>{item.programme.degree_type}</Text>
      </View>

      <Text style={[styles.progName, { color: colors.text }]}>{item.programme.name}</Text>
      <Text style={[styles.fieldCategory, { color: colors.icon }]}>{item.programme.field_category}</Text>

      <View style={styles.scoresContainer}>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreLabel, { color: colors.icon }]}>Academic</Text>
          <View style={[styles.scoreBarBase, { backgroundColor: colors.border }]}>
            <View style={[styles.scoreBarFill, { backgroundColor: colors.secondary, width: `${(item.scores?.eligibility_score || 0) * 100}%` }]} />
          </View>
        </View>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreLabel, { color: colors.icon }]}>Interest</Text>
          <View style={[styles.scoreBarBase, { backgroundColor: colors.border }]}>
            <View style={[styles.scoreBarFill, { backgroundColor: colors.accent, width: `${(item.scores?.interest_score || 0) * 100}%` }]} />
          </View>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      
      <View style={styles.cardFooter}>
        <View style={styles.cutoffInfo}>
          <Text style={[styles.cutoffLabel, { color: colors.icon }]}>Typical Cutoff</Text>
          <Text style={[styles.cutoffValue, { color: colors.text }]}>{item.typical_cutoff}</Text>
        </View>
        <View style={[styles.viewButton, { backgroundColor: colors.primary + '15' }]}>
          <Text style={[styles.viewButtonText, { color: colors.primary }]}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.backButton}>
          <Ionicons name="home-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Top Matches</Text>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loaderText, { color: colors.icon, marginTop: 12 }]}>Analyzing your profile...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
          <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/assessment')}
          >
            <Text style={styles.retryButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.programme.id.toString()}
          renderItem={renderRecommendation}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
                Based on your WASSCE results and RIASEC interests.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  listHeader: {
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchBadge: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchPercentage: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  degreeType: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  progName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fieldCategory: {
    fontSize: 14,
    marginBottom: 16,
  },
  scoresContainer: {
    gap: 12,
    marginBottom: 16,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    width: 65,
    fontSize: 12,
    fontWeight: '500',
  },
  scoreBarBase: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cutoffInfo: {
    flexDirection: 'column',
  },
  cutoffLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cutoffValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
