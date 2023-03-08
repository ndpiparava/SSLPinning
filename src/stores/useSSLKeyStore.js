import {create} from 'zustand';
import {persist,createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const initialSSlState = {
//   sslKey: 'F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=',
// };

export const useSSLKeyStore = create(
  persist(
    set => ({
       sslKey: 'F5yEJFlAhYki30l8i+NwYAdXTKE1+x/n9J41HHorqys=',
      setSSLKey: sslKey => set({sslKey}),
    }),
    {
      name: 'sslKeyStore',
      storage: createJSONStorage(() => AsyncStorage)
    },
  ),
);
