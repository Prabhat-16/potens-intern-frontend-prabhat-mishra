import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'Civic Resolve',
      tagline: 'Official Civic Reporting Portal',
      categories: {
        title: 'Select Issue Category',
        infrastructure: 'Infrastructure & Roads',
        sanitation: 'Sanitation & Waste',
        water: 'Water Supply',
        electricity: 'Electricity & Streetlights',
        transport: 'Public Transport',
        other: 'Other Services'
      },
      details: {
        title: 'Issue Details',
        location: 'Location Address',
        locationPlaceholder: 'Enter exact location or landmark',
        description: 'Issue Description',
        descriptionPlaceholder: 'Provide specific details about the problem...',
        voiceInput: 'Tap to speak',
        listening: 'Listening...',
        upload: 'Attach Photo (Optional)',
        submit: 'Submit Report',
        back: 'Back'
      },
      confirmation: {
        title: 'Report Submitted',
        successMessage: 'Your issue has been successfully registered.',
        referenceId: 'Reference ID',
        trackStatus: 'Track Status',
        copy: 'Copy',
        copied: 'Copied',
        justNow: 'Just now',
        timeline: {
          submitted: 'Report Submitted',
          inReview: 'Under Review',
          assigned: 'Assigned to Official',
          resolved: 'Resolved'
        },
        homeBtn: 'Report Another Issue'
      },
      errors: {
        unsupportedSpeech: 'Speech recognition is not supported in your browser.'
      }
    }
  },
  hi: {
    translation: {
      appName: 'नागरिक समाधान',
      tagline: 'आधिकारिक नागरिक रिपोर्टिंग पोर्टल',
      categories: {
        title: 'समस्या की श्रेणी चुनें',
        infrastructure: 'बुनियादी ढांचा और सड़कें',
        sanitation: 'स्वच्छता और कचरा',
        water: 'जल आपूर्ति',
        electricity: 'बिजली और स्ट्रीटलाइट',
        transport: 'सार्वजनिक परिवहन',
        other: 'अन्य सेवाएं'
      },
      details: {
        title: 'समस्या का विवरण',
        location: 'स्थान का पता',
        locationPlaceholder: 'सटीक स्थान या लैंडमार्क दर्ज करें',
        description: 'समस्या का विवरण',
        descriptionPlaceholder: 'समस्या के बारे में विशिष्ट विवरण प्रदान करें...',
        voiceInput: 'बोलने के लिए टैप करें',
        listening: 'सुन रहा है...',
        upload: 'फोटो संलग्न करें (वैकल्पिक)',
        submit: 'रिपोर्ट जमा करें',
        back: 'वापस'
      },
      confirmation: {
        title: 'रिपोर्ट जमा की गई',
        successMessage: 'आपकी समस्या सफलतापूर्वक पंजीकृत कर ली गई है।',
        referenceId: 'संदर्भ आईडी',
        trackStatus: 'स्थिति ट्रैक करें',
        copy: 'कॉपी करें',
        copied: 'कॉपी किया गया',
        justNow: 'अभी-अभी',
        timeline: {
          submitted: 'रिपोर्ट जमा की गई',
          inReview: 'समीक्षा के तहत',
          assigned: 'अधिकारी को सौंपा गया',
          resolved: 'समाधान किया गया'
        },
        homeBtn: 'अन्य समस्या रिपोर्ट करें'
      },
      errors: {
        unsupportedSpeech: 'आपके ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है।'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
