import { Pressable, View, Image, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

const ItemListagem = ({ id, modelo, marca, ano, preco, foto, navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [proposta, setProposta] = useState('');

    const baseUrl = 'http://localhost:3000';

    const salvarProposta = () => {
        if (nome && email && telefone && proposta) {
            alert('Preencha todos os campos...');
            return;
        }
        setModalVisible(true);
    };

    const confirmarProposta = async () => {
        if (!nome | !email | !telefone | !proposta) {
            alert('Informe todos os campos para confirmar sua Proposta.');
            return;
        }

        const data = new Date().toLocaleDateString();
        const hora = new Date().toLocaleTimeString();

        // consulta para verificar se a pessoa já ofertou
        try {
            const response = await axios.get(`${baseUrl}/propostas?email=${email}`);
            if (response.status === 200) {
                if (response.data.length == 1) {
                    alert('Apenas 1 Proposta por pessoa...');
                    return;
                }
            } else {
                throw new Error('Falha ao consultar base de dados');
            }
        } catch (error) {
            throw new Error('Erro de rede');
        }

        // realiza a inclusão da oferta
        try {
            const response = await axios.post(`${baseUrl}/propostas`, {
                veiculo_id: id,
                nome,
                email,
                telefone,
                proposta,
                data,
                hora
            });
            if (response.status === 201) {
                alert(`Proposta salva com código: ${JSON.stringify(response.data.id)}`);
                setModalVisible(false);
            } else {
                throw new Error('Erro...');
            }
        } catch (error) {
            alert('Erro...');
        }
    };

    return (
        <>
            <View>
                <View style={styles.itemListagem}>
                    <Image
                        source={{ uri: foto }}
                        style={{ width: 220, height: 120, borderRadius: 10, marginTop: 15 }}
                    />
                    <Text style={styles.textItem}>
                        {`Modelo: ${modelo}\nMarca: ${marca}\nAno: ${ano}\nPreço: ${preco}`}
                    </Text>
                    <View style={styles.botoesLista}>
                        <Pressable style={styles.btnLista}
                            onPress={() => navigation.navigate('Propostas', { id, navigation })}>
                            <Text style={styles.textButton}>Ver Propostas</Text>
                        </Pressable>&ensp;
                        <Pressable style={styles.btnLista} onPress={salvarProposta}>
                            <Text style={styles.textButton}>Oferecer Proposta</Text>
                        </Pressable>
                    </View>
                </View>
                <Text>_______________________________________________________________________________________________________</Text>
            </View>

            <View style={styles.container}>
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nome"
                                    placeholderTextColor="#000"
                                    onChangeText={(text) => setNome(text)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="E-mail de confirmação"
                                    placeholderTextColor="#000"
                                    onChangeText={(text) => setEmail(text.toLowerCase())}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Telefone"
                                    placeholderTextColor="#000"
                                    onChangeText={(text) => setTelefone(text.toLowerCase())}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Preço R$"
                                    placeholderTextColor="#000"
                                    onChangeText={(text) => setProposta(text.toLowerCase())}
                                />
                            </View>

                            <View style={styles.botoesLista}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={confirmarProposta}>
                                    <Text style={styles.textStyle}>Confirmar</Text>
                                </Pressable>
                                &ensp;&ensp;
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};

export default ItemListagem;

const styles = StyleSheet.create({
    itemListagem: {
        flex: 1,
        flexDirection: 'row',
    },
    textItem: {
        textAlign: 'center',
        color: '#000',
        marginTop: 15,
        fontWeight: 'bold',
        paddingEnd: 5,
        marginLeft: 20
    },
    botoesLista: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft: 1
    },
    btnLista: {
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    textButton: {
        color: '#fff',
    },
    container: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    opcoes: {
        flexDirection: 'row',
        marginTop: 12,
    },
    logo: {
        width: 200,
        height: 120,
        borderRadius: 2,
    },
    textoPergunta: {
        textAlign: 'center',
        fontSize: 20,
        color: 'blue',
        marginVertical: 10,
    },
    textoOpcoes: {
        fontSize: 20,
        color: 'blue',
        marginEnd: 12,
    },
    botoes: {
        marginTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 4,
        padding: 8,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#000',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
        color: 'blue',
    },
    inputView: {
        backgroundColor: '#BDBDBD',
        borderRadius: 8,
        width: '100%',
        height: 40,
        marginBottom: 20,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        flex: 1,
        outlineStyle: 'none',
    },

});
