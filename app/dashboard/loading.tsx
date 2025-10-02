export default function loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur z-50">
      <span className="inline-block size-8 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
    </div>
  );
}
