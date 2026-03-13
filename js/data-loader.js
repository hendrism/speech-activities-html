// DataLoader — reads from window.ActivityData populated by /data/*.js files.
// Works with plain file:// URLs (no fetch needed).
//
// Usage:
//   DataLoader.get('fluency')              → full data object
//   DataLoader.get('fluency', 'starters')  → starters array
//   DataLoader.filter('fluency', 'starters', s => s.sourceFile.includes('spring'))

const DataLoader = (function () {
  function get(category, key) {
    const data = window.ActivityData && window.ActivityData[category];
    if (!data) {
      console.error(`DataLoader: "${category}" not loaded. Include /data/${category}.js before this script.`);
      return key ? [] : null;
    }
    return key !== undefined ? (data[key] || []) : data;
  }

  function filter(category, key, fn) {
    return get(category, key).filter(fn);
  }

  return { get, filter };
})();
