import english from './locales/en.json';
import bangla from './locales/bn.json';

const langString = (key: string) => {
    const lang = localStorage.getItem('language');
    if (lang === 'bn') {
        const words = JSON.parse(JSON.stringify(bangla));
        if (words[key]) {
            return words[key];
        }
    }
    const words = JSON.parse(JSON.stringify(english));
    if (words[key]) {
        return words[key];
    }
    return key;
};

export default langString;
