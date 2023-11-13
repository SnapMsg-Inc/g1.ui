import { Text, View } from 'react-native';
import InterestButton from '../buttons/buttonSelect';
import stylesSetup from '../../styles/forms/setup';

function Preferences({list, setList}) {
    
    return (
        <View style={stylesSetup.bodyInterests}>
            <Text style={stylesSetup.textTitle}>
                {"What do you want to see?"}
            </Text>
            <View style={stylesSetup.buttonsContainer}>
                <InterestButton title="Sports" list={list} setList={setList}/>
                <InterestButton title="Gaming" list={list} setList={setList}/>
                <InterestButton title="Travel" list={list} setList={setList}/>
                <InterestButton title="Technology" list={list} setList={setList}/>
                <InterestButton title="Entertainment" list={list} setList={setList}/>
                <InterestButton title="Music" list={list} setList={setList}/>
                <InterestButton title="Fitness" list={list} setList={setList}/>
                <InterestButton title="Arts & culture" list={list} setList={setList}/>
                <InterestButton title="Outdoors" list={list} setList={setList}/>
                <InterestButton title="Bussines & finance" list={list} setList={setList}/>
            </View>
        </View>
    );
};

export default Preferences;
