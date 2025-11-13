import { useState, useRef } from 'react';
import './IconManager.css';

const IconManager = ({ 
  isOpen, 
  onClose, 
  icons, 
  onUpload, 
  onDelete, 
  onClearAll, 
  onSelectIcon, 
  selectedIcon,
  assigningTo,
  iconManager
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const resolvedIcons = icons ?? iconManager?.icons ?? {};
  const resolvedUpload = onUpload ?? iconManager?.uploadIcon;
  const resolvedDelete = onDelete ?? iconManager?.deleteIcon;
  const resolvedClearAll = onClearAll ?? iconManager?.clearAllIcons;
  const resolvedSelectedIcon = selectedIcon ?? iconManager?.selectedIcon ?? null;
  const activeAssignment = assigningTo ?? iconManager?.assigningTo ?? null;
  const resolvedSelectIcon =
    onSelectIcon ??
    ((iconId) => {
      iconManager?.setSelectedIcon?.(iconId);
      if (activeAssignment && iconManager?.assignIcon) {
        iconManager.assignIcon(activeAssignment, iconId);
        iconManager.setAssigningTo?.(null);
      }
    });

  const handleFileUpload = async (files) => {
    const fileList = Array.from(files);
    
    for (const file of fileList) {
      if (file.type.startsWith('image/')) {
        try {
          if (!resolvedUpload) {
            throw new Error('Icon upload handler is not available.');
          }
          await resolvedUpload(file);
        } catch (error) {
          console.error('Failed to upload icon:', error);
          alert('Failed to upload ' + file.name + '. Please try again.');
        }
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
    e.target.value = ''; // Reset input
  };

  const handleClearAll = () => {
    if (window.confirm('This will delete all your uploaded icons. Are you sure?')) {
      resolvedClearAll?.();
    }
  };

  const handleDeleteIcon = (iconId, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this icon? It will be removed from any answer choices using it.')) {
      resolvedDelete?.(iconId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="icon-panel-overlay" onClick={onClose}>
      <div className="icon-panel" onClick={(e) => e.stopPropagation()}>
        <div className="icon-panel-header">
          <h3>🎨 Icon Manager</h3>
          <p>Upload and assign icons to answer choices</p>
        </div>
        
        <div className="icon-panel-content">
          <div 
            className={`upload-section ${dragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-icon">📷</div>
            <div className="upload-text">Upload New Icon</div>
            <div className="upload-subtext">
              Click or drag image files here<br/>
              PNG, JPG, GIF supported
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </div>
          
          <div className="icon-library">
            <h4>Your Icon Library</h4>
            <div className="icon-grid">
              {Object.keys(resolvedIcons).length === 0 ? (
                <div className="empty-library">
                  No icons uploaded yet. Upload some images to get started!
                </div>
              ) : (
                Object.entries(resolvedIcons).map(([iconId, iconData]) => (
                  <div 
                    key={iconId}
                    className={`icon-item ${resolvedSelectedIcon === iconId ? 'selected' : ''}`}
                    onClick={() => resolvedSelectIcon?.(iconId)}
                  >
                    <img src={iconData} alt="Icon" />
                    <button 
                      className="icon-delete" 
                      onClick={(e) => handleDeleteIcon(iconId, e)}
                      title="Delete this icon"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="panel-actions">
            <button onClick={onClose} className="btn-primary">
              ✓ Done
            </button>
            <button onClick={handleClearAll} className="btn-warning">
              🗑️ Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconManager;
