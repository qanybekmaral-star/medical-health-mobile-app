import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function MedicalHomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('notifications');
  const [selectedDate, setSelectedDate] = useState('24');
  const [messageText, setMessageText] = useState('');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'notifications':
        return <NotificationsScreen />;
      case 'messages':
        return <MessagesScreen messageText={messageText} setMessageText={setMessageText} />;
      case 'doctorProfile':
        return <DoctorProfileScreen onNavigateToSchedule={() => setCurrentScreen('schedule')} />;
      case 'schedule':
        return <ScheduleScreen selectedDate={selectedDate} setSelectedDate={setSelectedDate} onBookComplete={() => setCurrentScreen('details')} />;
      case 'details':
        return <DetailsScreen />;
      default:
        return <NotificationsScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FC" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentScreen === 'notifications' && 'Notification'}
          {currentScreen === 'messages' && 'Dr. Olivia Turner'}
          {currentScreen === 'doctorProfile' && 'Doctor Profile'}
          {currentScreen === 'schedule' && 'Schedule'}
          {currentScreen === 'details' && 'Your Appointment'}
        </Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={22} color="#1E3A8A" style={{ marginRight: 15 }} />
          <Ionicons name="ellipsis-vertical" size={22} color="#1E3A8A" />
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTab}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('notifications')}
        >
          <Ionicons 
            name={currentScreen === 'notifications' ? 'notifications' : 'notifications-outline'} 
            size={24} 
            color={currentScreen === 'notifications' ? '#2563EB' : '#94A3B8'} 
          />
          <Text style={[styles.tabText, currentScreen === 'notifications' && styles.activeTabText]}>Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('messages')}
        >
          <Ionicons 
            name={currentScreen === 'messages' ? 'chatbubbles' : 'chatbubbles-outline'} 
            size={24} 
            color={currentScreen === 'messages' ? '#2563EB' : '#94A3B8'} 
          />
          <Text style={[styles.tabText, currentScreen === 'messages' && styles.activeTabText]}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('doctorProfile')}
        >
          <Ionicons 
            name={currentScreen === 'doctorProfile' ? 'person' : 'person-outline'} 
            size={24} 
            color={currentScreen === 'doctorProfile' ? '#2563EB' : '#94A3B8'} 
          />
          <Text style={[styles.tabText, currentScreen === 'doctorProfile' && styles.activeTabText]}>Doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('schedule')}
        >
          <Ionicons 
            name={currentScreen === 'schedule' ? 'calendar' : 'calendar-outline'} 
            size={24} 
            color={currentScreen === 'schedule' ? '#2563EB' : '#94A3B8'} 
          />
          <Text style={[styles.tabText, currentScreen === 'schedule' && styles.activeTabText]}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('details')}
        >
          <Ionicons 
            name={currentScreen === 'details' ? 'document-text' : 'document-text-outline'} 
            size={24} 
            color={currentScreen === 'details' ? '#2563EB' : '#94A3B8'} 
          />
          <Text style={[styles.tabText, currentScreen === 'details' && styles.activeTabText]}>Details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function NotificationsScreen() {
  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.dateSectionTitle}>Today</Text>
      
      <View style={styles.notificationCard}>
        <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
          <Ionicons name="calendar" size={20} color="#2563EB" />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>Scheduled Appointment</Text>
          <Text style={styles.notificationDesc}>Dr. Olivia Turner confirmed your slot at 10:00 AM.</Text>
        </View>
      </View>

      <View style={styles.notificationCard}>
        <View style={[styles.iconBox, { backgroundColor: '#E0E7FF' }]}>
          <Ionicons name="time" size={20} color="#4F46E5" />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>Rescheduled Change</Text>
          <Text style={styles.notificationDesc}>Your appointment has been moved to tomorrow.</Text>
        </View>
      </View>

      <View style={styles.notificationCard}>
        <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
          <MaterialCommunityIcons name="file-document-outline" size={20} color="#16A34A" />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>Medical Notes</Text>
          <Text style={styles.notificationDesc}>New prescription and diagnostic report available.</Text>
        </View>
      </View>

      <Text style={styles.dateSectionTitle}>Yesterday</Text>
      <View style={styles.notificationCard}>
        <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
          <Ionicons name="refresh" size={20} color="#9333EA" />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>Medical History Update</Text>
          <Text style={styles.notificationDesc}>Your profile records were successfully updated.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function MessagesScreen({ messageText, setMessageText }) {
  return (
    <View style={styles.screenContainerFlex}>
      <ScrollView style={styles.chatScroll}>
        <View style={styles.chatTimestamp}>
          <Text style={styles.chatTimestampText}>Today 9:41 AM</Text>
        </View>

        <View style={styles.incomingBubble}>
          <Text style={styles.incomingText}>Hello! How can I help you with your health query today?</Text>
        </View>

        <View style={styles.outgoingBubble}>
          <Text style={styles.outgoingText}>Hi Dr. Turner, I have a mild rash on my arm for 2 days.</Text>
        </View>

        <View style={styles.incomingBubble}>
          <Text style={styles.incomingText}>I see. Could you upload a clear photo or describe if it's itchy?</Text>
        </View>
      </ScrollView>

      <View style={styles.chatInputContainer}>
        <Ionicons name="add-circle-outline" size={24} color="#64748B" style={{ marginRight: 10 }} />
        <TextInput 
          style={styles.chatInput}
          placeholder="Type a message..."
          placeholderTextColor="#94A3B8"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DoctorProfileScreen({ onNavigateToSchedule }) {
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.doctorHeaderCard}>
        <View style={styles.doctorAvatarPlaceholder}>
          <Ionicons name="person" size={40} color="#2563EB" />
        </View>
        <Text style={styles.doctorName}>Dr. Olivia Turner</Text>
        <Text style={styles.doctorSpecialty}>Cardiologist & General Specialist</Text>
        
        <View style={styles.doctorStatsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2,500+</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10 yrs</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Working Hours</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Monday - Friday: 09:00 AM - 05:00 PM</Text>
        <Text style={styles.infoText}>Saturday: 09:00 AM - 01:00 PM</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onNavigateToSchedule}>
        <Text style={styles.primaryButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ScheduleScreen({ selectedDate, setSelectedDate, onBookComplete }) {
  const dates = [
    { day: 'Mon', date: '23' },
    { day: 'Tue', date: '24' },
    { day: 'Wed', date: '25' },
    { day: 'Thu', date: '26' },
    { day: 'Fri', date: '27' },
  ];

  const times = ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'];

  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Select Date</Text>
      <View style={styles.datePickerRow}>
        {dates.map((item) => (
          <TouchableOpacity 
            key={item.date} 
            style={[styles.dateBox, selectedDate === item.date && styles.selectedDateBox]}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text style={[styles.dateBoxDay, selectedDate === item.date && styles.selectedDateText]}>{item.day}</Text>
            <Text style={[styles.dateBoxNum, selectedDate === item.date && styles.selectedDateText]}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      <View style={styles.timeGrid}>
        {times.map((time, index) => (
          <View key={index} style={styles.timeBadge}>
            <Text style={styles.timeBadgeText}>{time}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Patient Information</Text>
      <TextInput style={styles.inputField} placeholder="Full Name" placeholderTextColor="#94A3B8" />
      <TextInput style={styles.inputField} placeholder="Reason for Visit" placeholderTextColor="#94A3B8" />

      <TouchableOpacity style={styles.primaryButton} onPress={onBookComplete}>
        <Text style={styles.primaryButtonText}>Confirm Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DetailsScreen() {
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.detailsCard}>
        <View style={styles.detailsHeaderRow}>
          <View style={styles.smallAvatar}>
            <Ionicons name="person" size={20} color="#2563EB" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.detailsDoctorName}>Dr. Olivia Turner</Text>
            <Text style={styles.detailsSpecialty}>Cardiologist</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Confirmed</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date & Time:</Text>
          <Text style={styles.detailValue}>Nov 24, 2026 - 10:30 AM</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>City General Hospital, Room 302</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Patient:</Text>
          <Text style={styles.detailValue}>Alex Johnson</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.outlineButton}>
        <Text style={styles.outlineButtonText}>Cancel Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  screenContainerFlex: {
    flex: 1,
  },
  dateSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginVertical: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  notificationDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  bottomTab: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  chatScroll: {
    flex: 1,
    padding: 16,
  },
  chatTimestamp: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chatTimestampText: {
    fontSize: 10,
    color: '#94A3B8',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  incomingBubble: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderTopLeftRadius: 2,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginBottom: 12,
  },
  incomingText: {
    fontSize: 13,
    color: '#1E293B',
  },
  outgoingBubble: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 12,
    borderTopRightRadius: 2,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginBottom: 12,
  },
  outgoingText: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  chatInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 13,
    color: '#1E293B',
  },
  sendButton: {
    backgroundColor: '#2563EB',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  doctorHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  doctorStatsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 10,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 6,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedDateBox: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  dateBoxDay: {
    fontSize: 11,
    color: '#64748B',
  },
  dateBoxNum: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  timeBadge: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeBadgeText: {
    fontSize: 13,
    color: '#334155',
  },
  inputField: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 14,
    marginBottom: 12,
    color: '#1E293B',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  detailsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsDoctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  detailsSpecialty: {
    fontSize: 12,
    color: '#64748B',
  },
  statusBadge: {
    marginLeft: 'auto',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16A34A',
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
  },
});