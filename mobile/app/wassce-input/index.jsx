import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, TextInput, FlatList, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GRADES = [
  { label: 'A1 (Excellent)', value: 'A1', point: 1 },
  { label: 'B2 (Very Good)', value: 'B2', point: 2 },
  { label: 'B3 (Good)', value: 'B3', point: 3 },
  { label: 'C4 (Credit)', value: 'C4', point: 4 },
  { label: 'C5 (Credit)', value: 'C5', point: 5 },
  { label: 'C6 (Credit)', value: 'C6', point: 6 },
  { label: 'D7 (Pass)', value: 'D7', point: 7 },
  { label: 'E8 (Pass)', value: 'E8', point: 8 },
  { label: 'F9 (Fail)', value: 'F9', point: 9 },
];

const ELECTIVE_SUBJECTS = [
  'Elective Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'Economics', 'Government', 'History', 'Geography', 
  'Literature-in-English', 'Christian Religious Studies', 
  'Financial Accounting', 'Business Management', 'Cost Accounting',
  'General Agriculture', 'Graphic Design', 'Visual Arts',
  'French', 'ICT (Elective)', 'Food and Nutrition'
].sort();

export default function WassceInputScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [coreGrades, setCoreGrades] = useState({
    'English Language': 'A1',
    'Mathematics (Core)': 'A1',
    'Integrated Science': 'A1',
    'Social Studies': 'A1',
  });

  const [electives, setElectives] = useState([
    { name: 'Elective Mathematics', grade: 'B2' },
    { name: 'Physics', grade: 'B3' },
    { name: 'Chemistry', grade: 'C4' },
  ]);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('subject'); // 'subject' or 'grade'
  const [activeElectiveIndex, setActiveElectiveIndex] = useState(null);
  const [activeCoreSubject, setActiveCoreSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const aggregate = useMemo(() => {
    const corePoints = Object.values(coreGrades).map(g => GRADES.find(gr => gr.value === g).point);
    const sortedCore = [...corePoints].sort((a, b) => a - b);
    const best3Core = sortedCore.slice(0, 3).reduce((a, b) => a + b, 0);
    const electivePoints = electives.map(e => GRADES.find(gr => gr.value === e.grade).point);
    return best3Core + electivePoints.reduce((a, b) => a + b, 0);
  }, [coreGrades, electives]);

  const filteredSubjects = ELECTIVE_SUBJECTS.filter(s => 
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (value) => {
    if (modalType === 'subject') {
      const newElectives = [...electives];
      newElectives[activeElectiveIndex].name = value;
      setElectives(newElectives);
    } else if (modalType === 'grade') {
      if (activeCoreSubject) {
        setCoreGrades(prev => ({ ...prev, [activeCoreSubject]: value }));
      } else {
        const newElectives = [...electives];
        newElectives[activeElectiveIndex].grade = value;
        setElectives(newElectives);
      }
    }
    closeModal();
  };

  const openModal = (type, electiveIdx = null, coreSub = null) => {
    setModalType(type);
    setActiveElectiveIndex(electiveIdx);
    setActiveCoreSubject(coreSub);
    setSearchQuery('');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery('');
  };

  const handleFinish = async () => {
    const electiveGradesMap = {};
    electives.forEach(e => electiveGradesMap[e.name] = e.grade);
    await AsyncStorage.setItem('careerPath_coreGrades', JSON.stringify(coreGrades));
    await AsyncStorage.setItem('careerPath_electiveGrades', JSON.stringify(electiveGradesMap));
    router.push('/recommendations');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>WASSCE Results</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>Academic Profile Setup</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.aggCard, { backgroundColor: colors.primary }]}>
          <View>
            <Text style={styles.aggLabel}>Calculated Aggregate</Text>
            <Text style={styles.aggValue}>{aggregate}</Text>
          </View>
          <View style={styles.aggBadge}>
            <Text style={styles.aggBadgeText}>{aggregate <= 24 ? 'Highly Eligible' : 'Standard'}</Text>
          </View>
        </View>

        {/* Core Subjects Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>Core Subjects</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {Object.keys(coreGrades).map((subject, idx) => (
              <TouchableOpacity 
                key={subject} 
                style={[styles.row, idx !== 3 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
                onPress={() => openModal('grade', null, subject)}
              >
                <Text style={[styles.rowLabel, { color: colors.text }]}>{subject}</Text>
                <View style={styles.valueSelector}>
                  <Text style={[styles.valueText, { color: colors.primary }]}>{coreGrades[subject]}</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.icon} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Elective Subjects Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>Elective Subjects</Text>
          {electives.map((e, idx) => (
            <View key={idx} style={[styles.electiveCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.electiveNumber, { color: colors.primary }]}>Elective {idx + 1}</Text>
              
              <TouchableOpacity 
                style={[styles.inputGroup, { marginTop: 12 }]}
                onPress={() => openModal('subject', idx)}
              >
                <Text style={[styles.inputLabel, { color: colors.icon }]}>Subject Name</Text>
                <View style={[styles.selectorBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Text style={[styles.selectorText, { color: colors.text }]}>{e.name}</Text>
                  <Ionicons name="search-outline" size={18} color={colors.icon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.inputGroup}
                onPress={() => openModal('grade', idx)}
              >
                <Text style={[styles.inputLabel, { color: colors.icon }]}>Grade Obtained</Text>
                <View style={[styles.selectorBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Text style={[styles.selectorText, { color: colors.text }]}>
                    {GRADES.find(g => g.value === e.grade).label}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color={colors.icon} />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleFinish}
        >
          <Text style={styles.submitText}>Analyze My Eligibility</Text>
          <Ionicons name="analytics-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      {/* Modern Selection Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {modalType === 'subject' ? 'Select Elective' : 'Select Grade'}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close-circle" size={32} color={colors.icon} />
              </TouchableOpacity>
            </View>

            {modalType === 'subject' && (
              <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Ionicons name="search" size={20} color={colors.icon} />
                <TextInput
                  placeholder="Search subject..."
                  placeholderTextColor={colors.icon}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={[styles.searchInput, { color: colors.text }]}
                />
              </View>
            )}

            <FlatList
              data={modalType === 'subject' ? filteredSubjects : GRADES}
              keyExtractor={(item) => typeof item === 'string' ? item : item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.listItem, { borderBottomColor: colors.border }]}
                  onPress={() => handleSelect(typeof item === 'string' ? item : item.value)}
                >
                  <Text style={[styles.listItemText, { color: colors.text }]}>
                    {typeof item === 'string' ? item : item.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={18} color={colors.icon} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: Platform.OS === 'ios' ? 10 : 20 },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  aggCard: { padding: 24, borderRadius: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, elevation: 8, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  aggLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  aggValue: { color: '#fff', fontSize: 42, fontWeight: '900' },
  aggBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  aggBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  section: { marginBottom: 32 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, marginLeft: 4 },
  card: { borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 56 },
  rowLabel: { fontSize: 15, fontWeight: '500', flex: 1 },
  valueSelector: { flexDirection: 'row', alignItems: 'center' },
  valueText: { fontSize: 16, fontWeight: 'bold', marginRight: 4 },
  electiveCard: { borderRadius: 20, borderWidth: 1, padding: 16, marginBottom: 16 },
  electiveNumber: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 6, marginLeft: 4 },
  selectorBox: { borderRadius: 12, height: 56, borderWidth: 1, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectorText: { fontSize: 15, fontWeight: '500' },
  submitButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 18, marginTop: 10 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { height: '80%', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold' },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 50, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1 },
  listItemText: { fontSize: 16, fontWeight: '500' }
});
