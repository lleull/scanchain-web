import React from 'react';

const theme = {
  bg: '#0D1117',
  bgCard: '#1F2937',
  bgSurface: '#2D3748',
  accent: '#10B981',
  accentGlow: 'rgba(16, 185, 129, 0.15)',
  accentDark: '#064E3B',
  textPrimary: '#F3F4F6',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  textDisabled: '#6B7280',
  border: '#2D3748',
  warning: '#F59E0B',
  error: '#EF4444',
  success: '#10B981',
};

function StatusBadge({ status }) {
  const map = {
    Pending:  { bg: 'rgba(245, 158, 11, 0.15)',  color: '#F59E0B' },
    Accepted: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981' },
    Rejected: { bg: 'rgba(239, 68, 68, 0.15)',  color: '#EF4444' },
  };
  const s = map[status] ?? { bg: 'rgba(107, 114, 128, 0.15)', color: '#9CA3AF' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      backgroundColor: s.bg, color: s.color,
      padding: '5px 14px', borderRadius: '20px',
      fontSize: '13px', fontWeight: '600',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: s.color, display: 'inline-block' }} />
      {status ?? 'Unknown'}
    </span>
  );
}

function InfoRow({ label, value, emoji }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      padding: '13px 0',
      borderBottom: `1px solid ${theme.border}`,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: '9px',
        backgroundColor: theme.accentGlow,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: '17px',
      }}>
        {emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11px', color: theme.textMuted, marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </div>
        <div style={{ fontSize: '15px', color: theme.textPrimary, fontWeight: '500', lineHeight: '1.4' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        fontSize: '11px', color: theme.textMuted,
        textTransform: 'uppercase', letterSpacing: '1px',
        fontWeight: '700', marginBottom: '10px',
      }}>
        {title}
      </div>
      <div style={{
        backgroundColor: theme.bgCard, borderRadius: '16px',
        padding: '2px 16px', border: `1px solid ${theme.border}`,
      }}>
        {children}
      </div>
    </div>
  );
}

function BatchPassport({ data }) {
  const formatDate = (str) => {
    if (!str) return null;
    try {
      return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return str;
    }
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: theme.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0F2A3F 0%, #0D1117 100%)',
        padding: '36px 24px 28px', textAlign: 'center',
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <img
          src="/icon.png" alt="Scanchain"
          style={{ width: 64, height: 64, borderRadius: '18px', marginBottom: '14px', objectFit: 'cover', display: 'block', margin: '0 auto 14px' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div style={{
          fontSize: '30px', fontWeight: '800', letterSpacing: '-0.5px',
          background: 'linear-gradient(90deg, #10B981, #6EE7B7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '4px',
        }}>
          Scanchain
        </div>
        <div style={{ fontSize: '14px', color: theme.textMuted, letterSpacing: '0.5px' }}>
          Batch Passport
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px 40px' }}>

        {/* Photo */}
        {data.photoUrl && (
          <div style={{ marginBottom: '20px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
            <img
              src={data.photoUrl} alt="Batch Produce"
              style={{ width: '100%', display: 'block', maxHeight: '260px', objectFit: 'cover' }}
              onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Overview card */}
        <div style={{
          backgroundColor: theme.bgCard, borderRadius: '20px',
          padding: '24px 20px', marginBottom: '16px',
          border: `1px solid ${theme.border}`, textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Batch ID
          </div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: theme.accent, marginBottom: '12px', letterSpacing: '-1px' }}>
            #{data.id}
          </div>
          <StatusBadge status={data.status} />
          {data.collectionPoint && (
            <div style={{ fontSize: '14px', color: theme.textSecondary, marginTop: '12px', fontWeight: '500' }}>
              📍 {data.collectionPoint}
            </div>
          )}
          {data.createdAt && (
            <div style={{ fontSize: '12px', color: theme.textMuted, marginTop: '6px' }}>
              {formatDate(data.createdAt)}
            </div>
          )}
        </div>

        {/* Batch Details */}
        <Section title="Batch Details">
          <InfoRow label="Gross Weight"     value={data.grossWeight != null ? `${data.grossWeight} kg` : null} emoji="⚖️" />
          <InfoRow label="Net Weight"       value={data.netWeight   != null ? `${data.netWeight} kg`   : null} emoji="⚖️" />
          {data.grade          != null && <InfoRow label="Grade"            value={String(data.grade)}                                                emoji="🏅" />}
          {data.arrivalDate              && <InfoRow label="Arrival Date"     value={formatDate(data.arrivalDate)}                                      emoji="📅" />}
          {data.rejectionPercentage != null && (
            <InfoRow label="Rejection Rate" value={`${data.rejectionPercentage}%`} emoji="📊" />
          )}
          {data.confidenceScore != null && (
            <InfoRow
              label="Confidence Score"
              value={`${(parseFloat(data.confidenceScore) * 100).toFixed(1)}%`}
              emoji="✅"
            />
          )}
        </Section>

        {/* Farmer Info */}
        {(data.farmerName || data.farmerVillage || data.farmerPhone) && (
          <Section title="Farmer Information">
            {data.farmerName    && <InfoRow label="Farmer Name" value={data.farmerName}    emoji="👨‍🌾" />}
            {data.farmerVillage && <InfoRow label="Village"     value={data.farmerVillage} emoji="🏘️" />}
            {data.farmerPhone   && <InfoRow label="Phone"       value={String(data.farmerPhone)} emoji="📞" />}
          </Section>
        )}

        {/* Agent Info */}
        {(data.agentName || data.agentCity || data.agentPhone) && (
          <Section title="Collection Agent">
            {data.agentName  && <InfoRow label="Agent Name" value={data.agentName}  emoji="👤" />}
            {data.agentCity  && <InfoRow label="Location"   value={data.agentCity}  emoji="📍" />}
            {data.agentPhone && <InfoRow label="Phone"      value={data.agentPhone} emoji="📞" />}
          </Section>
        )}

        {/* Verification seal */}
        <div style={{
          backgroundColor: theme.accentGlow, border: `1px solid ${theme.accent}33`,
          borderRadius: '16px', padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '24px',
        }}>
          <div style={{ fontSize: '28px' }}>🔒</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: theme.accent, marginBottom: '2px' }}>
              Verified by Scanchain
            </div>
            <div style={{ fontSize: '12px', color: theme.textMuted }}>
              This batch passport is cryptographically linked to the original record.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: theme.textDisabled, paddingBottom: '8px' }}>
          <div style={{ color: theme.accent, fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>
            Scanchain
          </div>
          Secure Agricultural Batch Tracking
        </div>
      </div>
    </div>
  );
}

function ErrorPage({ message }) {
  return (
    <div style={{
      minHeight: '100vh', backgroundColor: theme.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{
        backgroundColor: theme.bgCard, borderRadius: '24px',
        padding: '40px 32px', maxWidth: '420px', width: '100%',
        textAlign: 'center', border: `1px solid rgba(239, 68, 68, 0.2)`,
      }}>
        <img
          src="/icon.png" alt="Scanchain"
          style={{ width: 64, height: 64, borderRadius: '18px', margin: '0 auto 20px', display: 'block', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div style={{
          fontSize: '26px', fontWeight: '800',
          background: 'linear-gradient(90deg, #10B981, #6EE7B7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
        }}>
          Scanchain
        </div>
        <div style={{ fontSize: '44px', marginBottom: '20px' }}>⚠️</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: theme.textPrimary, marginBottom: '12px' }}>
          Invalid QR Code
        </div>
        <div style={{ fontSize: '14px', color: theme.textMuted, lineHeight: '1.7' }}>
          {message}
        </div>
        <div style={{
          marginTop: '28px', padding: '14px 20px',
          backgroundColor: theme.bgSurface, borderRadius: '12px',
          fontSize: '13px', color: theme.textDisabled,
        }}>
          Scan a valid Scanchain batch QR code to view batch details.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get('data');

  if (!encodedData) {
    return <ErrorPage message="No batch data found. Please scan a valid Scanchain QR code." />;
  }

  let data = null;
  try {
    data = JSON.parse(decodeURIComponent(encodedData));
  } catch {
    return <ErrorPage message="Invalid or corrupted QR code data. Please scan again." />;
  }

  return <BatchPassport data={data} />;
}
