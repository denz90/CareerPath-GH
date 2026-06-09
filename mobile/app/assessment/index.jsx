import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getQuestions } from '../../services/api';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function AssessmentScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const progress = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuestions();
      console.log(`Fetched ${data?.length || 0} questions`);
      if (!data || data.length === 0) {
        setError("No questions found in the database. Please ensure the database is seeded.");
      } else {
        // Select 20 random questions or top 20
        setQuestions(data.slice(0, 20));
      }
    } catch (e) {
      console.error(e);
      setError("Unable to connect to the server. Please check your internet and ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (isYes) => {
    const currentQuestion = questions[currentIndex];
    
    if (isYes) {
      setScores(prev => ({
        ...prev,
        [currentQuestion.riasec_type]: prev[currentQuestion.riasec_type] + 1
      }));
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      Animated.timing(progress, {
        toValue: ((currentIndex + 1) / questions.length) * 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = async () => {
    await AsyncStorage.setItem('careerPath_riasecScores', JSON.stringify(scores));
    router.push('/wassce-input');
  };

  if (loading) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loaderText, { color: colors.icon, marginTop: 12 }]}>Loading questions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: 32 }]}>
        <Ionicons name="cloud-offline-outline" size={80} color={colors.icon} />
        <Text style={[styles.errorTitle, { color: colors.text }]}>Oops!</Text>
        <Text style={[styles.errorText, { color: colors.icon }]}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={fetchQuestions}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.icon }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBarBase, { backgroundColor: colors.border }]}>
            <Animated.View 
              style={[
                styles.progressBarFill, 
                { 
                  backgroundColor: colors.primary,
                  width: progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: colors.icon }]}>Question {currentIndex + 1} of {questions.length}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Animated.View style={[styles.questionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="sparkles" size={32} color={colors.primary} />
          </View>
          <Text style={[styles.questionText, { color: colors.text }]}>{currentQuestion?.question}</Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.optionButton, { backgroundColor: colors.primary }]}
            onPress={() => handleAnswer(true)}
          >
            <Text style={styles.optionButtonText}>{currentQuestion?.option_yes || 'Yes, I enjoy this'}</Text>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}
            onPress={() => handleAnswer(false)}
          >
            <Text style={[styles.optionButtonText, { color: colors.text }]}>{currentQuestion?.option_no || 'No, not for me'}</Text>
            <Ionicons name="close-circle-outline" size={24} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>
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
  progressContainer: {
    flex: 1,
  },
  progressBarBase: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  questionCard: {
    borderRadius: 32,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
