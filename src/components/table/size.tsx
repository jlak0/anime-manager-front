export default function Size({ s }) {
  if (s < 1024) return <p>{s} B</p>;
  if (s < 1024 * 1024) return <p>{(s / 1024).toFixed(2)} KB</p>;
  if (s < 1024 * 1024 * 1024) return <p>{(s / 1024 / 1024).toFixed(2)} MB</p>;
  return <p>{(s / 1024 / 1024 / 1024).toFixed(2)} GB</p>;
}
