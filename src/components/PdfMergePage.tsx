import { useState } from 'react'
import MergeWorkView from './MergeWorkView'
import type { MergeMode } from '../hooks/usePdfMerger'

type MergeView = 'select' | MergeMode

interface Props {
  onBack: () => void
}

export default function PdfMergePage({ onBack }: Props) {
  const [view, setView] = useState<MergeView>('select')

  if (view !== 'select') {
    return <MergeWorkView mode={view} onBack={() => setView('select')} />
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-50 to-blue-50/50 dark:from-[#1e2540] dark:via-[#2a3050] dark:to-[#1e2540] dark:bg-none py-10 px-4 transition-colors duration-200">
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
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PDF 병합</h1>
          <p className="mt-1 text-gray-500 dark:text-slate-400 text-sm">원하는 병합 방식을 선택하세요</p>
        </div>

        {/* 기능 선택 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* 첫 페이지 추출 병합 카드 */}
          <button
            onClick={() => setView('first-page')}
            className="text-left p-6 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 hover:border-blue-400/50 dark:hover:border-blue-400/40 dark:hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mb-4 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">첫 페이지 추출 병합</h2>
            <p className="text-sm text-gray-500 dark:text-slate-300">
              여러 PDF에서 첫 번째 페이지만 추출하여 하나의 PDF로 병합합니다
            </p>
          </button>

          {/* 전체 페이지 병합 카드 */}
          <button
            onClick={() => setView('all-pages')}
            className="text-left p-6 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 hover:border-blue-400/50 dark:hover:border-blue-400/40 dark:hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mb-4 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">전체 페이지 병합</h2>
            <p className="text-sm text-gray-500 dark:text-slate-300">
              여러 PDF의 모든 페이지를 순서대로 하나의 PDF로 병합합니다
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
