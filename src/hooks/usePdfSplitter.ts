import { useState, useCallback } from 'react'
import type { PdfFile } from '../types'
import { getPageCount, splitPages, splitPageRange, downloadPdf, downloadPagesAsZip } from '../utils/pdfUtils'

interface SplitPage {
  pageNumber: number
  bytes: Uint8Array
}

export function usePdfSplitter() {
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null)
  const [splitResult, setSplitResult] = useState<SplitPage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rangeStart, setRangeStart] = useState(1)
  const [rangeEnd, setRangeEnd] = useState(1)
  const [rangeResult, setRangeResult] = useState<Uint8Array | null>(null)

  // 파일 로드
  const loadFile = useCallback(async (files: FileList | File[]) => {
    setError(null)
    setSplitResult([])

    const file = Array.from(files)[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError(`"${file.name}"은(는) PDF 파일이 아닙니다.`)
      return
    }

    try {
      const pageCount = await getPageCount(file)
      setPdfFile({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        pageCount,
      })
      setRangeStart(1)
      setRangeEnd(pageCount)
    } catch {
      setError(`"${file.name}" 읽기에 실패했습니다.`)
    }
  }, [])

  // 페이지 분리 실행
  const split = useCallback(async () => {
    if (!pdfFile) return
    setIsProcessing(true)
    setError(null)

    try {
      const pages = await splitPages(pdfFile.file)
      setSplitResult(pages)
    } catch {
      setError('PDF 분리 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }, [pdfFile])

  // 개별 페이지 다운로드
  const downloadPage = useCallback((pageNumber: number) => {
    const page = splitResult.find(p => p.pageNumber === pageNumber)
    if (!page || !pdfFile) return
    const baseName = pdfFile.name.replace(/\.pdf$/i, '')
    downloadPdf(page.bytes, `${baseName}_page_${pageNumber}.pdf`)
  }, [splitResult, pdfFile])

  // 전체 ZIP 다운로드
  const downloadAllAsZip = useCallback(async () => {
    if (splitResult.length === 0 || !pdfFile) return
    await downloadPagesAsZip(splitResult, pdfFile.name)
  }, [splitResult, pdfFile])

  // 구간 분리 실행
  const splitRange = useCallback(async () => {
    if (!pdfFile) return
    setIsProcessing(true)
    setError(null)
    setSplitResult([])

    try {
      const bytes = await splitPageRange(pdfFile.file, rangeStart, rangeEnd)
      setRangeResult(bytes)
    } catch {
      setError('PDF 구간 분리 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }, [pdfFile, rangeStart, rangeEnd])

  // 구간 분리 결과 다운로드
  const downloadRange = useCallback(() => {
    if (!rangeResult || !pdfFile) return
    const baseName = pdfFile.name.replace(/\.pdf$/i, '')
    downloadPdf(rangeResult, `${baseName}_pages_${rangeStart}-${rangeEnd}.pdf`)
  }, [rangeResult, pdfFile, rangeStart, rangeEnd])

  // 초기화
  const clear = useCallback(() => {
    setPdfFile(null)
    setSplitResult([])
    setRangeResult(null)
    setRangeStart(1)
    setRangeEnd(1)
    setError(null)
  }, [])

  return {
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
  }
}
