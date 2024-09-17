import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Importando Firestore

const PerfilScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation(); // Navegação para redirecionar após logout
  const [nome, setNome] = useState(auth.currentUser.displayName || '');

  // Função para salvar o nome atualizado
  const handleSave = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const firestore = getFirestore();

    try {
      // Atualiza o nome no Firebase Authentication
      await updateProfile(user, {
        displayName: nome,
      });

      // Atualiza o nome no Firestore
      const userDocRef = doc(firestore, 'clientes', uid);
      await updateDoc(userDocRef, {
        nome: nome,
      });

      alert('Nome atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar o nome: ' + error.message);
    }
  };

  // Função para logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login'); // Redireciona para a tela de login
      })
      .catch((error) => {
        alert('Erro ao sair: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ALTERE SEU NOME</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>SALVAR</Text>
      </TouchableOpacity>

      <Text style={styles.supportText}>
        Está com problemas no aplicativo? <Text style={styles.link}>Mande um email</Text>
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023E8A',
    marginBottom: 10,
  },
  input: {
    borderColor: '#FF6A00',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#FF6A00',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#023E8A',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  supportText: {
    color: '#023E8A',
    marginTop: 20,
  },
  link: {
    color: '#FF6A00',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoutText: {
    color: '#023E8A',
    fontSize: 16,
  },
});

export default PerfilScreen;
