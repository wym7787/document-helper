import Header from './components/Header'
import FileDropZone from './components/FileDropZone'
import FileList from './components/FileList'
import { usePdfMerger } from './hooks/usePdfMerger'

function App() {
  const {
    pdfFiles,
    isProcessing,
    error,
    addFiles,
    removeFile,
    reorderFiles,
    mergeAndDownload,
    clearAll,
  } = usePdfMerger()

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <FileDropZone onFiles={addFiles} />
        <FileList
          files={pdfFiles}
          onRemove={removeFile}
          onReorder={reorderFiles}
        />

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {pdfFiles.length > 0 && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={mergeAndDownload}
              disabled={pdfFiles.length < 2 || isProcessing}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? '병합 중...' : `첫 페이지 병합 (${pdfFiles.length}개 파일)`}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              초기화
            </button>
          </div>
        )}

        {pdfFiles.length === 1 && (
          <p className="mt-3 text-sm text-gray-500 text-center">
            2개 이상의 파일을 추가하면 병합할 수 있습니다
          </p>
        )}
      </div>
    </div>
  )
}

export default App
