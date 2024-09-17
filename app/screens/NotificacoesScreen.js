import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificacoesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.notification}>O dispositivo apresenta falha, entre em contato com o suporte.</Text>
      <Text style={styles.notification}>Novo detector cadastrado com sucesso!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  notification: {
    backgroundColor: '#FFF',
    borderColor: '#023E8A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    color: '#023E8A',
    fontSize: 16,
  },
});

export default NotificacoesScreen;
