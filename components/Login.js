import { useState, useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

import Context from '../store/Context';

import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export default function Login({ navigation }) {
  const { setUsuarioId, setUsuarioNome } = useContext(Context);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const Logo = require('../assets/logo.png');

  const verificaLogin = async () => {
    const url = `${baseUrl}/usuarios?email=${email}&senha=${senha}`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        if (response.data.length == 1) {
          // console.log(response.data);
          setUsuarioId(response.data[0].id);
          setUsuarioNome(response.data[0].nome);
          //          navigation.navigate('Lista');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Lista' }],
          });
        } else {
          alert('Erro... Login ou senha inválida');
        }
      } else {
        throw new Error('Falha ao obter lista de pacientes');
      }
    } catch (error) {
      alert('Operação cancelada...');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />

      <Text style={styles.subtitulo}>Gestão Automotiva - Avenida Veículos</Text>
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          placeholderTextColor="#000"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />
      <TouchableOpacity style={styles.loginBtn} onPress={verificaLogin}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 380,
    height: 160,
    marginHorizontal: 15,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  subtitulo: {
    marginBottom: 40,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#000',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
    textTransform: 'UpperCase',
  },
  textInput: {
    height: 50,
    padding: 10,
    marginLeft: 20,
    backgroundColor: '#A9A9A9',
    borderRadius: 30,
    width: '70%',
    marginBottom: 20,
    alignItems: 'center',
  },
});
