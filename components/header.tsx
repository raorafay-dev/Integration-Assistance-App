export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">SAP Integration Mapping Assistant</h1>
            <p className="mt-1 text-sm text-slate-500">
              Automate your SAP field mapping with AI
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Upload your integration specification and let AI map fields to SAP technical names and tables
        </p>
      </div>
    </header>
  )
}
