import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays, Check, CheckCircle2, Clipboard, Clock3, Copy, Heart,
  MapPin, MessageCircle, Sparkles, UserRound, Users, RotateCcw,
  Sun, HandHeart, Video, Church, Sprout
} from 'lucide-react';
import './styles.css';

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const initial = { foice: '', fruto: '', date: localDate, time: '15:00', format: 'Presencial', attendant: '' };

function formatDate(value) {
  if (!value) return 'A combinar';
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
function weekday(value) {
  if (!value) return 'Selecione uma data';
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', { weekday: 'long' });
}
function buildMessage(data) {
  return [
    '🌿 *ENCONTRO DE EVANGELIZAÇÃO*',
    '',
    `🌾 *Foice:* ${data.foice.trim() || 'Não informado'}`,
    `🍇 *Fruto:* ${data.fruto.trim() || 'Não informado'}`,
    `📅 *Data:* ${formatDate(data.date)}`,
    `🗓️ *Dia da semana:* ${weekday(data.date)}`,
    `🕒 *Horário:* ${data.time || 'A combinar'}`,
    `${data.format === 'Online' ? '💻' : '📍'} *Modalidade:* ${data.format}`,
    `🙋 *Quem vai atender:* ${data.attendant.trim() || 'A definir'}`,
    '',
    'Que Deus abençoe esse encontro! 🙏'
  ].join('\n');
}
function Field({ label, icon: Icon, hint, children }) {
  return <div className="field"><label>{Icon && <Icon size={16} strokeWidth={1.8} />}<span>{label}</span></label>{children}{hint && <small>{hint}</small>}</div>;
}
function App() {
  const [form, setForm] = useState(initial);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('message');
  const message = useMemo(() => buildMessage(form), [form]);
  const update = (key, value) => { setForm(current => ({ ...current, [key]: value })); setCopied(false); };
  async function copyMessage() {
    try { await navigator.clipboard.writeText(message); setCopied(true); }
    catch { const area = document.querySelector('#generated-message'); area?.focus(); area?.select(); document.execCommand('copy'); setCopied(true); }
    window.setTimeout(() => setCopied(false), 2200);
  }
  function resetForm() { setForm(initial); setCopied(false); }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="Evangeliza início"><span className="brand-mark"><HandHeart size={23} /></span><span className="brand-name">evangeliza<span>.</span></span></a>
      <div className="topbar-right"><span className="top-pill"><span className="live-dot" /> Ferramenta da comunidade</span><div className="avatar"><Heart size={17} fill="currentColor" /></div></div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><Sparkles size={14} /> ORGANIZE COM PROPÓSITO</div><h1>Pequenos encontros.<br /><em>Grandes propósitos.</em></h1><p>Organize os encontros de evangelização e transforme os detalhes em uma mensagem pronta para compartilhar — com carinho, clareza e menos trabalho.</p><div className="hero-note"><span className="note-icon"><Heart size={15} /></span><span>Feito para servir melhor, juntos.</span></div></div>
        <div className="hero-art" aria-hidden="true"><div className="sun-glow" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-card card-back"><CalendarDays size={19} /><span>Um encontro</span><strong>com propósito</strong></div><div className="art-cross"><span /></div><div className="art-card card-front"><span className="mini-check"><Check size={13} /></span><div><strong>Mensagem pronta</strong><small>Preparada com carinho</small></div></div><div className="art-spark spark-a">✳</div><div className="art-spark spark-b">✦</div></div>
      </section>
      <div className="section-heading"><div><span className="section-kicker">SEU ESPAÇO DE ORGANIZAÇÃO</span><h2>Vamos preparar o encontro?</h2></div><span className="step-indicator"><span>01</span> <i /> <span>02</span></span></div>
      <section className="workspace">
        <div className="form-card">
          <div className="card-heading"><div className="heading-icon"><Clipboard size={19} /></div><div><h3>Detalhes do encontro</h3><p>Preencha as informações abaixo.</p></div></div>
          <div className="form-content">
            <div className="field-group"><div className="group-label"><span className="number">01</span><span>Informações</span></div>
              <div className="form-grid">
                <Field label="Foice" icon={Sprout} hint="Informe a foice relacionada ao encontro"><input value={form.foice} onChange={e => update('foice', e.target.value)} placeholder="Digite a foice" /></Field>
                <Field label="Fruto" icon={Heart} hint="Informe o fruto relacionado ao encontro"><input value={form.fruto} onChange={e => update('fruto', e.target.value)} placeholder="Digite o fruto" /></Field>
              </div>
            </div>
            <div className="field-group"><div className="group-label"><span className="number">02</span><span>Encontro marcado?</span></div>
              <div className="form-grid">
                <Field label="Data para o encontro" icon={CalendarDays}><input type="date" value={form.date} onChange={e => update('date', e.target.value)} /></Field>
                <Field label="Dia da semana" icon={CalendarDays} hint="Preenchido automaticamente"><div className="weekday-display">{weekday(form.date)}</div></Field>
                <Field label="Horário" icon={Clock3}><input type="time" value={form.time} onChange={e => update('time', e.target.value)} /></Field>
              </div>
            </div>
            <div className="field-group"><div className="group-label"><span className="number">03</span><span>Modalidade</span></div>
              <div className="format-options">
                <button type="button" className={`format-option ${form.format === 'Online' ? 'selected' : ''}`} onClick={() => update('format', 'Online')}><span className="format-icon"><Video size={19} /></span><span><strong>Online</strong><small>Encontro por chamada</small></span>{form.format === 'Online' && <CheckCircle2 className="format-check" size={17} />}</button>
                <button type="button" className={`format-option ${form.format === 'Presencial' ? 'selected' : ''}`} onClick={() => update('format', 'Presencial')}><span className="format-icon"><Church size={19} /></span><span><strong>Presencial</strong><small>Encontro em um local físico</small></span>{form.format === 'Presencial' && <CheckCircle2 className="format-check" size={17} />}</button>
              </div>
            </div>
            <div className="field-group last-group"><div className="group-label"><span className="number">04</span><span>Responsável</span></div>
              <Field label="Evangelista" icon={UserRound} hint="Quem vai se encontrar com o fruto"><input value={form.attendant} onChange={e => update('attendant', e.target.value)} placeholder="Nome de quem vai atender" /></Field>
            </div>
          </div>
          <div className="form-footer"><span><Sun size={15} /> Suas informações ficam neste navegador.</span><button type="button" className="reset-button" onClick={resetForm}><RotateCcw size={14} /> Limpar formulário</button></div>
        </div>
        <aside className="preview-column">
          <div className="preview-card"><div className="preview-top"><div><span className="section-kicker">PRONTO PARA COMPARTILHAR</span><h3>Sua mensagem</h3></div><span className="live-badge"><span /> AO VIVO</span></div><p className="preview-description">O texto se atualiza automaticamente conforme você preenche o formulário.</p>
            <div className="preview-tabs"><button className={activeTab === 'message' ? 'active' : ''} onClick={() => setActiveTab('message')}><MessageCircle size={15} /> Mensagem</button><button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}><Clipboard size={15} /> Resumo</button></div>
            {activeTab === 'message' ? <textarea id="generated-message" className="message-output" value={message} readOnly aria-label="Mensagem gerada para copiar" /> : <div className="summary-output">
              <div className="summary-row"><Sprout size={17} /><div><small>Foice</small><strong>{form.foice || 'Não informado'}</strong></div></div>
              <div className="summary-row"><Heart size={17} /><div><small>Fruto</small><strong>{form.fruto || 'Não informado'}</strong></div></div>
              <div className="summary-row"><CalendarDays size={17} /><div><small>Data e dia da semana</small><strong>{formatDate(form.date)} · {weekday(form.date)}</strong></div></div>
              <div className="summary-row"><Clock3 size={17} /><div><small>Horário</small><strong>{form.time || 'A combinar'}</strong></div></div>
              <div className="summary-row">{form.format === 'Online' ? <Video size={17} /> : <Church size={17} />}<div><small>Modalidade</small><strong>{form.format}</strong></div></div>
              <div className="summary-row"><UserRound size={17} /><div><small>Quem vai atender</small><strong>{form.attendant || 'A definir'}</strong></div></div>
            </div>}
            <div className="preview-meta"><span><CheckCircle2 size={14} /> Texto pronto para copiar</span><span>{message.length} caracteres</span></div><button type="button" className={`copy-button ${copied ? 'copied' : ''}`} onClick={copyMessage}>{copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}{copied ? 'Mensagem copiada!' : 'Copiar mensagem'}<span className="copy-arrow">→</span></button>
            <div className="share-tip"><span className="tip-icon"><Sparkles size={16} /></span><p><strong>Dica carinhosa</strong> Revise os detalhes em "Resumo" antes de enviar. Uma mensagem clara transmite cuidado e ajuda todo mundo a se organizar.</p></div>
          </div>
          <div className="verse-card"><div className="verse-mark">“</div><p>Ide por todo o mundo e pregai o evangelho a toda criatura.</p><span>Marcos 16:15</span><div className="verse-leaf">✳</div></div>
        </aside>
      </section>
      <footer className="footer"><div className="footer-brand"><HandHeart size={17} /> evangeliza<span>.</span></div><p>Servindo com amor, organizando com propósito.</p><span className="footer-right">Feito para a comunidade <Heart size={13} fill="currentColor" /></span></footer>
    </main>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
