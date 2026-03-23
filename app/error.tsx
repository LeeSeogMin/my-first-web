"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <h2 className="text-2xl font-bold text-red-600">문제가 발생했습니다</h2>
      <p className="mt-2 text-gray-600">잠시 후 다시 시도해주세요</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
