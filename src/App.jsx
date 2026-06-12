import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  BRAND, EMAILJS, RA_LINKS, SECTIONS,
  QUESTIONS_BILLINGHAM, QUESTIONS_MACCLESFIELD,
} from './data/config';

const isBillingham = site => site === 'billingham';

// ─── YouTube embed ────────────────────────────────────────────────────────────
function VideoEmbed({ video }) {
  const borderColor = video.style === 'incorrect' ? BRAND.secondary : BRAND.accent;
  const bgColor = video.style === 'incorrect' ? '#FEF2F2' : '#F0FBF6';
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ background: bgColor, border: `2px solid ${borderColor}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: video.style === 'incorrect' ? BRAND.secondary : '#1a7a50' }}>
            {video.label}
          </span>
        </div>
        <div style={{ position: 'relative', paddingBottom: '177.78%', height: 0, background: '#000' }}>
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=1`}
            title={video.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {video.caption && (
          <p style={{ padding: '8px 14px', fontSize: 13, color: '#4A5568', margin: 0, fontStyle: 'italic' }}>
            {video.caption}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Photo gallery ────────────────────────────────────────────────────────────
function PhotoGallery({ images }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '20px 0' }}>
      {images.map((img, i) => (
        <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: `1.5px solid #D8E2EE` }}>
          {img.badge && (
            <div style={{
              padding: '6px 14px',
              background: img.badge === 'correct' ? '#F0FBF6' : '#FFF8E6',
              borderBottom: `1px solid ${img.badge === 'correct' ? BRAND.accent : '#F0A500'}`,
              fontSize: 13,
              fontWeight: 700,
              color: img.badge === 'correct' ? '#1a7a50' : '#7A4F00',
            }}>
              {img.badge === 'correct' ? '✅ Correct' : '⚠️ Action required'}
            </div>
          )}
          <img
            src={img.src}
            alt={img.alt}
            style={{ width: '100%', display: 'block', maxHeight: 420, objectFit: 'cover' }}
          />
          {img.caption && (
            <p style={{ padding: '8px 14px', fontSize: 13, color: '#4A5568', margin: 0, background: BRAND.lightGrey, fontStyle: 'italic' }}>
              {img.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={S.progressWrap}>
      <div style={S.progressTrack}>
        <div style={{ ...S.progressFill, width: `${pct}%` }} />
      </div>
      <span style={S.progressLabel}>{pct}% complete</span>
    </div>
  );
}

// ─── Site Selector ────────────────────────────────────────────────────────────
function SiteSelector({ onSelect }) {
  return (
    <div style={S.centreScreen}>
      <img src={BRAND.logo} alt="Caswells Group" style={S.logo} />
      <h1 style={S.pageTitle}>Warehouse Induction</h1>
      <p style={S.pageSubtitle}>Picking & Putting Away — Training Module</p>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#1C2B3A', marginBottom: 20 }}>Select your site to begin</p>
      <div style={S.siteButtons}>
        <button style={S.siteBtn} onClick={() => onSelect('billingham')}>
          <span style={S.siteBtnTitle}>Billingham</span>
          <span style={S.siteBtnSub}>D R Caswell Ltd</span>
        </button>
        <button style={{ ...S.siteBtn, background: BRAND.navy }} onClick={() => onSelect('macclesfield')}>
          <span style={S.siteBtnTitle}>Macclesfield</span>
          <span style={S.siteBtnSub}>Cutler Cleaning Supplies Ltd</span>
        </button>
      </div>
    </div>
  );
}

// ─── Name Entry ───────────────────────────────────────────────────────────────
function NameEntry({ site, onStart }) {
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');
  const [error, setError] = useState('');
  const go = () => {
    if (!name.trim()) { setError('Please enter your full name.'); return; }
    if (!manager.trim()) { setError("Please enter your manager's name."); return; }
    onStart(name.trim(), manager.trim());
  };
  return (
    <div style={S.card}>
      <img src={BRAND.logo} alt="Caswells Group" style={{ ...S.logo, marginBottom: 12 }} />
      <div style={S.siteChip}>{isBillingham(site) ? 'Billingham' : 'Macclesfield'}</div>
      <h2 style={S.cardTitle}>Before you start</h2>
      <p style={S.cardBody}>Work through each section, then complete a short assessment. Your result will be sent to the QHSE team automatically.</p>
      <div style={S.fieldGroup}>
        <label style={S.label}>Your full name</label>
        <input style={S.input} type="text" placeholder="e.g. John Smith" value={name} onChange={e => { setName(e.target.value); setError(''); }} />
      </div>
      <div style={S.fieldGroup}>
        <label style={S.label}>Your manager's name</label>
        <input style={S.input} type="text" placeholder="e.g. David Timney" value={manager} onChange={e => { setManager(e.target.value); setError(''); }} />
      </div>
      {error && <p style={S.error}>{error}</p>}
      <button style={S.primaryBtn} onClick={go}>Start training →</button>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ section }) {
  return (
    <div style={S.sectionHeader}>
      <span style={{ fontSize: 32, lineHeight: 1 }}>{section.icon}</span>
      <div>
        <p style={S.eyebrow}>Section {Math.floor(section.number)}</p>
        <h2 style={S.sectionTitle}>{section.title}</h2>
      </div>
    </div>
  );
}

// ─── H&S Awareness ───────────────────────────────────────────────────────────
function SectionHSAwareness({ section, onComplete }) {
  const [checked, setChecked] = useState({});
  const allChecked = section.points.every((_, i) => checked[i]);
  return (
    <div style={S.card}>
      <SectionHeader section={section} />
      <p style={S.intro}>{section.intro}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {section.points.map((pt, i) => (
          <label key={i} style={{ ...S.checkItem, background: checked[i] ? '#EBF7F2' : BRAND.white }}>
            <input type="checkbox" checked={!!checked[i]} onChange={() => setChecked(p => ({ ...p, [i]: !p[i] }))} style={S.checkbox} />
            <div>
              <strong style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy, display: 'block', marginBottom: 2 }}>{pt.heading}</strong>
              <p style={{ fontSize: 13, color: '#4A5568', margin: 0, lineHeight: 1.5 }}>{pt.text}</p>
            </div>
          </label>
        ))}
      </div>
      {!allChecked && <p style={S.hint}>Tick each item to confirm you have read and understood it.</p>}
      <button style={{ ...S.primaryBtn, opacity: allChecked ? 1 : 0.4 }} disabled={!allChecked} onClick={onComplete}>Continue →</button>
    </div>
  );
}

// ─── Incident Reporting ───────────────────────────────────────────────────────
function SectionIncidentReporting({ section, site, onComplete }) {
  const [ack, setAck] = useState(false);
  const raLink = isBillingham(site) ? RA_LINKS.billingham : RA_LINKS.macclesfield;
  const raRef  = isBillingham(site) ? 'CAS03 REV 5' : 'CUT03 REV 4';
  return (
    <div style={S.card}>
      <SectionHeader section={section} />
      <p style={S.intro}>{section.intro}</p>
      {section.points.map((pt, i) => (
        <div key={i} style={S.infoCard}>
          <strong style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy, display: 'block', marginBottom: 4 }}>{pt.heading}</strong>
          <p style={{ fontSize: 13, color: '#4A5568', margin: 0, lineHeight: 1.5 }}>{pt.text}</p>
        </div>
      ))}
      {section.reportingLinks && section.reportingLinks.some(l => l.url !== '#') && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy, marginBottom: 10 }}>Quick links — report an incident:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {section.reportingLinks.map((link, i) => (
              link.url !== '#' ? (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: link.colour, color: BRAND.white, borderRadius: 8, padding: '11px 16px', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  📝 {link.label}
                </a>
              ) : (
                <div key={i} style={{ display: 'block', background: '#D0D8E4', color: '#7A8A9A', borderRadius: 8, padding: '11px 16px', fontWeight: 600, fontSize: 14 }}>
                  📝 {link.label} — link to be added
                </div>
              )
            ))}
          </div>
        </div>
      )}
      <div style={S.raBox}>
        <p style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy, margin: '0 0 8px' }}>Your site risk assessment:</p>
        <a href={raLink} target="_blank" rel="noopener noreferrer" style={S.raLink}>
          📄 {raRef} — Picking & Putting Away ({isBillingham(site) ? 'Billingham' : 'Macclesfield'})
        </a>
        <p style={{ fontSize: 12, color: BRAND.midGrey, margin: 0 }}>Open and review this document before continuing.</p>
      </div>
      <label style={S.ackLabel}>
        <input type="checkbox" checked={ack} onChange={() => setAck(!ack)} style={S.checkbox} />
        <span style={{ fontSize: 14 }}>I have reviewed the risk assessment and understand the hazards and controls for my site.</span>
      </label>
      <button style={{ ...S.primaryBtn, opacity: ack ? 1 : 0.4 }} disabled={!ack} onClick={onComplete}>Continue →</button>
    </div>
  );
}

// ─── Generic content section ──────────────────────────────────────────────────
function SectionContent({ section, onComplete }) {
  const [ack, setAck] = useState(false);
  return (
    <div style={S.card}>
      <SectionHeader section={section} />
      <p style={S.intro}>{section.intro}</p>

      {/* Videos (low-level knife section) */}
      {section.videos && (
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy, marginBottom: 12 }}>Watch: Safety Knife Technique</p>
          {section.videos.map((v, i) => <VideoEmbed key={i} video={v} />)}
        </div>
      )}

      {/* Points list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '8px 0 20px' }}>
        {section.points.map((pt, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 8, height: 8, background: BRAND.secondary, borderRadius: 2, flexShrink: 0, marginTop: 6 }} />
            <div>
              <strong style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy, display: 'block', marginBottom: 2 }}>{pt.heading}</strong>
              <p style={{ fontSize: 13, color: '#4A5568', margin: 0, lineHeight: 1.55 }}>{pt.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Photo gallery */}
      {section.images && <PhotoGallery images={section.images} />}

      <label style={S.ackLabel}>
        <input type="checkbox" checked={ack} onChange={() => setAck(!ack)} style={S.checkbox} />
        <span style={{ fontSize: 14 }}>I have read and understood this section.</span>
      </label>
      <button style={{ ...S.primaryBtn, opacity: ack ? 1 : 0.4 }} disabled={!ack} onClick={onComplete}>Continue →</button>
    </div>
  );
}

// ─── Assessment ───────────────────────────────────────────────────────────────
function Assessment({ site, traineeName, managerName, onComplete }) {
  const questions = isBillingham(site) ? QUESTIONS_BILLINGHAM : QUESTIONS_MACCLESFIELD;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;
  const pct   = submitted ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= 80;

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setSubmitted(true);
    setSending(true);
    const wrongItems = questions.map((q, i) => answers[i] !== q.correct ? `Q${i+1}: ${q.q}` : null).filter(Boolean);
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        to_email: EMAILJS.notifyEmail,
        trainee_name: traineeName,
        manager_name: managerName,
        site: isBillingham(site) ? 'Billingham (D R Caswell Ltd)' : 'Macclesfield (Cutler Cleaning Supplies Ltd)',
        module: 'Warehouse Induction — Picking & Putting Away',
        score: `${score}/${questions.length} (${pct}%)`,
        result: passed ? 'PASSED' : 'FAILED — review required',
        wrong_questions: wrongItems.length ? wrongItems.join('\n') : 'None',
        date: new Date().toLocaleDateString('en-GB'),
      }, EMAILJS.publicKey);
    } catch(e) {
      setSendError('Result could not be sent automatically. Please inform your manager of your score.');
    }
    setSending(false);
  };

  if (submitted) {
    return (
      <div style={S.card}>
        <div style={{ background: passed ? BRAND.accent : BRAND.secondary, borderRadius: 12, padding: '28px', textAlign: 'center', marginBottom: 24, color: BRAND.white }}>
          <p style={{ fontSize: 52, fontWeight: 700, margin: 0 }}>{score}/{questions.length}</p>
          <p style={{ fontSize: 20, fontWeight: 600, margin: '4px 0' }}>{pct}%</p>
          <p style={{ fontSize: 18, fontWeight: 700, margin: '8px 0 0' }}>{passed ? '✓ Passed' : '✗ Not yet passed'}</p>
        </div>
        {passed && <p style={{ fontSize: 15, color: '#1a7a50', fontWeight: 600, marginBottom: 20, lineHeight: 1.6 }}>Well done, {traineeName.split(' ')[0]}. Your result has been sent to the QHSE team. Please sign the paper TGN-15 record with your manager to complete your induction.</p>}
        {!passed && <div style={{ background: '#FEF2F2', border: `1.5px solid ${BRAND.secondary}`, borderRadius: 8, padding: 16, marginBottom: 20 }}><p style={{ fontWeight: 700, color: BRAND.secondary, margin: '0 0 4px' }}>You need 80% or more to pass.</p><p style={{ fontSize: 14, color: '#4A5568', margin: 0 }}>Review the sections and speak to your manager. You will need to retake the assessment.</p></div>}
        {sending && <p style={S.hint}>Sending result…</p>}
        {sendError && <p style={S.error}>{sendError}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0' }}>
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct;
            return (
              <div key={i} style={{ padding: '12px 16px', background: BRAND.lightGrey, borderRadius: '0 8px 8px 0', borderLeft: `4px solid ${correct ? BRAND.accent : BRAND.secondary}` }}>
                <p style={{ fontSize: 14, color: BRAND.navy, margin: '0 0 6px' }}><strong>Q{i+1}.</strong> {q.q}</p>
                <p style={{ color: correct ? '#1a7a50' : BRAND.secondary, fontWeight: 600, fontSize: 13, margin: 0 }}>{correct ? '✓ Correct' : `✗ Your answer: ${q.options[answers[i]]}`}</p>
                {!correct && <p style={{ color: '#1a7a50', fontSize: 13, margin: '4px 0 0' }}>Correct: {q.options[q.correct]}</p>}
              </div>
            );
          })}
        </div>
        {passed && <button style={S.primaryBtn} onClick={onComplete}>Finish</button>}
      </div>
    );
  }

  return (
    <div style={S.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <span style={{ fontSize: 32 }}>📝</span>
        <div>
          <p style={S.eyebrow}>Final Step</p>
          <h2 style={S.sectionTitle}>Knowledge Assessment</h2>
        </div>
      </div>
      <p style={S.intro}>{questions.length} questions — 80% to pass. Read each question carefully.</p>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #EEF2F7' }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: BRAND.navy, marginBottom: 12, lineHeight: 1.5 }}><strong>Q{i+1}.</strong> {q.q}</p>
          {q.options.map((opt, j) => (
            <label key={j} style={{ display: 'flex', alignItems: 'center', padding: '11px 14px', border: `1.5px solid ${answers[i] === j ? BRAND.primary : '#D0D8E4'}`, borderRadius: 8, cursor: 'pointer', fontSize: 14, marginBottom: 8, background: answers[i] === j ? '#E8F0FB' : BRAND.white, fontWeight: answers[i] === j ? 600 : 400, transition: 'all 0.15s' }}>
              <input type="radio" name={`q${i}`} checked={answers[i] === j} onChange={() => setAnswers(p => ({ ...p, [i]: j }))} style={{ marginRight: 10 }} />
              {opt}
            </label>
          ))}
        </div>
      ))}
      {!allAnswered && <p style={S.hint}>Answer all {questions.length} questions to submit.</p>}
      <button style={{ ...S.primaryBtn, opacity: allAnswered ? 1 : 0.4 }} disabled={!allAnswered} onClick={handleSubmit}>Submit answers</button>
    </div>
  );
}

// ─── Completion ───────────────────────────────────────────────────────────────
function CompletionScreen({ traineeName, site }) {
  return (
    <div style={{ ...S.centreScreen, padding: '48px 24px' }}>
      <span style={{ fontSize: 56, marginBottom: 16, display: 'block' }}>🎉</span>
      <h2 style={S.pageTitle}>Training Complete</h2>
      <p style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.6, maxWidth: 480, margin: '0 auto 32px' }}>
        Well done, {traineeName.split(' ')[0]}. You have completed the Picking & Putting Away induction module for {isBillingham(site) ? 'Billingham' : 'Macclesfield'}.
      </p>
      <div style={{ background: BRAND.white, borderRadius: 12, padding: '24px', maxWidth: 480, margin: '0 auto', textAlign: 'left', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
        <p style={{ fontWeight: 700, color: BRAND.navy, marginBottom: 16 }}>Your next steps:</p>
        {[
          'Sign the paper TGN-15 competency record with your manager.',
          'Complete your manual handling training (TGN-01) — your manager will send this separately.',
          'Speak to your manager before working unsupervised.',
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14, fontSize: 14, color: '#4A5568', lineHeight: 1.5 }}>
            <span style={{ background: BRAND.primary, color: BRAND.white, borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i+1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase]         = useState('site');
  const [site, setSite]           = useState(null);
  const [traineeName, setTraineeName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [sectionIdx, setSectionIdx]   = useState(0);
  const topRef = useRef(null);

  const activeSections = SECTIONS.filter(s => !s.billinghamOnly || isBillingham(site));
  const totalSteps = activeSections.length + 1;
  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth' });

  const next = () => {
    setSectionIdx(i => i + 1);
    scrollTop();
  };

  const renderSection = (section) => {
    if (section.id === 'hs-awareness')      return <SectionHSAwareness section={section} onComplete={next} />;
    if (section.id === 'incident-reporting') return <SectionIncidentReporting section={section} site={site} onComplete={next} />;
    return <SectionContent section={section} onComplete={next} />;
  };

  return (
    <div style={{ minHeight: '100vh', background: BRAND.lightGrey, fontFamily: "'Segoe UI', Calibri, sans-serif", color: '#1C2B3A' }}>
      <div ref={topRef} />

      {phase !== 'site' && (
        <header style={{ background: BRAND.white, borderBottom: `3px solid ${BRAND.secondary}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <img src={BRAND.logo} alt="Caswells Group" style={{ height: 36 }} />
          <span style={{ background: BRAND.primary, color: BRAND.white, borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 600 }}>
            {isBillingham(site) ? 'Billingham' : 'Macclesfield'}
          </span>
        </header>
      )}

      {phase === 'training' && (
        <div style={{ background: BRAND.white, padding: '8px 24px', borderBottom: '1px solid #E0E6EE' }}>
          <ProgressBar current={sectionIdx} total={totalSteps} />
        </div>
      )}

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px 48px' }}>
        {phase === 'site'     && <SiteSelector onSelect={s => { setSite(s); setPhase('name'); }} />}
        {phase === 'name'     && <NameEntry site={site} onStart={(n, m) => { setTraineeName(n); setManagerName(m); setPhase('training'); scrollTop(); }} />}
        {phase === 'training' && sectionIdx < activeSections.length && renderSection(activeSections[sectionIdx])}
        {phase === 'training' && sectionIdx === activeSections.length && <Assessment site={site} traineeName={traineeName} managerName={managerName} onComplete={() => { setPhase('complete'); scrollTop(); }} />}
        {phase === 'complete' && <CompletionScreen traineeName={traineeName} site={site} />}
      </main>

      <footer style={{ background: BRAND.navy, padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '2px 0' }}>Caswells Group  ·  Warehouse Induction — Picking & Putting Away  ·  TGN-15 / v2026.1</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '2px 0' }}>D R Caswell Ltd, Billingham TS23 4JA  ·  Cutler Cleaning Supplies Ltd, Macclesfield SK10 5NZ</p>
      </footer>
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  centreScreen: { textAlign: 'center' },
  logo: { height: 44, marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: 700, color: BRAND.navy, margin: '0 0 8px' },
  pageSubtitle: { fontSize: 16, color: BRAND.midGrey, margin: '0 0 32px' },
  siteButtons: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  siteBtn: { background: BRAND.primary, color: BRAND.white, border: 'none', borderRadius: 10, padding: '20px 36px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 180, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  siteBtnTitle: { fontSize: 18, fontWeight: 700 },
  siteBtnSub: { fontSize: 12, opacity: 0.85 },
  card: { background: BRAND.white, borderRadius: 12, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' },
  cardTitle: { fontSize: 22, fontWeight: 700, color: BRAND.navy, margin: '0 0 12px' },
  cardBody: { fontSize: 15, color: '#4A5568', lineHeight: 1.6, marginBottom: 28 },
  siteChip: { display: 'inline-block', background: BRAND.primary, color: BRAND.white, borderRadius: 20, padding: '3px 14px', fontSize: 13, fontWeight: 600, marginBottom: 16 },
  fieldGroup: { marginBottom: 20 },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: BRAND.navy, marginBottom: 6 },
  input: { width: '100%', padding: '10px 14px', border: '1.5px solid #C8D4E4', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' },
  primaryBtn: { background: BRAND.primary, color: BRAND.white, border: 'none', borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 20, width: '100%', transition: 'opacity 0.2s' },
  error: { color: BRAND.secondary, fontSize: 14, marginBottom: 12 },
  hint: { fontSize: 13, color: BRAND.midGrey, fontStyle: 'italic', marginTop: 8 },
  sectionHeader: { display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 },
  eyebrow: { fontSize: 12, fontWeight: 700, color: BRAND.secondary, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 2px' },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: BRAND.navy, margin: 0 },
  intro: { fontSize: 15, color: '#4A5568', lineHeight: 1.65, marginBottom: 24 },
  checkItem: { display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 8, border: '1.5px solid #D8E6F0', cursor: 'pointer' },
  checkbox: { marginTop: 3, accentColor: BRAND.accent, width: 18, height: 18, flexShrink: 0 },
  infoCard: { background: BRAND.lightGrey, borderLeft: `4px solid ${BRAND.primary}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 },
  raBox: { background: '#EEF4FB', border: `1.5px solid ${BRAND.primary}`, borderRadius: 10, padding: '16px 18px', margin: '24px 0 20px' },
  raLink: { display: 'block', color: BRAND.primary, fontWeight: 600, fontSize: 14, textDecoration: 'none', marginBottom: 8 },
  ackLabel: { display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', marginTop: 16 },
  progressWrap: { display: 'flex', alignItems: 'center', gap: 12 },
  progressTrack: { flex: 1, height: 8, background: '#D8E2EE', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', background: BRAND.accent, borderRadius: 4, transition: 'width 0.4s ease' },
  progressLabel: { fontSize: 12, color: BRAND.midGrey, whiteSpace: 'nowrap', fontWeight: 600 },
};
