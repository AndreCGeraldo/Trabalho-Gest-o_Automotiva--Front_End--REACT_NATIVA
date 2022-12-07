import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

import ItemLista from './ItemListagem';

import Context from '../store/Context';

const baseUrl = 'http://localhost:3000';

const Listagem = ({ navigation }) => {
    const [veiculos, setVeiculos] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);

    const { usuarioId, usuarioNome } = useContext(Context);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const url = `${baseUrl}/veiculos`;
        const obtemVeiculos = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url, { cancelToken: source.token });
                if (response.status === 200) {
                    setVeiculos(response.data);
                    setIsLoading(false);
                    return;
                } else {
                    throw new Error('Falha ao obter lista de Veículos');
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Operação cancelada...');
                } else {
                    setErrorFlag(true);
                    setIsLoading(false);
                }
            }
        };
        obtemVeiculos();
        return () => source.cancel('Operação cancelada...');
    }, []);

    const usuarioLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View>
            <View>
                <Text style={styles.textUsuario}>
                    Usuário: {usuarioNome} ({usuarioId})&ensp;&ensp;
                    <TouchableOpacity style={styles.textUsuario} onPress={usuarioLogout}>
                        <Text style={styles.textUsuario}>Sair</Text>
                    </TouchableOpacity>
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.wrapperStyle}>
                    {!isLoading &&
                        !hasError &&
                        veiculos &&
                        veiculos.map((veiculo) => (
                            <ItemLista
                                id={veiculo.id}
                                modelo={veiculo.modelo}
                                marca={veiculo.marca}
                                ano={veiculo.ano}
                                preco={Number(veiculo.preco).toFixed(2)}
                                foto={veiculo.foto}
                                navigation={navigation}
                            />
                        ))}
                </View>
                <View style={styles.wrapperStyle}>
                    {isLoading && <Text> Aguarde... Carregando Dados </Text>}
                    {!isLoading && hasError && (
                        <Text> Ocorreu um erro. Tente novamente mais tarde. </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    },
    wrapperStyle: {
        minHeight: 128,
    },
    textUsuario: {
        backgroundColor: '#2E2E2E',
        textAlign: 'right',
        paddingRight: 10,
        color: '#fff',
    },
});

export default Listagem;
