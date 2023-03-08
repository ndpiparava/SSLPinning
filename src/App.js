//convert above compnent to functional comoonent

import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, NativeModules,SafeAreaView} from 'react-native';

import ShapeView from './ShapeView';
import Plist from 'react-native-plist';
import {useSSLKeyStore} from './stores/useSSLKeyStore';

import CodePush from 'react-native-code-push';

const CODE_PUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
  deploymentKey: 'JB_iy1a2yCGJDFrUDR4ke3Zo4VAzZUyHqcORE',
};

const App = () => {
  const [shape, setShape] = useState('logo');
  const [status, setStatus] = useState('');
  const key = useSSLKeyStore(state => state.sslKey);
  const setSSLKey = useSSLKeyStore (state => state.setSSLKey);

  useEffect(() => {
    CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_SUSPEND });
  }, []);

  const updatePlistSSLKey = () => {
    Plist.updatePlistWithDictionary('Info.plist', 'TSKConfiguration', {
      TSKPinnedDomains: {
        'jsonplaceholder.typicode.com': {
          TSKPublicKeyHashes: ['F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys='],
        },
      },
    }).then(path => {
      console.log('Plist updated', path);
    });
  };

  

  useEffect(() => {

    console.log('key ==', key);
    NativeModules.TrustKitInitialiser.InitialiseTrustKit([
      'F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=',
      'ZYyEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=',
    ]);
  }
    // if (key === 'F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=') {

    //   console.log("called to set wrong key")
    //    // set new ssl key in store
    //    setSSLKey('ZYyEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=' )
       

    // else {

    //   console.log("called to set right key")
    //   setSSLKey('F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=' )
    //   NativeModules.TrustKitInitialiser.InitialiseTrustKit([
    //     'S5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=',
    //     'ZYyEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=',
    //   ]);
    // }

    
    // updatePlistSSLKey();
  }, []);

  const checkConnection = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        setShape('hello');
        setStatus(text);
      })
      .catch(error => {
        console.log(`error: ${error}`);
        setShape('confused');
        setStatus(error.message);
      });
    /*
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
      pkPinning: true,
      sslPinning: {
        certs: [
          'sha256//F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=',
          'BBBBBBBBBBB
        ],
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        console.log('response', response);
        // console.log(`response: ${JSON.parse(response)}`);
        return response.text();
      })
      .catch(error => {
        console.log(`error: ${error}`);
        this.setState(previousState => {
          return {shape: 'confused', status: error.message};
        });
      });
      */

     
  };

  // render the app screen
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 24}}>Shapes</Text>
        <Text style={{fontSize: 12, marginLeft: 30, marginTop: 50, height: 60}}>{key}</Text>
       

      </View>
      <ShapeView style={styles.content} shape={shape} status={status} />
      <View style={styles.footer}>
        <View style={styles.buttonBar}>
          <Button onPress={checkConnection} title="Test Hello" />
        </View>
      </View>
    </View>
    
  );
};

export default CodePush(CODE_PUSH_OPTIONS)(App);

// flexbox styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    margin: 40,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 300,
  },
  content: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:200,
  },
  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
});

// end of file
