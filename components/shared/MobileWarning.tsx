export function MobileWarning() {
  return (
    <div className="min-[854px]:hidden bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="text-yellow-600 text-lg">📱</div>
        <div>
          <h3 className="font-semibold text-yellow-800 text-sm">Mobile View</h3>
          <p className="text-yellow-700 text-xs mt-1">
            For full drag-and-drop functionality, please use a desktop device or rotate to landscape mode.
          </p>
        </div>
      </div>
    </div>
  );
}