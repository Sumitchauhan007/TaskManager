import React, { useRef, useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';
import { LuPaperclip, LuUpload, LuFileText, LuLink } from 'react-icons/lu';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const fileInputRef = useRef(null);
  const [urlInput, setUrlInput]   = useState('');
  const [uploading, setUploading] = useState(false);
  const [mode, setMode]           = useState('file'); // 'file' | 'url'

  /* ── File upload ── */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // reset so the same file can be re-selected
    e.target.value = '';

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post(
        API_PATHS.IMAGE.UPLOAD_ATTACHMENT,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const { fileUrl } = response.data;
      // store as plain URL string — compatible with Task model's attachments: [String]
      setAttachments([...attachments, fileUrl]);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  /* ── URL add ── */
  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setAttachments([...attachments, trimmed]);
    setUrlInput('');
  };

  /* ── Remove ── */
  const handleRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  /* ── Derive display items regardless of shape (string | {name,url}) ── */
  const getItem = (item) =>
    typeof item === 'string'
      ? { name: item.split('/').pop() || item, url: item }
      : item;

  return (
    <div className="mt-2">
      {/* Attachment list */}
      {attachments.length > 0 && (
        <ul className="flex flex-col gap-2 mb-3">
          {attachments.map((raw, index) => {
            const item = getItem(raw);
            return (
              <li
                key={index}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <LuFileText className="flex-shrink-0 text-sm" style={{ color: '#5200FF' }} />
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs truncate hover:underline"
                    style={{ color: 'var(--text-1)' }}
                    title={item.url}
                  >
                    {item.name}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="flex-shrink-0 transition-colors"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
                >
                  <HiOutlineTrash className="text-base" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Mode toggle */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode('file')}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
          style={mode === 'file'
            ? { background: 'rgba(82,0,255,0.18)', border: '1px solid rgba(82,0,255,0.40)', color: '#5200FF' }
            : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
        >
          <LuUpload className="text-sm" /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
          style={mode === 'url'
            ? { background: 'rgba(82,0,255,0.18)', border: '1px solid rgba(82,0,255,0.40)', color: '#5200FF' }
            : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
        >
          <LuLink className="text-sm" /> Paste URL
        </button>
      </div>

      {/* File picker mode */}
      {mode === 'file' && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-medium transition-all"
            style={{
              background: uploading ? 'var(--surface)' : 'rgba(82,0,255,0.07)',
              border: '1.5px dashed rgba(82,0,255,0.32)',
              color: uploading ? 'var(--text-3)' : '#5200FF',
              cursor: uploading ? 'not-allowed' : 'pointer',
            }}
          >
            {uploading ? (
              <>
                <span
                  className="inline-block w-4 h-4 rounded-full border-2 animate-spin flex-shrink-0"
                  style={{ borderColor: 'rgba(82,0,255,0.25)', borderTopColor: '#5200FF' }}
                />
                Uploading…
              </>
            ) : (
              <>
                <LuPaperclip className="text-base" />
                Click to browse &amp; upload file
              </>
            )}
          </button>
          <p className="text-[10px] mt-1.5" style={{ color: 'var(--text-3)' }}>
            PDF, Word, Excel, images and more — any file type accepted
          </p>
        </>
      )}

      {/* URL mode */}
      {mode === 'url' && (
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2.5 rounded-xl px-3"
            style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)' }}
          >
            <LuLink className="text-sm flex-shrink-0" style={{ color: 'var(--text-3)' }} />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
              placeholder="https://example.com/file.pdf"
              className="w-full text-[13px] outline-none bg-transparent py-2.5"
              style={{ color: 'var(--text-1)' }}
            />
          </div>
          <button
            type="button"
            className="card-btn text-nowrap"
            onClick={handleAddUrl}
          >
            <HiMiniPlus className="text-lg" /> Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAttachmentsInput;
