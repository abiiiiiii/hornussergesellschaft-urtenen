// Shim process.versions.node if running on Node 24 < 24.15.0 where Angular CLI 22 requires minimum 24.15.0.
const [major, minor] = process.versions.node.split('.').map(Number);
if (major === 24 && minor < 15) {
  try {
    Object.defineProperty(process.versions, 'node', { value: '24.15.0', configurable: true, writable: true });
    Object.defineProperty(process, 'version', { value: 'v24.15.0', configurable: true, writable: true });
  } catch (_) {}
}
