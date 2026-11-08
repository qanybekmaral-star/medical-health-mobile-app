import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: string;
  reviews: string;
  image: string;
  birthYear: string;
  education: string;
  experience: string;
  bio: string;
  isFavorite: boolean;
}

// onNavigateToChat және onNavigateToProfile міндетті түрде көрсетілген
interface HomeScreen2Props {
  onNavigateToProfile: () => void;
  onNavigateToChat: () => void;
}

export default function HomeScreen2({ onNavigateToProfile, onNavigateToChat }: HomeScreen2Props) {
  const [activeTab, setActiveTab] = useState<'doctors' | 'favorite'>('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2);

  const daysData = [
    { day: '9', weekDay: 'MON', schedule: { time: '09:00 AM', doctor: 'Dr. Emily Watson, M.D.', desc: 'Жүрек-қан тамырларын тексеру және консультация.' } },
    { day: '10', weekDay: 'TUE', schedule: { time: '11:30 AM', doctor: 'Dr. Alexander Bennett', desc: 'Генетикалық дерматология бойынша қабылдау.' } },
    { day: '11', weekDay: 'WED', schedule: { time: '10:00 AM', doctor: 'Dr. Olivia Turner, M.D.', desc: 'Treatment and prevention of skin and photodermatitis.' } },
    { day: '12', weekDay: 'THU', schedule: { time: '02:00 PM', doctor: 'Dr. Sophia Martinez, Ph.D.', desc: 'Косметология және биоинженерия бойынша кеңес.' } },
    { day: '13', weekDay: 'FRI', schedule: { time: '03:15 PM', doctor: 'Dr. Michael Davidson, M.D.', desc: 'Нано-дерматология процедуралары.' } },
    { day: '14', weekDay: 'SAT', schedule: { time: '10:30 AM', doctor: 'Dr. Jessica Taylor, M.D.', desc: 'Педиатриялық қарау және вакцинация.' } },
  ];

  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Olivia Turner, M.D.',
      specialty: 'Dermato-Endocrinology',
      rating: '5.0',
      reviews: '60',
      image: 'https://img.magnific.com/premium-photo/female-doctor-holding-tablet-studio_1326139-1901.jpg?semt=ais_hybrid&w=740&q=80',
      birthYear: '1985',
      education: 'Harvard Medical School, Ph.D.',
      experience: '12 жыл тәжірибе',
      bio: 'Тері аурулары мен эндокринологиялық патологияларды емдеу бойынша жоғары санатты маман.',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Dr. Alexander Bennett',
      specialty: 'Dermato-Genetics',
      rating: '4.5',
      reviews: '40',
      image: 'https://thumbs.dreamstime.com/b/%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D0%B4%D0%BE%D0%BA%D1%82%D0%BE%D1%80-16088825.jpg',
      birthYear: '1990',
      education: 'Stanford University School of Medicine',
      experience: '8 жыл тәжірибе',
      bio: 'Генетикалық дерматология және тері ауруларының тұқым қуалаушылық факторларын зерттейді.',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Dr. Sophia Martinez, Ph.D.',
      specialty: 'Cosmetic Bioengineering',
      rating: '5.0',
      reviews: '150',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYkuPw84PNCNtbzpWIZG75RPEO33NrJxygiQ2wnyrnUCPVCsGdbNUAU0&s=10',
      birthYear: '1982',
      education: 'Johns Hopkins University',
      experience: '14 жыл тәжірибе',
      bio: 'Косметология және биоинженерия саласындағы халықаралық сарапшы.',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Dr. Michael Davidson, M.D.',
      specialty: 'Nano-Dermatology',
      rating: '4.8',
      reviews: '90',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500',
      birthYear: '1988',
      education: 'University of Oxford',
      experience: '10 жыл тәжірибе',
      bio: 'Нано-технологияларды теріні қалпына келтіру әдістерінде қолданады.',
      isFavorite: true,
    },
    {
      id: '5',
      name: 'Dr. Emily Watson, M.D.',
      specialty: 'Cardiologist',
      rating: '4.9',
      reviews: '110',
      image: 'https://img.magnific.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?semt=ais_hybrid&w=740&q=80',
      birthYear: '1983',
      education: 'Cambridge University',
      experience: '15 жыл тәжірибе',
      bio: 'Жүрек-қан тамырлары жүйесі ауруларын диагностикалау және емдеу.',
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Dr. William Clark, Ph.D.',
      specialty: 'Neurologist',
      rating: '4.7',
      reviews: '75',
      image: 'https://img.magnific.com/free-photo/doctor-holding-clipboard-looking-camera_23-2148285743.jpg?semt=ais_hybrid&w=740&q=80',
      birthYear: '1979',
      education: 'Yale School of Medicine',
      experience: '16 жыл тәжірибе',
      bio: 'Нерв жүйесі аурулары мен ми қызметінің бұзылуларын зерттейді.',
      isFavorite: false,
    },
    {
      id: '7',
      name: 'Dr. Jessica Taylor, M.D.',
      specialty: 'Pediatrician',
      rating: '5.0',
      reviews: '130',
      image: 'https://img.magnific.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?semt=ais_hybrid&w=740&q=80',
      birthYear: '1992',
      education: 'Columbia University',
      experience: '7 жыл тәжірибе',
      bio: 'Балалар денсаулығы, педиатрия және иммунология бағытында жұмыс істейді.',
      isFavorite: true,
    },
    {
      id: '8',
      name: 'Dr. Robert Johnson, M.D.',
      specialty: 'Orthopedic Surgeon',
      rating: '4.6',
      reviews: '85',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSTW_fM8ndU2ikM_dgwMZs_M4_IjWFVOnR-Yk3zyRLZF3BbTG6WdGa__oe&s=10',
      birthYear: '1980',
      education: 'University of Pennsylvania',
      experience: '13 жыл тәжірибе',
      bio: 'Тірек-қимыл аппараты және буын оталарын жасауға маманданған.',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: string, event: any) => {
    event.stopPropagation();
    setDoctors(doctors.map(doc => doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc));
  };

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'favorite') {
      return matchesSearch && doc.isFavorite;
    }
    return matchesSearch;
  });

  const currentSchedule = daysData[selectedDayIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Жоғарғы бөлік */}
        <View style={styles.topHeader}>
          <View style={styles.userInfo}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' }} style={styles.avatar} />
            <View>
              <Text style={styles.welcomeText}>Hi, WelcomeBack</Text>
              <Text style={styles.userName}>John Doe</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}><View style={styles.bellIconShape} /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><View style={styles.gearIconShape} /></TouchableOpacity>
          </View>
        </View>

        {/* Санаттар */}
        <View style={styles.categories}>
          <TouchableOpacity 
            style={[styles.categoryItem, activeTab === 'doctors' && styles.categoryItemActive]} 
            onPress={() => setActiveTab('doctors')}
          >
            <View style={styles.doctorIconMini}><View style={styles.docDotMini} /><View style={styles.docArcMini} /></View>
            <Text style={activeTab === 'doctors' ? styles.catTextActive : styles.catText}>Doctors</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryItem, activeTab === 'favorite' && styles.categoryItemActive]} 
            onPress={() => setActiveTab('favorite')}
          >
            <View style={styles.heartIconMini} />
            <Text style={activeTab === 'favorite' ? styles.catTextActive : styles.catText}>Favorite</Text>
          </TouchableOpacity>
        </View>

        {/* Іздеу жолағы */}
        <View style={styles.searchBar}>
          <View style={styles.filterBtn}><View style={styles.filterLines} /></View>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search doctor, condition..."
            placeholderTextColor="#AAA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.searchMagnifier} />
        </View>

        {/* Күндер тізбегі */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {daysData.map((item, index) => {
            const isSelected = index === selectedDayIndex;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.dateCard, isSelected && styles.dateCardActive]}
                onPress={() => setSelectedDayIndex(index)}
              >
                <Text style={[styles.dateText, isSelected && styles.dateTextActive]}>
                  {item.day}{'\n'}{item.weekDay}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Уақыт кестесі */}
        <View style={styles.scheduleCard}>
          <Text style={styles.scheduleDateTitle}>{currentSchedule.day} {currentSchedule.weekDay} - Schedule</Text>
          <View style={styles.scheduleRow}>
            <Text style={styles.timeText}>{currentSchedule.schedule.time}</Text>
            <View style={styles.appointmentBox}>
              <Text style={styles.aptTitle}>{currentSchedule.schedule.doctor}</Text>
              <Text style={styles.aptDesc}>{currentSchedule.schedule.desc}</Text>
            </View>
          </View>
        </View>

        {/* Дәрігерлер тізімі */}
        <View style={styles.doctorList}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <TouchableOpacity 
                key={doc.id} 
                style={styles.doctorCard}
                onPress={() => setSelectedDoctor(doc)}
              >
                <Image source={{ uri: doc.image }} style={styles.docImage} />
                <View style={styles.docInfo}>
                  <Text style={styles.docName}>{doc.name}</Text>
                  <Text style={styles.docSpec}>{doc.specialty}</Text>
                  <View style={styles.docStats}>
                    <Text style={styles.statText}>⭐ {doc.rating}</Text>
                    <Text style={styles.statText}>💬 {doc.reviews}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={(e) => toggleFavorite(doc.id, e)} style={styles.favBtn}>
                  <Text style={{ fontSize: 18 }}>{doc.isFavorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultText}>Дәрігер табылмады</Text>
          )}
        </View>

      </ScrollView>

      {/* Дәрігер туралы ақпарат модальды терезесі */}
      <Modal visible={selectedDoctor !== null} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedDoctor && (
              <>
                <Image source={{ uri: selectedDoctor.image }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedDoctor.name}</Text>
                <Text style={styles.modalSpec}>{selectedDoctor.specialty}</Text>
                
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalLabel}>Туған жылы:</Text>
                  <Text style={styles.modalValue}>{selectedDoctor.birthYear}</Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalLabel}>Тәжірибесі:</Text>
                  <Text style={styles.modalValue}>{selectedDoctor.experience}</Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalLabel}>Білімі:</Text>
                  <Text style={styles.modalValue}>{selectedDoctor.education}</Text>
                </View>

                <Text style={styles.modalBioTitle}>Маман туралы:</Text>
                <Text style={styles.modalBio}>{selectedDoctor.bio}</Text>

                <TouchableOpacity 
                  style={styles.closeModalBtn} 
                  onPress={() => setSelectedDoctor(null)}
                >
                  <Text style={styles.closeModalText}>Жабу</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Төменгі навигация панелі */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.homeRoof} /><View style={styles.homeBody} />
        </TouchableOpacity>
        
        {/* Чат батырмасы */}
        <TouchableOpacity style={styles.navItem} onPress={onNavigateToChat}>
          <View style={styles.chatBubble} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onNavigateToProfile}>
          <View style={styles.userHead} /><View style={styles.userBody} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.calendarTopBar} /><View style={styles.calendarBody} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  welcomeText: { fontSize: 12, color: '#888' },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 10, backgroundColor: '#fff', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5EEFF' },
  bellIconShape: { width: 14, height: 16, backgroundColor: '#0055FF', borderRadius: 2 },
  gearIconShape: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#0055FF' },
  categories: { flexDirection: 'row', marginBottom: 20 },
  categoryItemActive: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 15, borderWidth: 1, borderColor: '#C4D8FF' },
  categoryItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 15, borderWidth: 1, borderColor: '#E5EEFF' },
  doctorIconMini: { width: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  docDotMini: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#0055FF', marginBottom: 1 },
  docArcMini: { width: 10, height: 4, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#0055FF' },
  heartIconMini: { width: 12, height: 12, backgroundColor: '#0055FF', transform: [{ rotate: '45deg' }], marginRight: 8 },
  catTextActive: { fontWeight: 'bold', color: '#0055FF' },
  catText: { fontWeight: '600', color: '#555' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 20, borderWidth: 1, borderColor: '#E5EEFF' },
  filterBtn: { marginRight: 12, backgroundColor: '#F0F4FF', padding: 8, borderRadius: 15 },
  filterLines: { width: 12, height: 10, backgroundColor: '#0055FF', borderRadius: 2 },
  searchInput: { flex: 1, color: '#000', fontSize: 14, paddingVertical: 0 },
  searchMagnifier: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#0055FF' },
  dateScroll: { marginBottom: 20 },
  dateCard: { width: 55, height: 75, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 25, marginRight: 12, borderWidth: 1, borderColor: '#E5EEFF' },
  dateCardActive: { backgroundColor: '#1852FF' },
  dateText: { textAlign: 'center', fontSize: 13, color: '#555', fontWeight: '600' },
  dateTextActive: { color: '#fff' },
  scheduleCard: { backgroundColor: '#EBF2FF', borderRadius: 20, padding: 16, marginBottom: 20 },
  scheduleDateTitle: { textAlign: 'right', fontSize: 12, color: '#0055FF', marginBottom: 10, fontWeight: '600' },
  scheduleRow: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 13, color: '#0055FF', fontWeight: 'bold', width: 65 },
  appointmentBox: { flex: 1, backgroundColor: '#D6E4FF', borderRadius: 14, padding: 12 },
  aptTitle: { fontWeight: 'bold', color: '#0033CC', fontSize: 14, marginBottom: 4 },
  aptDesc: { fontSize: 12, color: '#335588' },
  doctorList: { marginBottom: 10 },
  doctorCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#E5EEFF', alignItems: 'center' },
  docImage: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  docInfo: { flex: 1 },
  docName: { fontWeight: 'bold', fontSize: 15, color: '#000', marginBottom: 2 },
  docSpec: { fontSize: 13, color: '#666', marginBottom: 6 },
  docStats: { flexDirection: 'row' },
  statText: { fontSize: 12, color: '#0055FF', marginRight: 15, fontWeight: '600' },
  favBtn: { padding: 8 },
  noResultText: { textAlign: 'center', color: '#888', marginTop: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 24, padding: 20, alignItems: 'center' },
  modalImage: { width: 90, height: 90, borderRadius: 45, marginBottom: 15 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 4, textAlign: 'center' },
  modalSpec: { fontSize: 14, color: '#0055FF', fontWeight: '600', marginBottom: 15 },
  modalDetailRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  modalLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
  modalValue: { fontSize: 14, color: '#000', fontWeight: 'bold' },
  modalBioTitle: { alignSelf: 'flex-start', fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 5 },
  modalBio: { fontSize: 13, color: '#555', lineHeight: 18, textAlign: 'left', marginBottom: 20 },
  closeModalBtn: { backgroundColor: '#1852FF', borderRadius: 20, paddingVertical: 12, width: '100%', alignItems: 'center' },
  closeModalText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#1852FF', paddingVertical: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24, position: 'absolute', bottom: 0, left: 0, right: 0 },
  navItem: { alignItems: 'center', justifyContent: 'center', width: 40, height: 30 },
  homeRoof: { width: 0, height: 0, borderLeftWidth: 10, borderLeftColor: 'transparent', borderRightWidth: 10, borderRightColor: 'transparent', borderBottomWidth: 8, borderBottomColor: '#fff', marginBottom: 1 },
  homeBody: { width: 14, height: 10, backgroundColor: '#fff', borderBottomLeftRadius: 2, borderBottomRightRadius: 2 },
  chatBubble: { width: 18, height: 14, backgroundColor: '#A0C0FF', borderRadius: 4 },
  userHead: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A0C0FF', marginBottom: 2 },
  userBody: { width: 16, height: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#A0C0FF' },
  calendarTopBar: { width: 16, height: 3, backgroundColor: '#A0C0FF', borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  calendarBody: { width: 16, height: 13, backgroundColor: '#A0C0FF', borderRadius: 2, marginTop: 1 },
});