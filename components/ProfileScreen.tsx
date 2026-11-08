import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

interface ProfileScreenProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Форма өрістері
  const [fullName, setFullName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('+123 567 89000');
  const [email, setEmail] = useState('johndoe@example.com');
  const [dob, setDob] = useState('DD / MM / YYYY');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Жоғарғы тақырып */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => isEditing ? setIsEditing(false) : null}>
            <Text style={styles.backArrow}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Profile' : 'My Profile'}
          </Text>
          <View style={{ width: 24 }} /> 
        </View>

        {/* Профиль суреті (Мұнда суретті өзіңізге қарай ауыстыра аласыз) */}
        <View style={styles.profileImageContainer}>
          <Image 
            // Жергілікті сурет үшін: source={require('../assets/your-image.png')}
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity 
            style={styles.editBadge} 
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editBadgeText}>✎</Text>
          </TouchableOpacity>
        </View>

        {!isEditing ? (
          /* --- СОЛ ЖАҚ БЕТ (My Profile - Меню тізімі) --- */
          <View>
            <Text style={styles.userName}>{fullName}</Text>

            <View style={styles.menuList}>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => setIsEditing(true)}>
                <View style={styles.menuLeft}>
                  <View style={styles.iconBox}>
                    <View style={styles.profileHeadDot} />
                    <View style={styles.profileBodyArc} />
                  </View>
                  <Text style={styles.menuText}>Profile</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.iconBox}>
                    <View style={styles.heartShape} />
                  </View>
                  <Text style={styles.menuText}>Favorite</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.iconBox}>
                    <View style={styles.walletCard} />
                  </View>
                  <Text style={styles.menuText}>Payment Method</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.iconBox}>
                    <View style={styles.lockBody} />
                  </View>
                  <Text style={styles.menuText}>Privacy Policy</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.iconBox}>
                    <View style={styles.gearCenter} />
                  </View>
                  <Text style={styles.menuText}>Settings</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={styles.iconBox}>
                    <Text style={styles.questionMark}>?</Text>
                  </View>
                  <Text style={styles.menuText}>Help</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { borderColor: '#ff4d4d' }]}>
                    <View style={styles.logoutArrowLine} />
                  </View>
                  <Text style={[styles.menuText, { color: '#ff4d4d' }]}>Logout</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>

            </View>
          </View>
        ) : (
          /* --- ОҢ ЖАҚ БЕТ (Edit Profile - Өңдеу формасы) --- */
          <View style={styles.formContainer}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput 
                style={styles.input} 
                value={fullName} 
                onChangeText={setFullName} 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput 
                style={styles.input} 
                value={phoneNumber} 
                onChangeText={setPhoneNumber} 
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date Of Birth</Text>
              <TextInput 
                style={styles.input} 
                value={dob} 
                onChangeText={setDob} 
              />
            </View>

            <TouchableOpacity 
              style={styles.updateButton} 
              onPress={() => {
                alert('Profile updated successfully!');
                setIsEditing(false);
              }}
            >
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>

          </View>
        )}

      </ScrollView>

      {/* Төменгі навигация панелі (Суреттегідей дұрыс пішіндермен) */}
      <View style={styles.bottomNav}>
        
        {/* 1. Басты бет (Үйшік пішіні) */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.homeRoof} />
          <View style={styles.homeBody} />
        </TouchableOpacity>

        {/* 2. Чат (Хабарлама көпіршігі) */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.chatBubble} />
        </TouchableOpacity>

        {/* 3. Профиль (Адам нобайы - белсенді) */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.userHead} />
          <View style={styles.userBody} />
        </TouchableOpacity>

        {/* 4. Күнтізбе (Календарь) */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.calendarTopBar} />
          <View style={styles.calendarBody} />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0055FF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0055FF',
  },
  profileImageContainer: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: '38%',
    backgroundColor: '#0055FF',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  menuList: {
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E2ECFF',
  },
  profileHeadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#0055FF',
    marginBottom: 2,
  },
  profileBodyArc: {
    width: 14,
    height: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#0055FF',
  },
  heartShape: {
    width: 12,
    height: 12,
    backgroundColor: '#0055FF',
    transform: [{ rotate: '45deg' }],
  },
  walletCard: {
    width: 16,
    height: 11,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#0055FF',
  },
  lockBody: {
    width: 10,
    height: 10,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#0055FF',
  },
  gearCenter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0055FF',
  },
  questionMark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0055FF',
  },
  logoutArrowLine: {
    width: 10,
    height: 2,
    backgroundColor: '#ff4d4d',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 16,
    color: '#C4C4C4',
  },
  formContainer: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#1852FF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Төменгі навигация панелінің стилі
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1852FF',
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 30,
  },
  // 1. Үйшік (Home) пішіні
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#A0C0FF',
    marginBottom: 1,
  },
  homeBody: {
    width: 14,
    height: 10,
    backgroundColor: '#A0C0FF',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  // 2. Чат (Chat) пішіні
  chatBubble: {
    width: 18,
    height: 14,
    backgroundColor: '#A0C0FF',
    borderRadius: 4,
  },
  // 3. Профиль (User) пішіні (Белсенді акцент - ақ түсті)
  userHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  userBody: {
    width: 16,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  // 4. Күнтізбе (Calendar) пішіні
  calendarTopBar: {
    width: 16,
    height: 3,
    backgroundColor: '#A0C0FF',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  calendarBody: {
    width: 16,
    height: 13,
    backgroundColor: '#A0C0FF',
    borderRadius: 2,
    marginTop: 1,
  },
});