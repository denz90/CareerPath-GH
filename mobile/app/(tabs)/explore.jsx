import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getUniversities, getProgrammes } from '../../services/api';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function ExploreScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [activeTab, setActiveTab] = useState('universities'); // 'universities' or 'programmes'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'universities') {
        const result = await getUniversities();
        setData(result);
      } else {
        const result = await getProgrammes();
        setData(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => 
    (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.short_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUniversity = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => {/* Navigation to details later */}}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.typeTag, { backgroundColor: item.type === 'public' ? '#3b82f620' : '#f59e0b20' }]}>
          <Text style={[styles.typeTagText, { color: item.type === 'public' ? '#3b82f6' : '#f59e0b' }]}>
            {item.type.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.cardCode, { color: colors.icon }]}>{item.code}</Text>
      </View>
      <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
      <View style={styles.cardFooter}>
        <Ionicons name="location-outline" size={14} color={colors.icon} />
        <Text style={[styles.cardLocation, { color: colors.icon }]}>{item.location_city}, {item.region}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProgramme = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => router.push(`/programmes/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.typeTag, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.typeTagText, { color: colors.primary }]}>
            {item.degree_type}
          </Text>
        </View>
        <Text style={[styles.cardCode, { color: colors.icon }]}>{item.duration_years} Years</Text>
      </View>
      <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.cardCategory, { color: colors.icon }]}>{item.field_category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header & Tabs */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
        
        <View style={[styles.tabContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'universities' && { backgroundColor: colors.primary }]}
            onPress={() => setActiveTab('universities')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'universities' ? '#fff' : colors.icon }]}>Universities</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'programmes' && { backgroundColor: colors.primary }]}
            onPress={() => setActiveTab('programmes')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'programmes' ? '#fff' : colors.icon }]}>Programmes</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={`Search ${activeTab}...`}
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={activeTab === 'universities' ? renderUniversity : renderProgramme}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color={colors.icon} />
              <Text style={[styles.emptyText, { color: colors.icon }]}>No results found for &quot;{searchQuery}&quot;</Text>
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    borderRadius: 18,
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
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardCode: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocation: {
    fontSize: 13,
    marginLeft: 4,
  },
  cardCategory: {
    fontSize: 14,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
  }
});
