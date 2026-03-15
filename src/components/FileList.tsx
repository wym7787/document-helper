import { useRef } from 'react'
import type { PdfFile } from '../types'

interface Props {
  files: PdfFile[]
  onRemove: (id: string) => void
  onReorder: (fromIndex: number, toIndex: number) => void
  mode?: 'first-page' | 'all-pages'
}

export default function FileList({ files, onRemove, onReorder, mode = 'first-page' }: Props) {
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const handleDragStart = (index: number) => {
    dragItem.current = index
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    dragOverItem.current = index
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      onReorder(dragItem.current, dragOverItem.current)
    }
    dragItem.current = null
    dragOverItem.current = null
  }

  if (files.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">
        업로드된 파일 ({files.length}개)
      </h2>
      <ul className="space-y-2">
        {files.map((pdfFile, index) => (
          <li
            key={pdfFile.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            className="flex items-center justify-between bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 shadow-sm hover:shadow dark:hover:border-white/20 cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-sm font-mono text-gray-400 dark:text-slate-500 w-6 text-right shrink-0">
                {index + 1}
              </span>
              {/* 드래그 핸들 */}
              <svg className="w-5 h-5 text-gray-300 dark:text-slate-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" />
              </svg>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-slate-100 truncate">{pdfFile.name}</p>
                <p className="text-xs text-gray-400 dark:text-slate-400">총 {pdfFile.pageCount}페이지 → {mode === 'all-pages' ? '전체 페이지' : '첫 페이지만 추출'}</p>
              </div>
            </div>
            <button
              onClick={() => onRemove(pdfFile.id)}
              className="ml-3 text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
              title="삭제"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
