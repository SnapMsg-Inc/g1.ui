import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Logo from './logo';
import CancelButton from './buttons/buttonCancel';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Aquí puedes agregar lógica para manejar el inicio de sesión
    // Por ejemplo, puedes enviar las credenciales al servidor para autenticar al usuario
    // Si el inicio de sesión es exitoso, puedes navegar a otra pantalla
  };

  return (
    <>
        <CancelButton navigation={navigation}/>
        <Logo/>
        <View>
            <Text>Inicio de Sesión</Text>
            <TextInput
                placeholder="Correo electrónico"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Button title="Iniciar sesión" onPress={handleSignIn} />
        </View>
    </>
  );
};

export default SignIn;
