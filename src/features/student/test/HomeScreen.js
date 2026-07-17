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

export default function HomeScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#0B0B0F"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >

        {/* BACK BUTTON */}

        <TouchableOpacity style={styles.backButton}>
          <Feather
            name="arrow-left"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>



        {/* TOP TEXT */}

        <Text style={styles.greeting}>
          Hi Student name,
        </Text>

        <Text style={styles.welcome}>
          Welcome to
        </Text>

        <Text style={styles.testName}>
          Test Name
        </Text>



        {/* INFO ROW */}

        <View style={styles.infoRow}>

          <View>
            <Text style={styles.infoLabel}>
              Question Count
            </Text>

            <Text style={styles.infoValue}>
              20 Questions
            </Text>
          </View>



          <View>
            <Text style={styles.infoLabel}>
              Total Marks
            </Text>

            <Text style={styles.infoValue}>
              100
            </Text>
          </View>



          <View>
            <Text style={styles.infoLabel}>
              Time Duration
            </Text>

            <Text style={styles.infoValue}>
              40 Minutes
            </Text>
          </View>

        </View>



        {/* TIMER CARD */}

        <View style={styles.timerCard}>

          <Text style={styles.scheduleText}>
            Your test is scheduled to begin at:
          </Text>

          <Text style={styles.timeText}>
            10:00 am , Jan 24 , 2026
          </Text>



          <View style={styles.remainingRow}>

            <Feather
              name="clock"
              size={16}
              color="#FF7A00"
            />

            <Text style={styles.remainingText}>
              Time Remaining
            </Text>

          </View>



          {/* COUNTDOWN */}

          <View style={styles.countdownRow}>

            <View style={styles.timeBox}>
              <Text style={styles.timeNumber}>00</Text>
              <Text style={styles.timeLabel}>Days</Text>
            </View>

            <Text style={styles.colon}>:</Text>

            <View style={styles.timeBox}>
              <Text style={styles.timeNumber}>01</Text>
              <Text style={styles.timeLabel}>Hours</Text>
            </View>

            <Text style={styles.colon}>:</Text>

            <View style={styles.timeBox}>
              <Text style={styles.timeNumber}>59</Text>
              <Text style={styles.timeLabel}>Minutes</Text>
            </View>

            <Text style={styles.colon}>:</Text>

            <View style={styles.timeBox}>
              <Text style={styles.timeNumber}>45</Text>
              <Text style={styles.timeLabel}>Seconds</Text>
            </View>

          </View>

        </View>



        {/* START BUTTON */}

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('QuestionOne')}
        >
          <Text style={styles.startButtonText}>
            Start Test
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    paddingHorizontal: 24,
    paddingTop:
      Platform.OS === 'android'
        ? Constants.statusBarHeight
        : 0,
  },



  scrollContainer: {
    paddingBottom: 60,
  },



  backButton: {
    marginTop: 4,
    marginBottom: 24,
  },



  greeting: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 26,
  },



  welcome: {
    color: '#D8D8D8',
    fontSize: 16,
    marginBottom: 8,
  },



  testName: {
    color: '#FF7A00',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 42,
  },



  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 52,
  },



  infoLabel: {
    color: '#D8D8D8',
    fontSize: 13,
    marginBottom: 8,
  },



  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },



  timerCard: {
    backgroundColor: '#171217',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 56,
  },



  scheduleText: {
    color: '#9B9B9B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
  },



  timeText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 34,
  },



  remainingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 34,
  },



  remainingText: {
    color: '#FF7A00',
    fontSize: 18,
    marginLeft: 10,
  },



  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },



  timeBox: {
    alignItems: 'center',
  },



  timeNumber: {
    color: '#FF7A00',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },



  timeLabel: {
    color: '#BEBEBE',
    fontSize: 12,
  },



  colon: {
    color: '#FF7A00',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 18,
  },



  startButton: {
    width: 160,
    height: 56,
    backgroundColor: '#FF7A00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },



  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },

});