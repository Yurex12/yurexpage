export default function Profile() {
  return (
    <div className="min-h-screen">
      {/* Big header */}
      <div className="flex h-60 flex-col items-center justify-end bg-blue-500 pb-6">
        <div className="text-3xl font-bold text-white">John Doe</div>
      </div>

      {/* Sticky bar */}
      <div className="sticky top-0 z-10 bg-white shadow">
        <div className="flex h-12 items-center justify-center">
          {/* This username appears only after scrolling past header */}
          <span className="sticky-username opacity-0 transition-opacity duration-300">
            John Doe
          </span>
        </div>
      </div>

      {/* Page content */}
      <div className="space-y-4 p-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="h-20 rounded bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
