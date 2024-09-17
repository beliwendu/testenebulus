import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddDeviceScreen = ({ navigation }) => {
  const [deviceName, setDeviceName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Dispositivo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do dispositivo"
        value={deviceName}
        onChangeText={setDeviceName}
      />
      <Button title="Adicionar" onPress={() => alert(`Dispositivo ${deviceName} adicionado!`)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default AddDeviceScreen;
