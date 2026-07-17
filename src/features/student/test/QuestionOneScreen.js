import { useState } from 'react';

import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Constants from 'expo-constants';

import {
    Feather,
} from '@expo/vector-icons';

export default function QuestionOneScreen({ navigation }) {

  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    'Data Science',
    'Web Development',
    'Artificial Intelligence',
    'Cloud Computing',
  ];

  return (
    <SafeAreaView style={styles.container}>
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 60 }}
  >

      <StatusBar
        backgroundColor="#F7F7F7"
        barStyle="dark-content"
      />



      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.logo}>
          Coirei
        </Text>



        <View style={styles.headerRight}>

          <Feather
            name="clock"
            size={16}
            color="#333"
          />

          <Text style={styles.timerText}>
            00:20:00
          </Text>



          <TouchableOpacity style={styles.finishButton}>
            <Text style={styles.finishButtonText}>
              Finish Test
            </Text>
          </TouchableOpacity>

        </View>

      </View>



      {/* PAGINATION */}

      <View style={styles.paginationRow}>

        <Feather
          name="chevron-left"
          size={20}
          color="#444"
        />



        <TouchableOpacity style={styles.activePageBox}>
          <Text style={styles.activePageText}>
            1
          </Text>
        </TouchableOpacity>



        <TouchableOpacity style={styles.pageBox}>
          <Text style={styles.pageText}>
            2
          </Text>
        </TouchableOpacity>



        <TouchableOpacity style={styles.pageBox}>
          <Text style={styles.pageText}>
            3
          </Text>
        </TouchableOpacity>



        <Feather
          name="chevron-right"
          size={20}
          color="#444"
        />

      </View>



      {/* ATTEMPTED */}

      <Text style={styles.attemptText}>
        Attempted 0/20
      </Text>



      {/* QUESTION CARD */}

      <View style={styles.questionCard}>

        <View style={styles.questionTopRow}>

          <Text style={styles.questionNumber}>
            Question 1
          </Text>

          <Feather
            name="bookmark"
            size={16}
            color="#666"
          />

        </View>



        <Text style={styles.questionText}>
          Machine Learning is a subset of which field?
        </Text>

      </View>



      {/* OPTION HEADER */}

      <View style={styles.optionHeaderRow}>

        <Text style={styles.selectOptionText}>
          Select an Option
        </Text>



        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>
            Clear Response
          </Text>
        </TouchableOpacity>

      </View>



      {/* OPTIONS */}

      {
        options.map((item, index) => (

          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => setSelectedOption(item)}
          >

            <View style={styles.optionLeftRow}>

              <View style={styles.radioOuter}>

                {
                  selectedOption === item && (
                    <View style={styles.radioInner} />
                  )
                }

              </View>



              <Text style={styles.optionText}>
                {item}
              </Text>

            </View>

          </TouchableOpacity>

        ))
      }



      {/* NEXT BUTTON */}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('QuestionTwo')}
      >
        <Text style={styles.nextButtonText}>
          Next
        </Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 18,
    paddingTop:
      Platform.OS === 'android'
        ? Constants.statusBarHeight
        : 0,
  },



  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },



  logo: {
    color: '#FF7A00',
    fontSize: 34,
    fontWeight: '300',
  },



  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },



  timerText: {
    color: '#444',
    marginLeft: 6,
    marginRight: 14,
    fontSize: 13,
  },



  finishButton: {
    backgroundColor: '#FFE8D5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },



  finishButtonText: {
    color: '#FF7A00',
    fontSize: 13,
    fontWeight: '500',
  },



  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 36,
  },



  activePageBox: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: '#FF7A00',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#FFF4EB',
  },



  pageBox: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },



  activePageText: {
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: '600',
  },



  pageText: {
    color: '#333',
    fontSize: 16,
  },



  attemptText: {
    alignSelf: 'flex-end',
    color: '#333',
    marginBottom: 10,
    fontSize: 15,
  },



  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
  },



  questionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },



  questionNumber: {
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
  },



  questionText: {
    color: '#222',
    fontSize: 18,
    lineHeight: 28,
  },



  optionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 18,
  },



  selectOptionText: {
    color: '#B0B7CC',
    fontSize: 15,
  },



  clearButton: {
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },



  clearButtonText: {
    color: '#666',
    fontSize: 13,
  },



  optionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 14,
    marginBottom: 16,
  },



  optionLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },



  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },



  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF7A00',
  },



  optionText: {
    color: '#333',
    fontSize: 16,
  },



  nextButton: {
    width: 150,
    height: 56,
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
  },



  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },

});