import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { useAuth } from '../../context/AuthContext';
import { getNews } from '../../services/api';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  const { user } = useAuth();
  const [newsItems, setNewsItems] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNewsItems(data);
    } catch (e) {
      console.error('Error fetching news:', e);
    } finally {
      setLoadingNews(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.icon }]}>Hello,</Text>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.name || 'Future Graduate'}</Text>
          </View>
          <TouchableOpacity style={[styles.profileIcon, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push('/assessment')}
          style={styles.heroCard}
        >
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop' }}
            style={styles.heroBg}
            imageStyle={{ borderRadius: 24 }}
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroTag}>
                <Ionicons name="sparkles" size={12} color="#fff" />
                <Text style={styles.heroTagText}>NEW ASSESSMENT</Text>
              </View>
              <Text style={styles.heroTitle}>Discover Your Ideal Career Path</Text>
              <Text style={styles.heroSubtitle}>Take our RIASEC interest quiz and get personalized university recommendations.</Text>
              
              <View style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Start Quiz</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.primary} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/explore')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="business-outline" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.actionText, { color: colors.text }]}>Universities</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/explore')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.secondary + '15' }]}>
                <Ionicons name="book-outline" size={24} color={colors.secondary} />
              </View>
              <Text style={[styles.actionText, { color: colors.text }]}>Programmes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/wassce-input')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.accent + '15' }]}>
                <Ionicons name="calculator-outline" size={24} color={colors.accent} />
              </View>
              <Text style={[styles.actionText, { color: colors.text }]}>WASSCE Input</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/recommendations')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#10b98115' }]}>
                <Ionicons name="star-outline" size={24} color="#10b981" />
              </View>
              <Text style={[styles.actionText, { color: colors.text }]}>Matches</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Deadlines (Mock) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Application News</Text>
            <TouchableOpacity onPress={() => router.push('/news')}>
              <Text style={{ color: colors.primary, fontWeight: '600' }}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.newsList}>
            {loadingNews ? (
              <View style={styles.loaderContainer}>
                <Text style={{ color: colors.icon }}>Loading latest news...</Text>
              </View>
            ) : newsItems.length > 0 ? (
              newsItems.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[styles.newsCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={styles.newsContent}>
                    <View style={styles.newsHeader}>
                      <Text style={[styles.newsDate, { color: colors.icon }]}>{item.date}</Text>
                      <View style={[styles.tag, { backgroundColor: colors.primary + '10' }]}>
                        <Text style={[styles.tagText, { color: colors.primary }]}>{item.tag}</Text>
                      </View>
                    </View>
                    <Text style={[styles.newsTitle, { color: colors.text }]}>{item.title}</Text>
                    <Text style={[styles.newsSnippet, { color: colors.icon }]} numberOfLines={2}>{item.snippet}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.icon} />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.loaderContainer}>
                <Text style={{ color: colors.icon }}>No news available at the moment.</Text>
              </View>
            )}
          </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    height: 220,
    marginBottom: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  heroBg: {
    flex: 1,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'center',
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
    maxWidth: '85%',
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#4f46e5',
    fontWeight: 'bold',
    marginRight: 6,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  newsList: {
    gap: 12,
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  newsContent: {
    flex: 1,
    paddingRight: 12,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  newsDate: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsSnippet: {
    fontSize: 12,
    lineHeight: 16,
  },
  loaderContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
