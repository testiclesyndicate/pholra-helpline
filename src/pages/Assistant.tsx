import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Send,
  Trash2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  AlertTriangle,
  PhoneCall,
  Sparkles,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { d } from '../utils/i18n';
import { api } from '../utils/api';
import { ChatMessage, ChatReplyPart, OfficialContact } from '../types';

const STORAGE_KEY = 'kisanai.chat';

export const Assistant: React.FC = () => {
  const { lang, pushToast, addRecentQuery } = useApp();
  const [searchParams] = useSearchParams();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [autoSpeak, setAutoSpeak] = useState(() => {
    try {
      return localStorage.getItem('kisanai.autoSpeak') === '1';
    } catch {
      return false;
    }
  });

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryHandledRef = useRef<string | null>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Persist messages in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Fetch suggested questions for empty state
  useEffect(() => {
    api.get<{ questions: string[] }>(`/meta?lang=${lang}`)
      .then(res => setSuggestedQuestions(res.questions || []))
      .catch(() => {});
  }, [lang]);

  // Text to Speech
  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      pushToast({ kind: 'warning', title: d(lang, 'toast.ttsUnsupported') });
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*#_`]/g, '').trim();
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      ml: 'ml-IN',
    };
    utterance.lang = langMap[lang] || 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, [lang, pushToast]);

  const toggleAutoSpeak = () => {
    const next = !autoSpeak;
    setAutoSpeak(next);
    try {
      localStorage.setItem('kisanai.autoSpeak', next ? '1' : '0');
    } catch {
      // ignore
    }
    if (next) {
      if ('speechSynthesis' in window) {
        pushToast({ kind: 'info', title: d(lang, 'assistant.voiceRepliesHint') });
      } else {
        pushToast({ kind: 'warning', title: d(lang, 'toast.ttsUnsupported') });
      }
    } else {
      window.speechSynthesis?.cancel();
    }
  };

  // Web Speech Recognition
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      pushToast({
        kind: 'warning',
        title: d(lang, 'toast.speechUnsupported') || 'Voice input is not supported in this browser',
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      const langMap: Record<string, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        mr: 'mr-IN',
        ml: 'ml-IN',
      };
      recognition.lang = langMap[lang] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        pushToast({ kind: 'info', title: d(lang, 'assistant.listening') });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Send Message
  const sendMessage = useCallback(async (msgText?: string) => {
    const textToSend = (msgText ?? input).trim();
    if (!textToSend || loading) return;

    setInput('');
    setLoading(true);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: textToSend,
      ts: Date.now(),
    };

    const tempBotMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      text: '',
      ts: Date.now(),
      thinking: true,
    };

    const updated = [...messages, userMsg, tempBotMsg];
    setMessages(updated);

    try {
      const history = updated
        .filter(m => !m.thinking)
        .slice(-8, -1)
        .map(m => ({ role: m.role, text: m.text }));

      const res = await api.post<{
        reply: {
          text: string;
          parts?: ChatReplyPart[];
          disclaimer?: boolean;
          sources?: string[];
          contacts?: OfficialContact[];
        };
        context?: { risk?: any; crop?: string };
        lang?: string;
      }>('/chat', {
        message: textToSend,
        lang,
        history,
      });

      addRecentQuery({
        id: userMsg.id,
        text: textToSend,
        lang: res.lang || lang,
        ts: Date.now(),
        crop: res.context?.crop,
      });

      setMessages(prev =>
        prev.map(m =>
          m.id === tempBotMsg.id
            ? {
                ...m,
                thinking: false,
                text: res.reply.text,
                parts: res.reply.parts,
                disclaimer: res.reply.disclaimer,
                sources: res.reply.sources,
                risk: res.context?.risk,
                contacts: res.reply.contacts,
              }
            : m
        )
      );

      if (autoSpeak) {
        speakText(res.reply.text);
      }
    } catch (err: any) {
      setMessages(prev => prev.filter(m => m.id !== tempBotMsg.id));
      const errorMsg = err?.message || d(lang, 'toast.error');
      pushToast({ kind: 'error', title: errorMsg });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading, messages, lang, autoSpeak, speakText, addRecentQuery, pushToast]);

  // Handle URL param ?q=
  useEffect(() => {
    const qParam = searchParams.get('q');
    if (!qParam || queryHandledRef.current === qParam) return;
    queryHandledRef.current = qParam;
    setInput(qParam);
    const timer = setTimeout(() => {
      sendMessage(qParam);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchParams, sendMessage]);

  const clearChat = () => {
    setMessages([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    window.speechSynthesis?.cancel();
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    pushToast({ kind: 'success', title: d(lang, 'assistant.copied') });
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="page page--wide assistant-page" style={{ paddingTop: 24, paddingBottom: 100 }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 14,
          flexWrap: 'wrap',
          marginBottom: 20,
        }}
      >
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={26} color="var(--forest)" />
            {d(lang, 'assistant.title')}
          </h1>
          <p className="page-sub">{d(lang, 'assistant.sub')}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={toggleAutoSpeak}
            aria-pressed={autoSpeak}
            title={autoSpeak ? 'Mute voice responses' : 'Enable voice responses'}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {autoSpeak ? <Volume2 size={16} color="var(--forest)" /> : <VolumeX size={16} />}
            <span>Voice {autoSpeak ? 'On' : 'Off'}</span>
          </button>

          {messages.length > 0 && (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={clearChat}
              aria-label={d(lang, 'assistant.clearChat')}
              style={{ color: 'var(--danger)' }}
            >
              <Trash2 size={16} />
              <span>{d(lang, 'assistant.clearChat')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Feed */}
      <div
        style={{
          minHeight: 360,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {messages.length === 0 && !loading && (
          <div
            className="card"
            style={{
              padding: '36px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              background: 'var(--surface)',
            }}
          >
            <span
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'var(--leaf-light)',
                color: 'var(--forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mic size={30} />
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
              {d(lang, 'assistant.title')}
            </h3>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 460, margin: 0, fontSize: 14.5 }}>
              {d(lang, 'assistant.sub')}
            </p>

            {suggestedQuestions.length > 0 && (
              <div style={{ marginTop: 14, width: '100%', maxWidth: 640 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 10 }}>
                  {d(lang, 'assistant.quickQuestions')}:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                  {suggestedQuestions.slice(0, 5).map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="chip"
                      onClick={() => sendMessage(q)}
                      style={{
                        borderRadius: 'var(--radius-pill)',
                        padding: '8px 14px',
                        background: 'var(--cream)',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      💬 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.role === 'user' ? (
              <div
                style={{
                  maxWidth: 'min(82vw, 560px)',
                  background: 'var(--forest)',
                  color: '#ffffff',
                  padding: '14px 18px',
                  borderRadius: '18px 18px 4px 18px',
                  fontSize: 15.5,
                  lineHeight: 1.5,
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                {msg.text}
              </div>
            ) : (
              <div
                className="card"
                style={{
                  maxWidth: 'min(94vw, 760px)',
                  padding: '20px 22px',
                  borderRadius: '18px 18px 18px 4px',
                  background: 'var(--surface)',
                }}
              >
                {msg.thinking ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-soft)' }}>
                    <span className="typing-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>
                      {d(lang, 'assistant.thinking')}
                    </span>
                  </div>
                ) : (
                  <div>
                    {/* Render message parts or fallback text */}
                    {msg.parts && msg.parts.length > 0 ? (
                      <div style={{ display: 'grid', gap: 12 }}>
                        {msg.parts.map((part, pIdx) => {
                          if (part.kind === 'heading') {
                            return (
                              <h4
                                key={pIdx}
                                style={{
                                  fontSize: 16,
                                  fontWeight: 800,
                                  margin: '8px 0 2px',
                                  color: 'var(--forest)',
                                }}
                              >
                                {part.text}
                              </h4>
                            );
                          }
                          if (part.kind === 'ul') {
                            return (
                              <ul
                                key={pIdx}
                                style={{
                                  margin: 0,
                                  paddingLeft: 20,
                                  display: 'grid',
                                  gap: 6,
                                  fontSize: 14.5,
                                  lineHeight: 1.55,
                                }}
                              >
                                {part.items?.map((it, iIdx) => (
                                  <li key={iIdx}>{it}</li>
                                ))}
                              </ul>
                            );
                          }
                          if (part.kind === 'tip') {
                            return (
                              <div
                                key={pIdx}
                                style={{
                                  padding: '10px 14px',
                                  borderRadius: 10,
                                  background: 'var(--leaf-light)',
                                  border: '1px solid var(--leaf-mid)',
                                  color: 'var(--forest)',
                                  fontSize: 14,
                                  fontWeight: 600,
                                  display: 'flex',
                                  gap: 8,
                                }}
                              >
                                <Info size={18} style={{ flexShrink: 0, marginTop: 1 }} />
                                <span>{part.text}</span>
                              </div>
                            );
                          }
                          return (
                            <p key={pIdx} style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>
                              {part.text}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </p>
                    )}

                    {/* Risk Tag if attached */}
                    {msg.risk && (
                      <div
                        style={{
                          marginTop: 14,
                          padding: '10px 14px',
                          borderRadius: 12,
                          background:
                            msg.risk.level === 'high'
                              ? 'var(--danger-light)'
                              : msg.risk.level === 'medium'
                              ? 'var(--sun-light)'
                              : 'var(--leaf-light)',
                          color:
                            msg.risk.level === 'high'
                              ? 'var(--danger)'
                              : msg.risk.level === 'medium'
                              ? 'var(--sun-dark)'
                              : 'var(--forest)',
                          fontSize: 13.5,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <AlertTriangle size={16} />
                        <span>Risk Score: {msg.risk.score}/100 ({msg.risk.label})</span>
                      </div>
                    )}

                    {/* Official Contacts if attached */}
                    {msg.contacts && msg.contacts.length > 0 && (
                      <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-soft)' }}>
                          Recommended Agricultural Officials:
                        </div>
                        {msg.contacts.map((c, cIdx) => (
                          <div
                            key={cIdx}
                            style={{
                              padding: '8px 12px',
                              borderRadius: 10,
                              background: 'var(--surfaceSoft)',
                              border: '1px solid var(--line)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: 13,
                            }}
                          >
                            <span style={{ fontWeight: 700 }}>{c.name} ({c.region})</span>
                            <a
                              href={`tel:${c.contact.replace(/\D/g, '')}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                color: 'var(--forest)',
                                fontWeight: 800,
                                textDecoration: 'none',
                              }}
                            >
                              <PhoneCall size={13} /> {c.contact}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Bar (Speak & Copy) */}
                    <div
                      style={{
                        marginTop: 16,
                        paddingTop: 12,
                        borderTop: '1px solid var(--line)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                      }}
                    >
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => speakText(msg.text)}
                          title="Speak response"
                        >
                          <Volume2 size={15} />
                          <span>Speak</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          title={d(lang, 'assistant.copy')}
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={15} color="var(--leaf)" />
                              <span style={{ color: 'var(--leaf)' }}>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={15} />
                              <span>{d(lang, 'assistant.copy')}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
                        {new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar (Fixed Bottom) */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--bottomnavBg)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--line)',
          padding: '12px 18px',
          zIndex: 38,
        }}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
          style={{
            maxWidth: 820,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <button
            type="button"
            className="icon-btn"
            onClick={startListening}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: isListening ? 'var(--danger)' : 'var(--leaf-light)',
              color: isListening ? '#ffffff' : 'var(--forest)',
              border: isListening ? 'none' : '1px solid var(--line)',
              flexShrink: 0,
              transition: 'all .2s ease',
            }}
            title={isListening ? 'Stop listening' : 'Voice input'}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <input
            ref={inputRef}
            type="text"
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              isListening
                ? d(lang, 'assistant.listening')
                : d(lang, 'assistant.inputPlaceholder')
            }
            disabled={loading}
            style={{
              flex: 1,
              borderRadius: 'var(--radius-pill)',
              minHeight: 46,
              paddingLeft: 18,
              paddingRight: 18,
              fontSize: 15,
            }}
          />

          <button
            type="submit"
            className="btn btn--primary"
            disabled={!input.trim() || loading}
            style={{
              borderRadius: 'var(--radius-pill)',
              minHeight: 46,
              padding: '0 20px',
              flexShrink: 0,
            }}
          >
            <Send size={18} />
            <span className="send-label">{d(lang, 'common.send')}</span>
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .send-label { display: none; }
        }
      `}</style>
    </div>
  );
};
