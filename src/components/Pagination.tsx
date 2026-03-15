interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  // 1페이지뿐이면 숨김
  if (totalPages <= 1) return null

  // 표시할 페이지 번호 계산 (말줄임 처리)
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | '...')[] = [1]

    if (currentPage > 3) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    pages.push(totalPages)
    return pages
  }

  const baseBtn = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors'
  const activeBtn = `${baseBtn} bg-blue-600 text-white`
  const normalBtn = `${baseBtn} text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/10`
  const disabledBtn = `${baseBtn} text-gray-300 dark:text-slate-600 cursor-not-allowed`

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      {/* 처음 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? disabledBtn : normalBtn}
        title="처음"
      >
        «
      </button>

      {/* 이전 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? disabledBtn : normalBtn}
        title="이전"
      >
        ‹
      </button>

      {/* 페이지 번호 */}
      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className={`${baseBtn} text-gray-400 dark:text-slate-500`}>
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? activeBtn : normalBtn}
          >
            {page}
          </button>
        )
      )}

      {/* 다음 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? disabledBtn : normalBtn}
        title="다음"
      >
        ›
      </button>

      {/* 끝 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? disabledBtn : normalBtn}
        title="끝"
      >
        »
      </button>
    </div>
  )
}
