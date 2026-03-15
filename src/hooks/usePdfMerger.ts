import { useState, useCallback } from 'react'
import type { PdfFile } from '../types'
import { getPageCount, mergeFirstPages, mergeAllPages, downloadPdf } from '../utils/pdfUtils'

export type MergeMode = 'first-page' | 'all-pages'

export function usePdfMerger(mode: MergeMode = 'first-page') {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 파일 추가
  const addFiles = useCallback(async (files: FileList | File[]) => {
    setError(null)
    const newFiles: PdfFile[] = []

    for (const file of Array.from(files)) {
      if (file.type !== 'application/pdf') {
        setError(`"${file.name}"은(는) PDF 파일이 아닙니다.`)
        continue
      }
      try {
        const pageCount = await getPageCount(file)
        newFiles.push({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          pageCount,
        })
      } catch {
        setError(`"${file.name}" 읽기에 실패했습니다.`)
      }
    }

    setPdfFiles(prev => [...prev, ...newFiles])
  }, [])

  // 파일 삭제
  const removeFile = useCallback((id: string) => {
    setPdfFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  // 파일 순서 변경
  const reorderFiles = useCallback((fromIndex: number, toIndex: number) => {
    setPdfFiles(prev => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [])

  // 병합 후 다운로드
  const mergeAndDownload = useCallback(async () => {
    if (pdfFiles.length < 2) return
    setIsProcessing(true)
    setError(null)

    try {
      const bytes = mode === 'all-pages'
        ? await mergeAllPages(pdfFiles)
        : await mergeFirstPages(pdfFiles)
      const filename = mode === 'all-pages' ? 'merged_all_pages.pdf' : 'merged_first_pages.pdf'
      downloadPdf(bytes, filename)
    } catch {
      setError('PDF 병합 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }, [pdfFiles])

  // 전체 초기화
  const clearAll = useCallback(() => {
    setPdfFiles([])
    setError(null)
  }, [])

  return {
    pdfFiles,
    isProcessing,
    error,
    addFiles,
    removeFile,
    reorderFiles,
    mergeAndDownload,
    clearAll,
  }
}
