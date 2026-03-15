import { useState, useMemo, useCallback, useEffect } from 'react'

interface UsePaginationOptions {
  totalItems: number
  itemsPerPage?: number
}

export function usePagination({ totalItems, itemsPerPage = 10 }: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // 아이템 수 변경 시 currentPage 자동 보정
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalItems, totalPages, currentPage])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const goToFirst = useCallback(() => setCurrentPage(1), [])
  const goToLast = useCallback(() => setCurrentPage(totalPages), [totalPages])
  const goToPrev = useCallback(() => setCurrentPage((p) => Math.max(1, p - 1)), [])
  const goToNext = useCallback(() => setCurrentPage((p) => Math.min(totalPages, p + 1)), [totalPages])

  return useMemo(() => ({
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    goToFirst,
    goToLast,
    goToPrev,
    goToNext,
  }), [currentPage, totalPages, startIndex, endIndex, goToPage, goToFirst, goToLast, goToPrev, goToNext])
}
