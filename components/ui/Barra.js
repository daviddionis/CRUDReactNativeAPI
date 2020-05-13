import React from 'react';
import {Button} from 'react-native-paper';

const Barra = ({navigation}) => {
    return ( 
        <>
            <Button icon="plus-circle" color='white' onPress={()=>navigation.navigate('nuevoClienteScreen')}>
                Cliente
            </Button>
        </>
     );
}
 
export default Barra;