// Activity Storage Utilities

export const exportActivities = () => {
  const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');

  if (activities.length === 0) {
    alert('No activities to export');
    return;
  }

  const dataStr = JSON.stringify(activities, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `speech-therapy-activities-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

export const importActivities = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedActivities = JSON.parse(e.target.result);

        // Validate the data structure
        if (!Array.isArray(importedActivities)) {
          throw new Error('Invalid file format');
        }

        // Get existing activities
        const existingActivities = JSON.parse(localStorage.getItem('customActivities') || '[]');

        // Merge activities (avoid duplicates by checking IDs)
        const existingIds = new Set(existingActivities.map(a => a.id));
        const newActivities = importedActivities.filter(a => !existingIds.has(a.id));

        const mergedActivities = [...existingActivities, ...newActivities];

        // Save to localStorage
        localStorage.setItem('customActivities', JSON.stringify(mergedActivities));

        resolve({
          imported: newActivities.length,
          total: mergedActivities.length,
          skipped: importedActivities.length - newActivities.length
        });
      } catch (error) {
        reject(new Error('Failed to parse activity file: ' + error.message));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const backupActivities = () => {
  const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');

  // Create a more comprehensive backup with metadata
  const backup = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    activities: activities,
    stats: {
      totalActivities: activities.length,
      activityTypes: [...new Set(activities.map(a => a.type))],
      createdRange: activities.length > 0 ? {
        oldest: Math.min(...activities.map(a => new Date(a.createdAt).getTime())),
        newest: Math.max(...activities.map(a => new Date(a.createdAt).getTime()))
      } : null
    }
  };

  const dataStr = JSON.stringify(backup, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `speech-therapy-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

export const restoreFromBackup = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);

        // Validate backup structure
        if (!backup.activities || !Array.isArray(backup.activities)) {
          throw new Error('Invalid backup file format');
        }

        // Restore activities
        localStorage.setItem('customActivities', JSON.stringify(backup.activities));

        resolve({
          restored: backup.activities.length,
          backupDate: backup.exportDate,
          version: backup.version
        });
      } catch (error) {
        reject(new Error('Failed to restore backup: ' + error.message));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read backup file'));
    reader.readAsText(file);
  });
};