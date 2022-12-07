import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Context from './store/Context';
import UserContext from './store/UserContext'

import Login from './components/Login';
import Listagem from './components/Listagem';
import Proposta from './components/Propostas';

const Stack = createNativeStackNavigator();

export default function App() {

  const store = { ...UserContext() }

  return (
    <Context.Provider value={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'App Gestão Automotiva',
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Lista"
            component={Listagem}
            options={{
              title: 'Listagem de Veículos (' + store.usuarioNome + ")",
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Propostas"
            component={Proposta}
            options={{
              title: 'Propostas do Veículo (' + store.usuarioNome + ")",
              headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
