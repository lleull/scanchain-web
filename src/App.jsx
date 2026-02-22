import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function BatchPassport() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedData = queryParams.get('data');

  let batchData = {};
  try {
    batchData = JSON.parse(decodeURIComponent(encodedData));  // Decode and parse the QR-encoded JSON data
  } catch (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>Invalid Batch Data</h2>
        <p>Please scan a valid Scanchain QR code.</p>
      </div>
    );  // Simple error handling
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Scanchain Batch Passport</h1>
      {batchData.photoUrl && (
        <img src={batchData.photoUrl} alt="Batch Produce" style={styles.photo} />
      )}
      <div style={styles.infoSection}>
        <p><strong>Batch ID:</strong> {batchData.id}</p>
        <p><strong>Gross Weight:</strong> {batchData.grossWeight} kg</p>
        <p><strong>Net Weight:</strong> {batchData.netWeight} kg</p>
        <p><strong>Status:</strong> {batchData.status}</p>
        <p><strong>Farmer Name:</strong> {batchData.farmerName}</p>
        {/* Add more fields if your QR data includes them */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#001F3F',  // Your dark blue theme
    color: 'white',
    borderRadius: '10px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  photo: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  infoSection: {
    textAlign: 'left',
  },
  errorContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    borderRadius: '10px',
    textAlign: 'center',
  },
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/batch" element={<BatchPassport />} />
        {/* You can add a home route or error page if needed */}
        <Route path="*" element={<div>404 - Invalid Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;