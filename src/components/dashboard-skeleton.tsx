export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Skeleton */}
      <aside className="w-80 bg-slate-900 p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 bg-slate-700 rounded w-32 animate-pulse" />
          <div className="h-4 bg-slate-800 rounded w-40 animate-pulse" />
        </div>

        {/* Panel Button */}
        <div className="h-10 bg-slate-800 rounded-lg animate-pulse" />

        {/* Obiekty Section */}
        <div className="space-y-3">
          <div className="h-4 bg-slate-800 rounded w-20 animate-pulse" />
          
          {/* Property Items */}
          <div className="h-12 bg-slate-800 rounded-lg animate-pulse animate-delay-100" />
          <div className="h-12 bg-slate-800 rounded-lg animate-pulse animate-delay-200" />
          <div className="h-12 bg-slate-800 rounded-lg animate-pulse animate-delay-300" />
        </div>

        {/* Wyloguj */}
        <div className="h-10 bg-slate-800 rounded-lg animate-pulse" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />

        {/* Calendar Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-10 bg-blue-100 rounded-lg w-40 animate-pulse" />
          </div>

          {/* Calendar Header */}
          <div className="flex items-center justify-between py-4">
            <div className="size-8 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="size-8 bg-gray-100 rounded animate-pulse" />
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            <div className="h-10 bg-blue-50 rounded" />
            <div className="h-10 bg-blue-50 rounded" />
            <div className="h-10 bg-blue-50 rounded" />
            <div className="h-10 bg-blue-50 rounded" />
            <div className="h-10 bg-blue-50 rounded" />
            <div className="h-10 bg-blue-50 rounded" />
            <div className="h-10 bg-blue-50 rounded" />
            
            {/* Calendar Days - 5 weeks */}
            <div className="h-16 bg-gray-50 rounded animate-pulse" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[20ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[40ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[60ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[80ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[100ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[120ms]" />
            
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[140ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[160ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[180ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[200ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[220ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[240ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[260ms]" />
            
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[280ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[300ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[320ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[340ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[360ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[380ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[400ms]" />
            
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[420ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[440ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[460ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[480ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[500ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[520ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[540ms]" />
            
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[560ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[580ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[600ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[620ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[640ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[660ms]" />
            <div className="h-16 bg-gray-50 rounded animate-pulse animate-delay-[680ms]" />
          </div>
        </div>

        {/* Reservations Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />

          {/* Reservation Items */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="size-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-48 animate-pulse" />
            </div>
            <div className="h-8 bg-green-100 rounded-full w-28 animate-pulse" />
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl animate-delay-100">
            <div className="size-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-48 animate-pulse" />
            </div>
            <div className="h-8 bg-yellow-100 rounded-full w-28 animate-pulse" />
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl animate-delay-200">
            <div className="size-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-48 animate-pulse" />
            </div>
            <div className="h-8 bg-green-100 rounded-full w-28 animate-pulse" />
          </div>
        </div>

        {/* Gallery Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
            <div className="h-10 bg-blue-100 rounded-lg w-32 animate-pulse" />
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-50 rounded w-1/2 animate-pulse" />
            </div>

            <div className="space-y-2 animate-delay-100">
              <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-50 rounded w-1/2 animate-pulse" />
            </div>

            <div className="space-y-2 animate-delay-200">
              <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-50 rounded w-1/2 animate-pulse" />
            </div>

            <div className="space-y-2 animate-delay-300">
              <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-50 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}