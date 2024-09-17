import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';

// Importar as telas
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import HomeScreen from './screens/Home.js';
import NotificacoesScreen from './screens/NotificacoesScreen.js';
import PerfilScreen from './screens/PerfilScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação por abas (MainTabNavigator)
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Notificações') {
            iconName = 'notifications';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#023E8A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#ffffff',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true, tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Notificações"
        component={NotificacoesScreen}
        options={{ headerShown: true, tabBarLabel: 'Notificações' }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ headerShown: true, tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

// Função principal do App
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false); // Parar o loading após verificar o estado do usuário
    });

    return unsubscribe;
  }, []);

  // Exibir indicador de carregamento enquanto verifica autenticação
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={user ? 'Main' : 'Login'}>
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
