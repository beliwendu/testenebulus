import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ícones de material design
import { auth, db } from '../firebase.js'; // Certifique-se que está configurado corretamente

const HomeScreen = () => {
  const navigation = useNavigation();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(''); // Adicione o estado para armazenar o nome do usuário

  // Certifica-se de que o usuário está autenticado
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    if (!currentUser) {
      console.log('Usuário não autenticado');
      return;
    }

    const uid = currentUser.uid;
    const clientRef = doc(getFirestore(), 'clientes', uid);

    // Obtém os dispositivos e o nome do Firestore em tempo real
    const unsubscribe = onSnapshot(clientRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setDevices(data.dispositivos || []); // Garante que 'dispositivos' exista
        setUserName(data.nome || 'Usuário'); // Obtém o nome do documento no Firestore
      } else {
        console.log('Documento não encontrado!');
      }
      setLoading(false);
    }, (error) => {
      console.error('Erro ao carregar dados do Firestore:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const renderDevice = ({ item }) => (
    <View style={styles.deviceCard}>
      <View style={styles.deviceInfo}>
        <Icon name="wifi" size={24} color="#fff" style={styles.deviceIcon} />
        <View>
          <Text style={styles.deviceName}>{item.nome}</Text>
          <Text style={styles.deviceStatus}>{item.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deviceOptions}>
        <Icon name="more-vert" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Casa de {userName}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddDeviceScreen')}
        >
          <Icon name="add" size={24} color="#023E8A" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={devices}
        renderItem={renderDevice}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.deviceList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#023E8A',
  },
  loadingText: {
    color: '#023E8A',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  deviceList: {
    paddingBottom: 80,
  },
  deviceCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    marginRight: 15,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deviceStatus: {
    fontSize: 14,
    color: '#FF6A00',
  },
  deviceOptions: {
    padding: 5,
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
