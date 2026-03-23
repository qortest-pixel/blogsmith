"use client";

import { useState } from "react";

interface GenerateResult {
  content: string;
  seoScore: number;
  keywords: { keyword: string; searchVolume: number }[];
  title: string;
}

export default function GeneratePage() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [target, setTarget] = useState("general");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), tone, length, target }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "생성에 실패했습니다. 다시 시도해주세요.");
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.title || keyword}-blogsmith.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeoColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getSeoLabel = (score: number) => {
    if (score >= 80) return "우수";
    if (score >= 60) return "보통";
    return "개선 필요";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">블로그 글 생성</h1>
          <p className="mt-3 text-gray-500">키워드를 입력하고 옵션을 선택하세요</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="space-y-6">
            {/* Keyword */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">키워드 *</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="예: 강남 맛집, 다이어트 식단, 부동산 투자"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition"
              />
            </div>

            {/* Options row */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">글 톤</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition"
                >
                  <option value="professional">전문적</option>
                  <option value="friendly">친근한</option>
                  <option value="casual">캐주얼</option>
                  <option value="formal">격식체</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">글 길이</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition"
                >
                  <option value="short">짧게 (~1,000자)</option>
                  <option value="medium">보통 (~2,000자)</option>
                  <option value="long">길게 (~3,000자)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">타겟 독자</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:border-[#6366f1] transition"
                >
                  <option value="general">일반 대중</option>
                  <option value="beginner">초보자</option>
                  <option value="expert">전문가</option>
                  <option value="business">비즈니스</option>
                </select>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !keyword.trim()}
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-base transition shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  AI가 글을 작성하고 있습니다...
                </span>
              ) : (
                "🚀 블로그 글 생성하기"
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            {/* SEO Score + Keywords */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* SEO Score */}
              <div className={`rounded-2xl p-6 border ${getSeoColor(result.seoScore)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">SEO 점수</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/80">{getSeoLabel(result.seoScore)}</span>
                </div>
                <div className="text-5xl font-extrabold">{result.seoScore}</div>
                <div className="mt-3 w-full bg-white/50 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-current transition-all duration-500"
                    style={{ width: `${result.seoScore}%` }}
                  />
                </div>
              </div>

              {/* Keywords */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">연관 키워드</h3>
                <div className="space-y-2">
                  {result.keywords.slice(0, 5).map((kw) => (
                    <div key={kw.keyword} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{kw.keyword}</span>
                      <span className="text-gray-400 text-xs">{kw.searchVolume.toLocaleString()}회/월</span>
                    </div>
                  ))}
                  {result.keywords.length === 0 && (
                    <p className="text-gray-400 text-sm">키워드 데이터를 불러오지 못했습니다</p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg">{result.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-600"
                  >
                    {copied ? "✅ 복사됨" : "📋 복사"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition"
                  >
                    ⬇️ 다운로드
                  </button>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div
                  className="markdown-content prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(result.content) }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/^(?!<[hulo])(.*\S.*)$/gm, "<p>$1</p>")
    .replace(/\n{2,}/g, "\n");
}
