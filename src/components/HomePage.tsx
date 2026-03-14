interface Props {
  onNavigate: (page: string) => void
}

// 기능 카드 데이터
const features = [
  {
    id: 'pdf-merge',
    icon: (
      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'PDF 첫 페이지 병합',
    description: '여러 PDF 파일의 첫 번째 페이지를 추출하여 하나의 PDF로 합칩니다. 드래그앤드롭으로 간편하게 사용하세요.',
    actionLabel: '시작하기',
    available: true,
  },
  {
    id: 'pdf-split',
    icon: (
      <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
    title: '문서 정리',
    description: '',
    actionLabel: 'Coming Soon',
    available: false,
  },
  {
    id: 'pdf-compress',
    icon: (
      <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 9l-7 7-7-7" />
      </svg>
    ),
    title: '문서 변경',
    description: '',
    actionLabel: 'Coming Soon',
    available: false,
  },
]

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="flex-1">
      {/* 기능 카드 섹션 */}
      <section className="py-16 px-4 bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">제공 기능</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10">필요한 기능을 선택하세요</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-colors duration-200"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex-1 mb-5">{feature.description}</p>
                {feature.available ? (
                  <button
                    onClick={() => onNavigate(feature.id)}
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {feature.actionLabel}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    {feature.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
