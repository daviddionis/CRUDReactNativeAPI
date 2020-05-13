import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';

import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({ route, navigation }) => {

    const { nombre, telefono, correo, nombreEmpresa, id } = route.params.item;
    const { setActualizarClientes } = route.params;

    console.log(route)

    const confirmarEliminar = () => {
        Alert.alert(
            '¿Desea eliminar el cliente?',
            'Recuerda que no hay manera posible de recuperar el registro.',
            [
                { text: 'Eliminar', onPress: () => eliminarContacto() },
                { text: 'Cancelar', style: 'cancel' }
            ]
        );
    }

    const eliminarContacto = async () => {
        try {
            await axios.delete(`http://192.168.1.39:3000/clientes/${id}`);
            setActualizarClientes(true);
            navigation.navigate('inicioScreen');
        } catch (err) {
            Alert.alert('Error', 'Error con el cliente: '+err);
            return;
        }
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{nombreEmpresa}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
            <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading></Text>

            <Button mode="contained" icon="cancel" style={styles.boton}
                onPress={() => confirmarEliminar()}
            >
                Eliminar Cliente
            </Button>
            <FAB
                icon="pencil"
                style={globalStyles.fab}
                onPress={()=>navigation.navigate('nuevoClienteScreen', { cliente: route.params.item, setActualizarClientes})}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 16
    },
    boton: {
        marginTop: 50,
        backgroundColor: 'red'
    }
})

export default DetallesCliente;