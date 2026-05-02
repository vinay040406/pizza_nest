export default function Loading() {
  return (
    <div className="h-40 flex flex-col items-center justify-center gap-2">
      <div className="w-10 h-10 border-4 border-prime-1 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-body-text">Preparing your pizza...</p>
    </div>
  );
}
