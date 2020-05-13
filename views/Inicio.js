import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { List, Headline, Button, FAB, Searchbar } from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation,route}) => {

    const [clientes, setClientes] = useState([]);
    const [clientesRender, setClientesRender] = useState([])

    const [actualizarClientes, setActualizarClientes] = useState(true);

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            if (actualizarClientes) {
                try {
                    const res = await axios.get('http://192.168.1.39:3000/clientes');
                    setClientes(res.data);
                    setClientesRender(res.data);
                    setActualizarClientes(false);
                } catch (err) {
                    console.error(err)
                }
            }
        }
        obtenerClienteAPI();
    }, [actualizarClientes]);

    useEffect(()=>{
        if(searchInput.length > 0){
            setClientesRender(
                clientes.filter(cliente=>cliente.nombre.includes(searchInput))
            );
        }else{
            setClientesRender(clientes);
        }
    }, [searchInput]);


    return (
        <>
            <View style={globalStyles.contenedor}>
                <Headline style={globalStyles.titulo}>
                    {clientes.length > 0 ? 'Clientes' : 'Aun no hay clientes'}
                </Headline>
                {clientes.length > 1
                    ? 
                        <Searchbar
                            placeholder="Nombre Cliente"
                            value={searchInput}
                            onChangeText={text=>setSearchInput(text)}
                        />
                    : <Text></Text>
                }
                <FlatList
                    data={clientesRender}
                    keyExtractor={cliente => (cliente.id).toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.nombre}
                            description={item.nombreEmpresa}
                            onPress={()=>navigation.navigate('detallesClienteScreen',{item, setActualizarClientes})}
                        />
                    )}
                />
                <FAB
                    icon='plus'
                    style={globalStyles.fab}
                    onPress={()=>navigation.navigate('nuevoClienteScreen', {setActualizarClientes})}
                />
            </View>
        </>
    );
}


export default Inicio;