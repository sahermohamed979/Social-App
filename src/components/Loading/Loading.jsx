export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* App Logo */}
      <div className="mb-6 sm:mb-8">
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
            S
          </span>
        </div>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full animate-bounce"></div>
      </div>

      {/* Loading text */}
      <p className="mt-4 text-gray-500 text-sm sm:text-base">Loading...</p>
    </div>
  );
}
