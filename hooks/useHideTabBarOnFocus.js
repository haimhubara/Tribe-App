import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export function useHideTabBarOnFocus() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const parentNav = navigation.getParent();
      if (parentNav) {
        parentNav.setOptions({ tabBarStyle: { display: 'none' } });
      }

      return () => {
        if (parentNav) {
          parentNav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: '#fff' } });
        }
      };
    }, [navigation])
  );
}
