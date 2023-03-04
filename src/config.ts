import { PaletteMode } from '@mui/material';

const config: {
    basename: string;
    defaultPath: string;
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    theme: PaletteMode;
    presetColor: string;
    i18n: string;
    rtlLayout: boolean;
    jwt: {
        secret: string;
        timeout: string;
    };
    backendServer: string;
    backendServerApi: string;
} = {
    basename: '',
    defaultPath: '/',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    jwt: {
        secret: 'SECRET-KEY',
        timeout: '1 days'
    },
    backendServer: 'http://ri-cop.dev.mpower-social.com:3024/',
    backendServerApi: 'http://ri-cop.dev.mpower-social.com:3024/api/v1/'
};

export default config;
