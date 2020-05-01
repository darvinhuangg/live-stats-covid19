import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en.json';
import id from './id.json';
import * as moment from 'moment';
import { _retrieveData } from '@components/asyncStorage';

var idLocale = require('moment/locale/id'); 
var enLocale = require('moment/locale/en-gb');

i18n.fallbacks = true;
i18n.translations = { en, id };
i18n.locale = Localization.locale.substring(0,2); //Substring en-US/en-GB/id-ID to en/en/id
_retrieveData('locale').then(value => {if(value !== null){ i18n.locale = value; if(value === "id"){moment.updateLocale('id', idLocale);} } else { i18n.locale = 'en'; moment.updateLocale('en', enLocale) }});

// console.log(i18n.locale);

export default i18n;