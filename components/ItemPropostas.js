import { View, Text, StyleSheet } from 'react-native';

const ItemPropostas = ({ id, nome, email, telefone, proposta, data, hora, navigation }) => {
    return (
        <View style={styles.itemLista}>
            <Text style={styles.textItem}>
                {`Nome: ${nome}`}
            </Text>
            <Text style={styles.textItem}>
                {`E-mail: ${email}`}
            </Text>
            <Text style={styles.textItem}>
                {`Telefone: ${telefone}`}
            </Text>
            <Text style={styles.textItem}>
                {`Preço: ${proposta}`}
            </Text>
            <Text style={styles.textItem}>
                {`Data: ${data} - Hora: ${hora}`}
            </Text>
            <Text>_______________________________________________</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    itemLista: {
        flex: 1,
        margin: 10,
    },
    textItem: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
});


export default ItemPropostas;