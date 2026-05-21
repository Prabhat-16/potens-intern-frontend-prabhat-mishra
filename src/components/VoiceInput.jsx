import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const VoiceInput = ({ onResult }) => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        setRecognition(rec);
      }
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.lang = i18n.language === 'en' ? 'en-IN' : 'hi-IN';
    }
  }, [i18n.language, recognition]);

  const toggleListening = useCallback((e) => {
    e.preventDefault();
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  }, [isListening, recognition]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        onResult(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [recognition, onResult]);

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
        isListening 
          ? 'bg-red-50 text-red-600 border-red-200' 
          : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800'
      }`}
    >
      {isListening ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <MicOff className="w-4 h-4" />
          </motion.div>
          <span>{t('details.listening')}</span>
        </>
      ) : (
        <>
          <Mic className="w-4 h-4" />
          <span>{t('details.voiceInput')}</span>
        </>
      )}
    </button>
  );
};

export default VoiceInput;
