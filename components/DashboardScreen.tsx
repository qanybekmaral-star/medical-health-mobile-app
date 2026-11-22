import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface DoctorComment {
  id: string;
  author: string;
  rating: string;
  text: string;
  date: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: string;
  reviews: number;
  avatar: string;
  appointmentTime: string;
  experience: string;
  bio: string;
  note: string;
  comments: DoctorComment[];
}

interface DashboardScreenProps {
  userName?: string;
  onLogout?: () => void;
  onOpenChat?: () => void;
  onOpenProfile?: () => void;
}

const DAYS = [
  { dayNum: "9", label: "MON", full: "Monday", activeStyle: "light" as const },
  { dayNum: "10", label: "TUE", full: "Tuesday", activeStyle: "light" as const },
  { dayNum: "11", label: "WED", full: "Wednesday", activeStyle: "blue" as const },
  { dayNum: "12", label: "THU", full: "Thursday", activeStyle: "light" as const },
  { dayNum: "13", label: "FRI", full: "Friday", activeStyle: "blue" as const },
  { dayNum: "14", label: "SAT", full: "Saturday", activeStyle: "blue" as const },
];

const CURATED_AVATARS = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",
];

export const FALLBACK_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Olivia Turner, M.D.",
    specialty: "Dermato-Endocrinology",
    rating: "5",
    reviews: 60,
    avatar: CURATED_AVATARS[0],
    appointmentTime: "10 AM",
    experience: "9 жыл тәжірибе",
    bio: "Терінің гормоналдық және фотодерматоздық мәселелерін диагностикалау мен емдеуге маманданған дәрігер.",
    note: "Treatment and prevention of skin and photodermatitis.",
    comments: [
      {
        id: "c1",
        author: "Айдана С.",
        rating: "5.0",
        text: "Өте мұқият қарайды, емдеу жоспарын түсінікті етіп түсіндірді.",
        date: "2 күн бұрын",
      },
      {
        id: "c2",
        author: "Мирас К.",
        rating: "5.0",
        text: "Кеңес өте пайдалы болды, тері жағдайы бір аптада жақсарды.",
        date: "5 күн бұрын",
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Alexander Bennett, Ph.D.",
    specialty: "Dermato-Genetics",
    rating: "4,5",
    reviews: 40,
    avatar: CURATED_AVATARS[1],
    appointmentTime: "11 AM",
    experience: "11 жыл тәжірибе",
    bio: "Тұқым қуалайтын тері ерекшеліктері мен жеке күтім бағдарламаларын құрастыру бойынша сарапшы.",
    note: "Genetic skin consultation and personalized care plan.",
    comments: [
      {
        id: "c3",
        author: "Әсел Т.",
        rating: "4.5",
        text: "Нақты талдауларға сүйеніп, артық дәрісіз күтім жоспарын берді.",
        date: "3 күн бұрын",
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Sophia Martinez, Ph.D.",
    specialty: "Cosmetic Bioengineering",
    rating: "5",
    reviews: 150,
    avatar: CURATED_AVATARS[2],
    appointmentTime: "9 AM",
    experience: "8 жыл тәжірибе",
    bio: "Терінің қорғаныс қабатын қалпына келтіру және заманауи биоинженерлік терапия бағытында жұмыс істейді.",
    note: "Advanced dermatological recovery and skin barrier check.",
    comments: [
      {
        id: "c4",
        author: "Данияр Б.",
        rating: "5.0",
        text: "Керемет маман, қабылдау уақыты дәл сақталады.",
        date: "1 күн бұрын",
      },
      {
        id: "c5",
        author: "Жансая Н.",
        rating: "5.0",
        text: "Сезімтал теріге арналған күтім бірден нәтиже берді.",
        date: "1 апта бұрын",
      },
    ],
  },
  {
    id: "4",
    name: "Dr. Michael Davidson, M.D.",
    specialty: "Nano-Dermatology",
    rating: "4,8",
    reviews: 90,
    avatar: CURATED_AVATARS[3],
    appointmentTime: "12 AM",
    experience: "12 жыл тәжірибе",
    bio: "Нысаналы дерматологиялық терапия және қабынуға қарсы заманауи әдістер бойынша дәрігер.",
    note: "Targeted therapy follow-up and diagnostic review.",
    comments: [
      {
        id: "c6",
        author: "Ержан М.",
        rating: "4.8",
        text: "Тәжірибесі мол, сұрақтардың бәріне нақты жауап береді.",
        date: "4 күн бұрын",
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Daniel Brooks, M.D.",
    specialty: "Clinical Trichology",
    rating: "4,9",
    reviews: 75,
    avatar: CURATED_AVATARS[4],
    appointmentTime: "10 AM",
    experience: "10 жыл тәжірибе",
    bio: "Шаш түсуі, бас терісінің себореясы және трихоскопиялық диагностика бойынша маман.",
    note: "Scalp diagnostics and hair restoration therapy.",
    comments: [
      {
        id: "c7",
        author: "Мадина Ә.",
        rating: "5.0",
        text: "Трихоскопия жасап, нақты себебін тауып берді. Өте ризамын!",
        date: "2 күн бұрын",
      },
    ],
  },
  {
    id: "6",
    name: "Dr. Chloe Anderson, Ph.D.",
    specialty: "Pediatric Dermatology",
    rating: "5",
    reviews: 112,
    avatar: CURATED_AVATARS[5],
    appointmentTime: "11 AM",
    experience: "7 жыл тәжірибе",
    bio: "Балалар мен жасөспірімдердің терісін күту, атопиялық дерматит және бөртпелерді емдеу мамандығы.",
    note: "Gentle pediatric skin care and allergy management.",
    comments: [
      {
        id: "c8",
        author: "Нұрсұлтан Қ.",
        rating: "5.0",
        text: "Баламен өте жақсы тіл табысады, ешқандай қорқыныш қалмады.",
        date: "3 күн бұрын",
      },
    ],
  },
  {
    id: "7",
    name: "Dr. Lucas Foster, M.D.",
    specialty: "Immunodermatology",
    rating: "4,7",
    reviews: 54,
    avatar: CURATED_AVATARS[6],
    appointmentTime: "12 AM",
    experience: "13 жыл тәжірибе",
    bio: "Созылмалы және аутоиммундық тері жағдайларын кешенді бақылау және емдеу бойынша дәрігер.",
    note: "Chronic skin immune response evaluation and care.",
    comments: [
      {
        id: "c9",
        author: "Динара С.",
        rating: "4.7",
        text: "Барлық сұраққа сабырмен жауап беріп, нақты кеңестер айтты.",
        date: "6 күн бұрын",
      },
    ],
  },
];

const SPECIALTIES = [
  "Dermato-Endocrinology",
  "Dermato-Genetics",
  "Cosmetic Bioengineering",
  "Nano-Dermatology",
  "Clinical Trichology",
  "Pediatric Dermatology",
  "Immunodermatology",
];

export default function DashboardScreen({
  userName = "John Doe",
  onLogout,
  onOpenChat,
  onOpenProfile,
}: DashboardScreenProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(2);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [doctors, setDoctors] = useState<Doctor[]>(FALLBACK_DOCTORS);
  const [loadingApi, setLoadingApi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"home" | "chat" | "profile" | "calendar">("home");
  const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean | null>(null);

  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState<Doctor | null>(null);
  const [commentsDoctorId, setCommentsDoctorId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const fetchDoctorsFromApi = async () => {
    setLoadingApi(true);
    try {
      const response = await fetch("https://randomuser.me/api/?results=7&nat=us");
      if (!response.ok) throw new Error("API response error");
      const data = await response.json();

      if (Array.isArray(data?.results) && data.results.length > 0) {
        const mapped: Doctor[] = data.results.map((item: any, idx: number) => {
          const baseDoc = FALLBACK_DOCTORS[idx % FALLBACK_DOCTORS.length];
          return {
            ...baseDoc,
            id: item.login?.uuid || baseDoc.id,
            name: `Dr. ${item.name.first} ${item.name.last}, M.D.`,
            specialty: SPECIALTIES[idx % SPECIALTIES.length],
            avatar: CURATED_AVATARS[idx % CURATED_AVATARS.length],
            appointmentTime: `${9 + (idx % 4)} AM`,
          };
        });
        setDoctors(mapped);
      }
    } catch {
      setDoctors(FALLBACK_DOCTORS);
    } finally {
      setLoadingApi(false);
    }
  };

  useEffect(() => {
    fetchDoctorsFromApi();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = () => {
    if (!commentsDoctorId || !newCommentText.trim()) return;

    const created: DoctorComment = {
      id: String(Date.now()),
      author: userName || "Пайдаланушы",
      rating: "5.0",
      text: newCommentText.trim(),
      date: "Жаңа ғана",
    };

    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === commentsDoctorId
          ? {
              ...doc,
              reviews: doc.reviews + 1,
              comments: [created, ...doc.comments],
            }
          : doc
      )
    );
    setNewCommentText("");
  };

  const activeCommentsDoctor = useMemo(
    () => doctors.find((d) => d.id === commentsDoctorId) || null,
    [doctors, commentsDoctorId]
  );

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesFav = showOnlyFavorites ? Boolean(favorites[doc.id]) : true;
      return matchesSearch && matchesFav;
    });
  }, [doctors, searchQuery, showOnlyFavorites, favorites]);

  const currentDay = DAYS[selectedDayIndex];
  const featuredDoctor = doctors[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <View style={styles.userInfo}>
              <Image
  source={{
    uri: "https://png.pngtree.com/png-clipart/20210608/ourmid/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg",
  }}
  style={styles.userAvatar}
/>
              <View>
                <Text style={styles.welcomeText}>Hi, WelcomeBack</Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.circleIconBtn}
                onPress={() =>
                  Alert.alert(
                    "Хабарламалар",
                    `Бүгін ${featuredDoctor?.appointmentTime || "10 AM"}-де ${featuredDoctor?.name || "дәрігермен"} қабылдау бар.`
                  )
                }
              >
                <Ionicons name="notifications-outline" size={20} color="#1E293B" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circleIconBtn}
                onPress={() =>
                  Alert.alert("Баптаулар", "API дерегін жаңарту немесе шығу", [
                    { text: "API жаңарту", onPress: fetchDoctorsFromApi },
                    ...(onLogout ? [{ text: "Шығу", onPress: onLogout }] : []),
                    { text: "Жабу", style: "cancel" as const },
                  ])
                }
              >
                <Ionicons name="settings-outline" size={20} color="#1E293B" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.topToolsRow}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => setShowOnlyFavorites(false)}
            >
              <Ionicons
                name="medkit-outline"
                size={22}
                color={!showOnlyFavorites ? "#2563EB" : "#64748B"}
              />
              <Text
                style={[
                  styles.quickActionText,
                  !showOnlyFavorites && styles.quickActionActive,
                ]}
              >
                Doctors
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => setShowOnlyFavorites((prev) => !prev)}
            >
              <Ionicons
                name={showOnlyFavorites ? "heart" : "heart-outline"}
                size={22}
                color={showOnlyFavorites ? "#2563EB" : "#64748B"}
              />
              <Text
                style={[
                  styles.quickActionText,
                  showOnlyFavorites && styles.quickActionActive,
                ]}
              >
                Favorite
              </Text>
            </TouchableOpacity>

            <View style={styles.searchBox}>
              <Ionicons name="options-outline" size={18} color="#475569" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search doctor..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
              <Ionicons name="search" size={18} color="#475569" />
            </View>
          </View>

          <View style={styles.scheduleSection}>
            <View style={styles.daysRow}>
              {DAYS.map((item, idx) => {
                const isSelected = idx === selectedDayIndex;
                const isBlueCard = isSelected || item.activeStyle === "blue";
                return (
                  <TouchableOpacity
                    key={item.dayNum}
                    style={[
                      styles.dayPill,
                      isBlueCard ? styles.dayPillBlue : styles.dayPillWhite,
                      isSelected && styles.dayPillSelectedRing,
                    ]}
                    onPress={() => {
                      setSelectedDayIndex(idx);
                      setAppointmentConfirmed(null);
                    }}
                  >
                    <Text
                      style={[
                        styles.dayNum,
                        isBlueCard ? styles.dayTextWhite : styles.dayTextDark,
                      ]}
                    >
                      {item.dayNum}
                    </Text>
                    <Text
                      style={[
                        styles.dayLabel,
                        isBlueCard ? styles.dayTextWhite : styles.dayTextMuted,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.timelineCard}>
              <Text style={styles.timelineDateHeader}>
                {currentDay.dayNum} {currentDay.full} - Today
              </Text>

              {["9 AM", "10 AM", "11 AM", "12 AM"].map((slot) => (
                <View key={slot} style={styles.timeSlotRow}>
                  <Text style={styles.timeSlotLabel}>{slot}</Text>
                  <View style={styles.dashedLine} />
                </View>
              ))}

              {featuredDoctor && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setSelectedDoctorInfo(featuredDoctor)}
                  style={styles.appointmentFloatingCard}
                >
                  <View style={styles.appointmentTopRow}>
                    <Text style={styles.appointmentDoctorName}>
                      {featuredDoctor.name}
                    </Text>
                    <View style={styles.statusBtnsRow}>
                      <TouchableOpacity
                        style={styles.statusCheckBtn}
                        onPress={() => setAppointmentConfirmed(true)}
                      >
                        <Ionicons name="checkmark" size={13} color="#2563EB" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.statusCloseBtn}
                        onPress={() => setAppointmentConfirmed(false)}
                      >
                        <Ionicons name="close" size={13} color="#2563EB" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.appointmentNote} numberOfLines={2}>
                    {appointmentConfirmed === true
                      ? "Қабылдау расталды! Дәрігер күтіп отыр."
                      : appointmentConfirmed === false
                      ? "Қабылдау уақыты кейінге қалдырылды."
                      : featuredDoctor.note}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {loadingApi ? (
            <View style={styles.loaderBox}>
              <ActivityIndicator size="small" color="#2563EB" />
              <Text style={styles.loaderText}>API-ден дәрігерлер жүктелуде...</Text>
            </View>
          ) : filteredDoctors.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Сәйкес дәрігер табылмады.</Text>
            </View>
          ) : (
            filteredDoctors.map((doc) => {
              const isFav = Boolean(favorites[doc.id]);
              return (
                <TouchableOpacity
                  key={doc.id}
                  activeOpacity={0.88}
                  style={styles.doctorRowCard}
                  onPress={() => setSelectedDoctorInfo(doc)}
                >
                  <Image source={{ uri: doc.avatar }} style={styles.doctorAvatar} />

                  <View style={styles.doctorWhiteBox}>
                    <Text style={styles.doctorName} numberOfLines={1}>
                      {doc.name}
                    </Text>
                    <Text style={styles.doctorSpecialty} numberOfLines={1}>
                      {doc.specialty}
                    </Text>

                    <View style={styles.doctorBottomRow}>
                      <View style={styles.metaGroup}>
                        <View style={styles.badgePill}>
                          <Ionicons name="star" size={12} color="#2563EB" />
                          <Text style={styles.badgeText}>{doc.rating}</Text>
                        </View>

                        <TouchableOpacity
                          style={styles.badgePill}
                          onPress={(e) => {
                            e.stopPropagation();
                            setCommentsDoctorId(doc.id);
                          }}
                        >
                          <Ionicons name="chatbubble-ellipses" size={12} color="#2563EB" />
                          <Text style={styles.badgeText}>{doc.reviews}</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.rightMiniIcons}>
                        <TouchableOpacity
                          style={styles.miniWhiteCircle}
                          onPress={(e) => {
                            e.stopPropagation();
                            setSelectedDoctorInfo(doc);
                          }}
                        >
                          <Ionicons name="help" size={13} color="#2563EB" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.miniWhiteCircle}
                          onPress={(e) => {
                            e.stopPropagation();
                            toggleFavorite(doc.id);
                          }}
                        >
                          <Ionicons
                            name={isFav ? "heart" : "heart-outline"}
                            size={14}
                            color="#2563EB"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>

        <Modal
          visible={Boolean(selectedDoctorInfo)}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedDoctorInfo(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              {selectedDoctorInfo && (
                <>
                  <View style={styles.modalHeader}>
                    <Image
                      source={{ uri: selectedDoctorInfo.avatar }}
                      style={styles.modalAvatar}
                    />
                    <View style={styles.modalHeaderText}>
                      <Text style={styles.modalTitle}>{selectedDoctorInfo.name}</Text>
                      <Text style={styles.modalSubtitle}>
                        {selectedDoctorInfo.specialty}
                      </Text>
                      <Text style={styles.modalMeta}>
                        ★ {selectedDoctorInfo.rating} • {selectedDoctorInfo.experience}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setSelectedDoctorInfo(null)}
                      style={styles.closeModalBtn}
                    >
                      <Ionicons name="close" size={20} color="#0F172A" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.modalSectionTitle}>Дәрігер туралы ақпарат</Text>
                  <Text style={styles.modalBodyText}>{selectedDoctorInfo.bio}</Text>
                  <Text style={styles.modalTimeText}>
                    Қабылдау уақыты: {currentDay.dayNum} {currentDay.full},{" "}
                    {selectedDoctorInfo.appointmentTime}
                  </Text>

                  <View style={styles.modalButtonsRow}>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => {
                        const id = selectedDoctorInfo.id;
                        setSelectedDoctorInfo(null);
                        setCommentsDoctorId(id);
                      }}
                    >
                      <Text style={styles.secondaryBtnText}>
                        Комментарийлер ({selectedDoctorInfo.comments.length})
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.primaryBtn}
                      onPress={() => {
                        setAppointmentConfirmed(true);
                        const docName = selectedDoctorInfo.name;
                        setSelectedDoctorInfo(null);
                        Alert.alert(
                          "Жазылу сәтті өтті",
                          `${docName} қабылдауына ${currentDay.dayNum} ${currentDay.label} күніне жазылдыңыз.`
                        );
                      }}
                    >
                      <Text style={styles.primaryBtnText}>Қабылдауға жазылу</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

        <Modal
          visible={Boolean(activeCommentsDoctor)}
          transparent
          animationType="slide"
          onRequestClose={() => setCommentsDoctorId(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              {activeCommentsDoctor && (
                <>
                  <View style={styles.modalHeader}>
                    <View style={styles.modalHeaderText}>
                      <Text style={styles.modalTitle}>Комментарийлер</Text>
                      <Text style={styles.modalSubtitle}>
                        {activeCommentsDoctor.name} ({activeCommentsDoctor.comments.length})
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setCommentsDoctorId(null)}
                      style={styles.closeModalBtn}
                    >
                      <Ionicons name="close" size={20} color="#0F172A" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.addCommentRow}>
                    <TextInput
                      value={newCommentText}
                      onChangeText={setNewCommentText}
                      placeholder="Пікір қалдыру..."
                      placeholderTextColor="#94A3B8"
                      style={styles.commentInput}
                    />
                    <TouchableOpacity
                      style={styles.sendCommentBtn}
                      onPress={handleAddComment}
                    >
                      <Ionicons name="send" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
                    {activeCommentsDoctor.comments.length === 0 ? (
                      <Text style={styles.emptyCommentText}>
                        Әзірге комментарий жоқ. Алғашқы пікірді қалдырыңыз!
                      </Text>
                    ) : (
                      activeCommentsDoctor.comments.map((c) => (
                        <View key={c.id} style={styles.commentItemCard}>
                          <View style={styles.commentTopRow}>
                            <Text style={styles.commentAuthor}>{c.author}</Text>
                            <Text style={styles.commentDate}>
                              ★ {c.rating} • {c.date}
                            </Text>
                          </View>
                          <Text style={styles.commentBody}>{c.text}</Text>
                        </View>
                      ))
                    )}
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </Modal>

        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNavBar}>
            <TouchableOpacity onPress={() => setActiveTab("home")}>
              <Ionicons
                name={activeTab === "home" ? "home" : "home-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveTab("chat");
                if (onOpenChat) {
                  onOpenChat();
                } else if (doctors[0]) {
                  setCommentsDoctorId(doctors[0].id);
                }
              }}
            >
              <Ionicons
                name={activeTab === "chat" ? "chatbubbles" : "chatbubbles-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (onOpenProfile) {
                  onOpenProfile();
                } else {
                  setActiveTab("profile");
                  Alert.alert("Профиль", `Пайдаланушы: ${userName}`);
                }
              }}
            >
              <Ionicons
                name={activeTab === "profile" ? "person" : "person-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveTab("calendar");
                Alert.alert(
                  "Күнтізбе",
                  `Таңдалған күн: ${currentDay.dayNum} ${currentDay.full}`
                );
              }}
            >
              <Ionicons
                name={activeTab === "calendar" ? "calendar" : "calendar-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 105,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  welcomeText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  circleIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  topToolsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 12,
    marginBottom: 12,
  },
  quickAction: {
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  quickActionActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: 22,
    paddingHorizontal: 12,
    height: 38,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#0F172A",
    paddingVertical: 0,
  },
  scheduleSection: {
    backgroundColor: "#CBD5F5",
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dayPill: {
    width: 48,
    height: 64,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  dayPillWhite: {
    backgroundColor: "#F8FAFC",
  },
  dayPillBlue: {
    backgroundColor: "#2563EB",
  },
  dayPillSelectedRing: {
    borderWidth: 2,
    borderColor: "#1D4ED8",
  },
  dayNum: {
    fontSize: 17,
    fontWeight: "700",
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  dayTextWhite: {
    color: "#FFFFFF",
  },
  dayTextDark: {
    color: "#0F172A",
  },
  dayTextMuted: {
    color: "#475569",
  },
  timelineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    position: "relative",
  },
  timelineDateHeader: {
    textAlign: "right",
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
    marginBottom: 6,
  },
  timeSlotRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 26,
    gap: 8,
  },
  timeSlotLabel: {
    width: 42,
    fontSize: 11,
    color: "#3B82F6",
    fontWeight: "500",
  },
  dashedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#BFDBFE",
  },
  appointmentFloatingCard: {
    position: "absolute",
    left: 60,
    right: 12,
    top: 52,
    backgroundColor: "#C7D2FE",
    borderRadius: 14,
    padding: 10,
  },
  appointmentTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  appointmentDoctorName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E3A8A",
    flex: 1,
  },
  statusBtnsRow: {
    flexDirection: "row",
    gap: 6,
  },
  statusCheckBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  statusCloseBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  appointmentNote: {
    fontSize: 11,
    color: "#1E293B",
    lineHeight: 15,
  },
  doctorRowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C7D2FE",
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 10,
    gap: 10,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorWhiteBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
  doctorSpecialty: {
    fontSize: 12,
    color: "#334155",
    marginBottom: 6,
  },
  doctorBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaGroup: {
    flexDirection: "row",
    gap: 6,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    gap: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#2563EB",
  },
  rightMiniIcons: {
    flexDirection: "row",
    gap: 5,
  },
  miniWhiteCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderBox: {
    paddingVertical: 24,
    alignItems: "center",
    gap: 8,
  },
  loaderText: {
    fontSize: 12,
    color: "#475569",
  },
  emptyBox: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: "#64748B",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 18,
    maxHeight: "82%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  modalAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 2,
  },
  modalMeta: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  closeModalBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  modalBodyText: {
    fontSize: 13,
    color: "#334155",
    lineHeight: 19,
    marginBottom: 10,
  },
  modalTimeText: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
    marginBottom: 16,
  },
  modalButtonsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 12,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  addCommentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: "#0F172A",
  },
  sendCommentBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  commentsList: {
    maxHeight: 300,
  },
  emptyCommentText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    paddingVertical: 20,
  },
  commentItemCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  commentTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  commentDate: {
    fontSize: 11,
    color: "#64748B",
  },
  commentBody: {
    fontSize: 13,
    color: "#334155",
    lineHeight: 18,
  },
  bottomNavContainer: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 16,
  },
  bottomNavBar: {
    backgroundColor: "#2563EB",
    borderRadius: 28,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});