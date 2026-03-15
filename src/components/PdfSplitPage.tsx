import FileDropZone from './FileDropZone'
import Pagination from './Pagination'
import { usePdfSplitter } from '../hooks/usePdfSplitter'
import { usePagination } from '../hooks/usePagination'

interface Props {
  onBack: () => void
}

export default function PdfSplitPage({ onBack }: Props) {
  const {
    pdfFile,
    splitResult,
    isProcessing,
    error,
    loadFile,
    split,
    downloadPage,
    downloadAllAsZip,
    rangeStart,
    rangeEnd,
    rangeResult,
    setRangeStart,
    setRangeEnd,
    splitRange,
    downloadRange,
    clear,
  } = usePdfSplitter()

  const rangePageCount = rangeEnd - rangeStart + 1
  const isRangeValid = pdfFile != null &&
    rangeStart >= 1 &&
    rangeEnd >= rangeStart &&
    rangeEnd <= pdfFile.pageCount

  const { currentPage, totalPages, startIndex, endIndex, goToPage } = usePagination({
    totalItems: splitResult.length,
  })

  const paginatedResult = splitResult.slice(startIndex, endIndex)

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PDF 분리</h1>
          <p className="mt-1 text-gray-500 dark:text-slate-400 text-sm">
            PDF 파일을 페이지별로 분리하여 개별 파일로 다운로드합니다
          </p>
        </div>

        {/* 파일 업로드 영역 */}
        {!pdfFile && <FileDropZone onFiles={loadFile} multiple={false} />}

        {/* 업로드된 파일 정보 */}
        {pdfFile && splitResult.length === 0 && !rangeResult && (
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{pdfFile.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{pdfFile.pageCount}페이지</p>
              </div>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 분리하기 / 구간 분리 / 초기화 버튼 */}
        {pdfFile && splitResult.length === 0 && !rangeResult && (
          <div className="mt-6 space-y-4">
            {/* 전체 분리 */}
            <div className="flex gap-3">
              <button
                onClick={split}
                disabled={isProcessing}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-gray-300 dark:disabled:bg-slate-700 dark:disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? '분리 중...' : `전체 분리 (${pdfFile.pageCount}페이지)`}
              </button>
            </div>

            {/* 구간 분리 */}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">구간 분리</h3>
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm text-gray-600 dark:text-slate-300">시작</label>
                <input
                  type="number"
                  min={1}
                  max={pdfFile.pageCount}
                  value={rangeStart}
                  onChange={e => setRangeStart(Number(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-center bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500 dark:text-slate-400">~</span>
                <label className="text-sm text-gray-600 dark:text-slate-300">끝</label>
                <input
                  type="number"
                  min={1}
                  max={pdfFile.pageCount}
                  value={rangeEnd}
                  onChange={e => setRangeEnd(Number(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-center bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500 dark:text-slate-400">페이지</span>
              </div>
              {!isRangeValid && (
                <p className="text-xs text-red-500 dark:text-red-400 mb-3">
                  유효한 페이지 범위를 입력하세요 (1 ~ {pdfFile.pageCount})
                </p>
              )}
              <button
                onClick={splitRange}
                disabled={isProcessing || !isRangeValid}
                className="w-full bg-indigo-600 text-white py-2.5 px-6 rounded-lg font-medium text-sm hover:bg-indigo-700 dark:hover:bg-indigo-500 disabled:bg-gray-300 dark:disabled:bg-slate-700 dark:disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? '분리 중...' : `구간 분리하기 (${isRangeValid ? rangePageCount : '-'}페이지)`}
              </button>
            </div>

            {/* 초기화 */}
            <button
              onClick={clear}
              className="w-full px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              초기화
            </button>
          </div>
        )}

        {/* 구간 분리 결과 */}
        {rangeResult && pdfFile && (
          <div className="mt-6">
            <button
              onClick={downloadRange}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg mb-4"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {pdfFile.name.replace(/\.pdf$/i, '')}_pages_{rangeStart}-{rangeEnd}.pdf 다운로드
              </span>
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-slate-400 mb-4">
              {rangeStart}~{rangeEnd}페이지 ({rangePageCount}페이지) 추출 완료
            </p>
            <button
              onClick={clear}
              className="w-full px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              새 파일로 다시 시작
            </button>
          </div>
        )}

        {/* 분리 결과 */}
        {splitResult.length > 0 && (
          <div className="mt-6">
            {/* ZIP 다운로드 버튼 */}
            <button
              onClick={downloadAllAsZip}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg mb-4"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                전체 ZIP 다운로드 ({splitResult.length}페이지)
              </span>
            </button>

            {/* 개별 페이지 목록 */}
            <div className="space-y-2">
              {paginatedResult.map((page) => (
                <div
                  key={page.pageNumber}
                  className="flex items-center justify-between bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm font-semibold">
                      {page.pageNumber}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-slate-300">
                      페이지 {page.pageNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => downloadPage(page.pageNumber)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    다운로드
                  </button>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

            {/* 초기화 버튼 */}
            <button
              onClick={clear}
              className="w-full mt-4 px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              새 파일로 다시 시작
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
