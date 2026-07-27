import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Eye, RefreshCw, Trash2, AlertCircle, X, FileText } from 'lucide-react';
import './DocumentUploader.css';

export default function DocumentUploader({ label, required = true, onFileChange }) {
  const fileInputRef = useRef(null);
  const [fileData, setFileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // File type validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    const validExts = ['jpg', 'jpeg', 'png', 'pdf'];

    if (!validTypes.includes(selectedFile.type) && !validExts.includes(ext)) {
      setErrorMessage('Please upload a valid PDF/JPG/PNG file.');
      return;
    }

    // Size validation (Max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    setErrorMessage('');

    // Format file size
    const sizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
    const formattedSize = selectedFile.size < 1024 * 1024 
      ? (selectedFile.size / 1024).toFixed(0) + ' KB'
      : sizeInMB + ' MB';

    // Create object URL for preview
    const previewUrl = URL.createObjectURL(selectedFile);

    const fileObj = {
      name: selectedFile.name,
      size: formattedSize,
      type: selectedFile.type,
      url: previewUrl,
      raw: selectedFile
    };

    setFileData(fileObj);
    if (onFileChange) onFileChange(fileObj);
  };

  const handleRemove = () => {
    if (fileData?.url) URL.revokeObjectURL(fileData.url);
    setFileData(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onFileChange) onFileChange(null);
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="doc-uploader-container">
      <label className="doc-label">
        {label} {required && <span className="required">*</span>}
      </label>

      {/* Hidden Native Device File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/jpeg,image/png,image/jpg,application/pdf"
        onChange={handleFileSelect}
      />

      {/* Error Banner */}
      {errorMessage && (
        <div className="upload-error-banner">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Before Upload UI State */}
      {!fileData ? (
        <div className="file-upload-box" onClick={handleTriggerUpload}>
          <UploadCloud size={28} color="#6B7280" />
          <span className="file-upload-title">Upload {label}</span>
          <span className="file-upload-subtitle">Tap to select PDF, JPG, or PNG from device</span>
        </div>
      ) : (
        /* Uploaded Successfully UI State */
        <div className="uploaded-success-card">
          <div className="uploaded-header">
            <div className="success-badge-line">
              <CheckCircle2 size={18} color="#059669" />
              <strong>{label} Uploaded Successfully</strong>
            </div>
            <span className="file-name-text">{fileData.name} ({fileData.size})</span>
          </div>

          {/* Action Options: View, Replace, Remove */}
          <div className="upload-actions-row">
            <button type="button" className="btn-doc-action view" onClick={() => setShowPreviewModal(true)}>
              <Eye size={14} /> View
            </button>
            <button type="button" className="btn-doc-action replace" onClick={handleTriggerUpload}>
              <RefreshCw size={14} /> Replace
            </button>
            <button type="button" className="btn-doc-action remove" onClick={handleRemove}>
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {showPreviewModal && fileData && (
        <div className="preview-modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="preview-modal-content" onClick={e => e.stopPropagation()}>
            <div className="preview-header">
              <h3>{fileData.name}</h3>
              <button type="button" className="close-btn" onClick={() => setShowPreviewModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="preview-body">
              {fileData.type.includes('image') ? (
                <img src={fileData.url} alt="Document Preview" className="img-preview" />
              ) : (
                <div className="pdf-preview-box">
                  <FileText size={48} color="#D31245" />
                  <p>{fileData.name}</p>
                  <span>PDF Document Ready ({fileData.size})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
