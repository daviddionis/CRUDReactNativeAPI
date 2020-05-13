import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';

import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

    const [editando, setEditando] = useState(false);

    const [datos, setDatos] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        nombreEmpresa: ''
    });

    useEffect(()=>{
        if(route.params.cliente){
            setEditando(true);
            setDatos(route.params.cliente);
        }
    },[])

    const [alerta, setAlerta] = useState(false);

    const saveCliente = async ()=>{

        if(datos.nombre.trim()==='' || datos.telefono.trim()==='' || datos.correo.trim()==='' || datos.nombreEmpresa.trim()===''){
            setAlerta(true);
            return;
        }
        else{
            try{
                if(editando)await axios.put(`http://192.168.1.39:3000/clientes/${route.params.cliente.id}`, datos);
                else await axios.post('http://192.168.1.39:3000/clientes', datos);
                setDatos({
                    nombre: '',
                    telefono: '',
                    correo: '',
                    nombreEmpresa: ''
                });
                navigation.navigate('inicioScreen');
                route.params.setActualizarClientes(true);
            }catch(err){
                Alert.alert('Error', 'Error con el cliente: '+err);
                return;
            }
        }
    }

    return ( 
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{editando ? 'Editar Cliente' : 'Añadir Nuevo Cliente'}</Headline>

            <TextInput
                label='Nombre'
                placeholder='Ingresa el nombre'
                onChangeText={text=>setDatos({
                    ...datos,
                    nombre: text
                })}
                style={styles.input}
                value={datos.nombre}
            />
            <TextInput
                label='Teléfono'
                placeholder='Ingresa el teléfono'
                onChangeText={text=>setDatos({
                    ...datos,
                    telefono: text
                })}
                style={styles.input}
                value={datos.telefono}
                keyboardType="numeric"
            />
            <TextInput
                label='Correo electrónico'
                placeholder='Ingresa el correo'
                onChangeText={text=>setDatos({
                    ...datos,
                    correo: text
                })}
                style={styles.input}
                value={datos.correo}
                keyboardType="email-address"
            />
            <TextInput
                label='Nombre Empresa'
                placeholder='Ingresa el nombre de la empresa'
                onChangeText={text=>setDatos({
                    ...datos,
                    nombreEmpresa: text
                })}
                value={datos.nombreEmpresa}
                style={styles.input}
            />
            <Button icon="pencil-circle" mode="contained" onPress={()=>saveCliente()}>
                {editando ? 'Editar Cliente' : 'Crear Cliente'} 
            </Button>

            <Portal>
                <Dialog 
                    visible={alerta}
                    onDismiss={()=>setAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>    
                        <Button onPress={()=>setAlerta(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
     );
}

const styles=StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

 
export default NuevoCliente;