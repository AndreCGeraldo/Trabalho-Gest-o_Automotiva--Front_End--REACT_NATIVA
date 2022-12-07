import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Platform } from 'react-native';
import Constants from 'expo-constants';

import ItemPropostas from './ItemPropostas';

const baseUrl = 'http://localhost:3000';

const Propostas = ({ route }) => {
    const { id, navigation } = route.params;

    const [propostas, setPropostas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const url = `${baseUrl}/propostas?veiculo_id=${id}&_sort=id&_order=desc`;
        const obtemPropostas = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url, { cancelToken: source.token });
                if (response.status === 200) {
                    setPropostas(response.data);
                    setIsLoading(false);
                    return;
                } else {
                    throw new Error('Falha ao obter lista de propostas');
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
        obtemPropostas();
        return () => source.cancel('Operação cancelada...');
    }, [id]);

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.wrapperStyle}>
                    {!isLoading &&
                        !hasError &&
                        propostas &&
                        propostas.map((props) => (
                            <ItemPropostas
                                id={props.id}
                                nome={props.nome}
                                email={props.email}
                                telefone={props.telefone}
                                proposta={Number(props.proposta).toFixed(2)}
                                data={props.data}
                                hora={props.hora}
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
});

export default Propostas;
