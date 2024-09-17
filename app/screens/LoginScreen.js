import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase.js'; 
import Icon from 'react-native-vector-icons/FontAwesome'; // Biblioteca de ícones

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

  const handleLogin = () => {
    if (email === '' || password === '') {
      setErrorMessage('Preencha todos os campos.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setErrorMessage(''); // Limpa mensagem de erro após sucesso
        const user = userCredential.user;
        Alert.alert('Sucesso', 'Login bem-sucedido!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        setErrorMessage('E-mail ou senha incorretos.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>nebulus</Text>

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
          secureTextEntry={!showPassword}
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon 
            name={showPassword ? "eye-slash" : "eye"} 
            size={20} 
            color="#FF6A00" 
            style={styles.iconToggle} 
          />
        </TouchableOpacity>
      </View>

      {/* Mensagem de erro */}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>
          Ainda não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
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
  iconToggle: {
    marginRight: 10,
    opacity: 0.5,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
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
  registerText: {
    color: '#A9A9A9',
  },
  registerLink: {
    color: '#FF6A00',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
