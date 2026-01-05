import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [name, setName] = useState("Atsu");
  const [pronouns, setPronouns] = useState("he/him");
  const [role, setRole] = useState("Engineer");
  const palettes = [
    ["#e74c3c", "#c0392b"],
    ["#8e44ad", "#6a1b9a"],
    ["#f39c12", "#d35400"],
    ["#2ecc71", "#27ae60"],
    ["#3498db", "#2980b9"],
  ];
  const [paletteIndex, setPaletteIndex] = useState(0);

  useEffect(() => {
    // Configure screen orientation or other initial setup here if needed
  }, []);

  const reset = () => {
    setName("Atsu");
    setPronouns("he/him");
    setRole("Engineer");
    setPaletteIndex(0);
  };

  const randomize = () => {
    const names = ["Atsu", "Mika", "Jordan", "Rin", "Sam"];
    const prs = ["she/her", "he/him", "they/them"];
    const roles = ["Designer", "Engineer", "Student", "Artist"];
    setName(names[Math.floor(Math.random() * names.length)]);
    setPronouns(prs[Math.floor(Math.random() * prs.length)]);
    setRole(roles[Math.floor(Math.random() * roles.length)]);
    setPaletteIndex(Math.floor(Math.random() * palettes.length));
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#1c2833", "#2c3e50", "#34495e"]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeAreaInner}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, width: "100%" }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.holeContainer}>
                <View style={styles.holeOuterRing}>
                  <View style={styles.holeInner} />
                </View>
              </View>

              <View style={styles.badgeShadowWrapper}>
                <View style={styles.badgeContainer}>
                  <LinearGradient
                    colors={palettes[paletteIndex]}
                    style={styles.badgeGradient}
                  >
                    <View style={styles.headerContainer}>
                      <Text style={styles.welcomeText}>HELLO</Text>
                      <Text style={styles.subtitleText}>MY NAME IS</Text>
                    </View>

                    <View style={styles.nameBoxShadowWrapper}>
                      <View style={styles.nameBox}>
                        <View style={styles.nameRow}>
                          <Text style={styles.nameText}>{name}</Text>
                          <Ionicons
                            name="person-circle-outline"
                            size={34}
                            color="#555"
                            style={styles.iconStyle}
                          />
                        </View>

                        <View style={styles.detailsRow}>
                          <MaterialCommunityIcons
                            name="account"
                            size={18}
                            color="#7f8c8d"
                          />
                          <Text style={styles.pronounText}>
                            ({pronouns}) | {role}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.decorativeLineBase}>
                      <View style={styles.decorativeLineTop} />
                    </View>
                  </LinearGradient>
                </View>
              </View>

              {/* Control panel */}
              <View style={styles.controlsContainer}>
                <Text style={styles.controlLabel}>Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="#999"
                />

                <Text style={styles.controlLabel}>Pronouns</Text>
                <TextInput
                  value={pronouns}
                  onChangeText={setPronouns}
                  style={styles.input}
                  placeholder="e.g. she/her"
                  placeholderTextColor="#999"
                />

                <Text style={styles.controlLabel}>Role / Title</Text>
                <TextInput
                  value={role}
                  onChangeText={setRole}
                  style={styles.input}
                  placeholder="e.g. Engineer"
                  placeholderTextColor="#999"
                />

                <Text style={[styles.controlLabel, { marginTop: 12 }]}>
                  Palette
                </Text>
                <View style={styles.paletteRow}>
                  {palettes.map((p, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => setPaletteIndex(i)}
                      style={[
                        styles.paletteSwatch,
                        paletteIndex === i && styles.paletteSelected,
                      ]}
                      accessibilityLabel={`palette-${i}`}
                    >
                      <LinearGradient
                        colors={p}
                        style={styles.paletteGradient}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.btn} onPress={randomize}>
                    <Text style={styles.btnText}>Randomize</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, styles.btnGhost]}
                    onPress={reset}
                  >
                    <Text style={[styles.btnText, styles.btnGhostText]}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
        <StatusBar style="light" />
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  holeContainer: {
    position: "absolute",
    top: 10,
    zIndex: 10,
    alignItems: "center",
  },
  holeOuterRing: {
    width: 60,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  holeInner: {
    width: 46,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1c2833",
  },
  badgeShadowWrapper: {
    width: "85%",
    height: 360,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
    backgroundColor: "transparent",
    marginTop: 18,
  },
  badgeContainer: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#ecf0f1",
    overflow: "hidden",
  },
  badgeGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 6,
  },
  welcomeText: {
    fontSize: 44,
    textTransform: "uppercase",
    fontWeight: "900",
    color: "white",
    letterSpacing: 4,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    includeFontPadding: false,
    lineHeight: 48,
  },
  subtitleText: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "700",
    color: "rgba(255,255,255,0.95)",
    marginTop: 4,
    letterSpacing: 2,
  },
  nameBoxShadowWrapper: {
    width: "98%",
    height: "56%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderRadius: 14,
    alignSelf: "center",
  },
  nameBox: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    paddingVertical: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  nameText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#2c3e50",
    letterSpacing: 1,
    includeFontPadding: false,
  },
  iconStyle: {
    marginLeft: 12,
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pronounText: {
    fontSize: 15,
    color: "#7f8c8d",
    marginLeft: 8,
    fontWeight: "600",
  },
  decorativeLineBase: {
    marginTop: 10,
    width: "35%",
    height: 4,
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 2,
    overflow: "hidden",
  },
  decorativeLineTop: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: 2,
    transform: [{ translateX: -2 }],
  },
  controlsContainer: {
    width: "92%",
    marginTop: 18,
    backgroundColor: "transparent",
  },
  controlLabel: {
    color: "#ecf0f1",
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 6,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 10,
  },
  paletteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  paletteSwatch: {
    width: 46,
    height: 30,
    borderRadius: 6,
    marginRight: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  paletteGradient: { flex: 1 },
  paletteSelected: {
    borderColor: "rgba(255,255,255,0.9)",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  btn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },
  btnGhost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    marginRight: 0,
    marginLeft: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  btnGhostText: {
    color: "#ecf0f1",
  },
});
