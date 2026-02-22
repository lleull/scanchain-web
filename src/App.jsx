import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function BatchPassport() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedData = queryParams.get('data');

  let batchData = null;
  let error = null;

  if (encodedData) {
    try {
      batchData = JSON.parse(decodeURIComponent(encodedData));
    } catch (err) {
      error = 'Invalid or corrupted QR code data. Please scan again.';
    }
  } else {
    error = 'No batch data found. Please use a valid Scanchain QR code.';
  }

  if (error) {
    return (
      <div style={styles.errorPage}>
        <div style={styles.errorCard}>
          <h1 style={styles.logo}>Scanchain</h1>
          <h2 style={styles.errorTitle}>Oops!</h2>
          <p style={styles.errorText}>{error}</p>
          <p style={styles.hint}>Scan a valid batch QR code to view details.</p>
        </div>
      </div>
    );
  }

  if (!batchData) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingSpinner}>Loading batch passport...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.mainTitle}>Scanchain</h1>
        <h2 style={styles.subtitle}>Batch Passport</h2>

        {batchData.photoUrl ? (
          <div style={styles.photoContainer}>
            <img
              src={batchData.photoUrl}
              alt="Batch Produce"
              style={styles.photo}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Photo';
                e.target.alt = 'Photo not available';
              }}
            />
          </div>
        ) : (
          <div style={styles.noPhoto}>No photo available for this batch</div>
        )}

        <div style={styles.details}>
          <DetailItem label="Batch ID" value={batchData.id} />
          <DetailItem label="Gross Weight" value={`${batchData.grossWeight || '—'} kg`} />
          <DetailItem label="Net Weight" value={`${batchData.netWeight || '—'} kg`} />
          <DetailItem label="Status" value={batchData.status || 'Unknown'} />
          <DetailItem label="Farmer" value={batchData.farmerName || '—'} />
        </div>

        <div style={styles.footer}>
          Powered by Scanchain • Secure Batch Tracking
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div style={styles.detailRow}>
      <span style={styles.label}>{label}:</span>
      <span style={styles.value}>{value}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #533903 0%, #0A2B5C 50%, #0F4C75 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '32px 24px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    textAlign: 'center',
    color: 'white',
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: 800,
    margin: '0 0 8px 0',
    letterSpacing: '-1px',
    background: 'linear-gradient(90deg, #FCA311, #FFD166)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 500,
    margin: '0 0 24px 0',
    color: '#A0D2FF',
  },
  photoContainer: {
    marginBottom: '28px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 25px rgba(0,0,0,0.35)',
  },
  photo: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  noPhoto: {
    height: '180px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#A0B0C0',
    marginBottom: '28px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '12px',
    fontSize: '16px',
  },
  label: {
    fontWeight: 600,
    color: '#D0E0FF',
  },
  value: {
    fontWeight: 500,
    color: '#FFFFFF',
  },
  footer: {
    fontSize: '13px',
    color: '#8AA8D8',
    marginTop: '20px',
    opacity: 0.8,
  },

  // Error & Loading
  errorPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4A0000 0%, #6B0000 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  errorCard: {
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '420px',
    textAlign: 'center',
    color: '#FFDDDD',
    border: '1px solid #FF4444',
  },
  errorTitle: {
    fontSize: '28px',
    margin: '16px 0',
  },
  errorText: {
    fontSize: '16px',
    marginBottom: '12px',
  },
  hint: {
    fontSize: '14px',
    opacity: 0.9,
  },
  loadingPage: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A0D2FF',
    fontSize: '18px',
  },
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/batch" element={<BatchPassport />} />
        <Route path="*" element={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: '#001F3F', 
            color: 'white' 
          }}>
            404 - Page Not Found
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;