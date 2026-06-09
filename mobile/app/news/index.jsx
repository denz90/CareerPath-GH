import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { getNews } from '../../services/api';

export default function NewsScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const universities = ['ALL', 'KNUST', 'UG-LEGON', 'UCC', 'UDS', 'GIMPA'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await getNews();
      setNews(data);
      setFilteredNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (uni) => {
    setActiveFilter(uni);
    if (uni === 'ALL') {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => item.source === uni));
    }
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const renderNewsItem = ({ item }) => (
    <View style={[styles.newsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.sourceTag, { backgroundColor: colors.primary + '15' }]}>
          <Text style={[styles.sourceText, { color: colors.primary }]}>{item.source}</Text>
        </View>
        <Text style={[styles.dateText, { color: colors.icon }]}>{item.date}</Text>
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.snippet, { color: colors.icon }]}>{item.snippet}</Text>
      
      <View style={styles.cardFooter}>
        <View style={[styles.categoryTag, { backgroundColor: '#10b98115' }]}>
          <Text style={[styles.categoryText, { color: '#10b981' }]}>{item.tag}</Text>
        </View>
        <TouchableOpacity 
          style={styles.readMoreBtn}
          onPress={() => handleOpenLink(item.url)}
        >
          <Text style={[styles.readMoreText, { color: colors.primary }]}>Read Full Story</Text>
          <Ionicons name="open-outline" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: 'University News', headerShadowVisible: false }} />
      
      {/* Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          data={universities}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.filterChip, 
                { backgroundColor: activeFilter === item ? colors.primary : colors.card, borderColor: colors.border },
                activeFilter === item && { borderColor: colors.primary }
              ]}
              onPress={() => applyFilter(item)}
            >
              <Text style={[
                styles.filterText, 
                { color: activeFilter === item ? '#fff' : colors.text }
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loaderText, { color: colors.icon }]}>Fetching academic updates...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNewsItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="newspaper-outline" size={60} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.icon }]}>No academic news found for this selection.</Text>
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
  filterContainer: {
    paddingVertical: 12,
  },
  filterList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  newsCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sourceText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  snippet: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 12,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '700',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  }
});
