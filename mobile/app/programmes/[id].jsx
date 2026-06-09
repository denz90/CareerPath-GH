import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getProgramme, getProgrammeUniversities } from '../../services/api';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function ProgrammeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [programme, setProgramme] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [prog, unis] = await Promise.all([
        getProgramme(id),
        getProgrammeUniversities(id)
      ]);
      setProgramme(prog);
      setUniversities(unis);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!programme) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.circleButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="heart-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
              <Text style={[styles.badgeText, { color: colors.primary }]}>{programme.field_category}</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>{programme.name}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color={colors.icon} />
                <Text style={[styles.metaText, { color: colors.icon }]}>{programme.duration_years} Years</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="school-outline" size={16} color={colors.icon} />
                <Text style={[styles.metaText, { color: colors.icon }]}>{programme.degree_type}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.descriptionBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
            <Text style={[styles.description, { color: colors.icon }]}>{programme.description}</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={[styles.detailItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="briefcase-outline" size={24} color={colors.secondary} />
              <Text style={[styles.detailLabel, { color: colors.text }]}>Careers</Text>
              <Text style={[styles.detailValue, { color: colors.icon }]} numberOfLines={3}>
                {programme.career_outcomes || 'Consultant, Analyst, Manager'}
              </Text>
            </View>
            <View style={[styles.detailItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="flask-outline" size={24} color={colors.accent} />
              <Text style={[styles.detailLabel, { color: colors.text }]}>Track</Text>
              <Text style={[styles.detailValue, { color: colors.icon }]}>
                {programme.shs_background || 'General Science'}
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 12, marginBottom: 16 }]}>Where to Study</Text>
          
          {universities.map(uni => (
            <View key={uni.id} style={[styles.uniCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.uniInfo}>
                <Text style={[styles.uniName, { color: colors.text }]}>{uni.university.name}</Text>
                <Text style={[styles.uniLocation, { color: colors.icon }]}>{uni.campus || 'Main Campus'}</Text>
              </View>
              <View style={styles.cutoffBox}>
                <Text style={[styles.cutoffLabel, { color: colors.icon }]}>CUTOFF</Text>
                <Text style={[styles.cutoffValue, { color: colors.primary }]}>{uni.wassce_cutoff || 'N/A'}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
    lineHeight: 40,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionBox: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  detailItem: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    lineHeight: 18,
  },
  uniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  uniInfo: {
    flex: 1,
    paddingRight: 12,
  },
  uniName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  uniLocation: {
    fontSize: 12,
  },
  cutoffBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 70,
  },
  cutoffLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cutoffValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
