import FileDropZone from './FileDropZone'
import FileList from './FileList'
import { usePdfMerger } from '../hooks/usePdfMerger'

export default function PdfMergePage() {
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
    <div className="flex-1 bg-[#f8fafc] dark:bg-gray-900 py-10 px-4 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        {/* 페이지 타이틀 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PDF 첫 페이지 병합</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            여러 PDF의 첫 번째 페이지만 추출하여 하나의 PDF로 병합합니다
          </p>
        </div>

        {/* 파일 드롭존 */}
        <FileDropZone onFiles={addFiles} />

        {/* 파일 목록 */}
        <FileList
          files={pdfFiles}
          onRemove={removeFile}
          onReorder={reorderFiles}
        />

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 액션 버튼 */}
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
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              초기화
            </button>
          </div>
        )}

        {pdfFiles.length === 1 && (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            2개 이상의 파일을 추가하면 병합할 수 있습니다
          </p>
        )}
      </div>
    </div>
  )
}
