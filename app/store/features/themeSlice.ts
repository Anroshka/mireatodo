import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeType = 'light' | 'dark';

interface ThemeState {
  theme: ThemeType;
}

// Вспомогательная функция для проверки доступности localStorage
const isLocalStorageAvailable = () => {
  return typeof window !== 'undefined' && window.localStorage !== undefined;
};

// Функция для получения темы из localStorage или установки светлой темы по умолчанию
const getInitialTheme = (): ThemeType => {
  if (isLocalStorageAvailable()) {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    
    // Проверяем системные настройки пользователя
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

const initialState: ThemeState = {
  theme: 'light', // Значение по умолчанию, будет перезаписано в useEffect на клиенте
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
      if (isLocalStorageAvailable()) {
        localStorage.setItem('theme', action.payload);
        
        // Добавляем или удаляем класс 'dark' из элемента <html>
        if (action.payload === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    initializeTheme: (state) => {
      const theme = getInitialTheme();
      state.theme = theme;
      
      if (isLocalStorageAvailable()) {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      
      if (isLocalStorageAvailable()) {
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
  },
});

export const { setTheme, initializeTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer; 