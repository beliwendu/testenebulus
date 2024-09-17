import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase.js';  
import Icon from 'react-native-vector-icons/FontAwesome'; // Biblioteca de ícones

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Salvar dados adicionais no Firestore
        db.collection('clientes').doc(user.uid).set({
          nome: name,
          email: email,
          dispositivos: []
        });

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>nebulus</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#FF6A00" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#FF6A00" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#FF6A00" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF6A00',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
    opacity: 0.5,

  },
  button: {
    backgroundColor: '#023E8A',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#023E8A',
    marginTop: 20,
  },
});

export default RegisterScreen;
