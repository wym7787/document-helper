import FileDropZone from './FileDropZone'
import FileList from './FileList'
import { usePdfMerger } from '../hooks/usePdfMerger'
import type { MergeMode } from '../hooks/usePdfMerger'

interface Props {
  mode: MergeMode
  onBack: () => void
}

export default function MergeWorkView({ mode, onBack }: Props) {
  const {
    pdfFiles,
    isProcessing,
    error,
    addFiles,
    removeFile,
    reorderFiles,
    mergeAndDownload,
    clearAll,
  } = usePdfMerger(mode)

  const title = mode === 'all-pages' ? 'PDF 전체 페이지 병합' : 'PDF 첫 페이지 추출 병합'
  const description = mode === 'all-pages'
    ? '여러 PDF의 모든 페이지를 순서대로 하나의 PDF로 병합합니다'
    : '여러 PDF의 첫 번째 페이지만 추출하여 하나의 PDF로 병합합니다'
  const mergeButtonLabel = mode === 'all-pages' ? '전체 페이지 병합' : '첫 페이지 병합'

  return (
    <div className="flex-1 bg-[#f8fafc] dark:bg-[#1e2540] py-10 px-4 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white/10 text-white dark:text-white/80 text-sm font-semibold shadow-md hover:shadow-lg hover:bg-gray-700 dark:hover:bg-white/20 active:scale-95 transition-all duration-150"
        >
          <svg className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          뒤로가기
        </button>

        {/* 페이지 타이틀 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="mt-1 text-gray-500 dark:text-slate-400 text-sm">{description}</p>
        </div>

        {/* 파일 드롭존 */}
        <FileDropZone onFiles={addFiles} />

        {/* 파일 목록 */}
        <FileList
          files={pdfFiles}
          onRemove={removeFile}
          onReorder={reorderFiles}
          mode={mode}
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
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-gray-300 dark:disabled:bg-slate-700 dark:disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? '병합 중...' : `${mergeButtonLabel} (${pdfFiles.length}개 파일)`}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              초기화
            </button>
          </div>
        )}

        {pdfFiles.length === 1 && (
          <p className="mt-3 text-sm text-gray-500 dark:text-slate-400 text-center">
            2개 이상의 파일을 추가하면 병합할 수 있습니다
          </p>
        )}
      </div>
    </div>
  )
}
