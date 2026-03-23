import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Blog<span className="text-[#6366f1]">smith</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              AI가 키워드를 분석하고, 네이버 SEO에 최적화된 블로그 글을 자동으로 생성합니다. 
              마케터, 블로거, 사업자를 위한 콘텐츠 자동화 플랫폼.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-4">서비스</h4>
            <ul className="space-y-2">
              <li><Link href="/generate" className="text-gray-500 hover:text-[#6366f1] text-sm transition">글 생성</Link></li>
              <li><Link href="/pricing" className="text-gray-500 hover:text-[#6366f1] text-sm transition">가격 안내</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-4">고객지원</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-500 text-sm">이메일: support@blogsmith.kr</span></li>
              <li><span className="text-gray-500 text-sm">카카오톡: @blogsmith</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© 2026 Blogsmith. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-gray-400 text-xs hover:text-gray-600 cursor-pointer">이용약관</span>
            <span className="text-gray-400 text-xs hover:text-gray-600 cursor-pointer">개인정보처리방침</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
