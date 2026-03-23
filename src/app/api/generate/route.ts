import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

// --- Naver Search Ad API ---
const NAVER_CUSTOMER_ID = "2717564";
const NAVER_ACCESS_LICENSE = "0100000000eda791f08fb910a76060c0e223f3a5a1423f99930004dfec7ddb4d5850248699";
const NAVER_SECRET_KEY = "AQAAAADgsNiE7JLQHwxYh8FfwcVp4Tillr/fDeyQeDfqPLi9Dw==";

// --- OpenClaw Gateway ---
const OPENCLAW_URL = "http://127.0.0.1:18789/v1/chat/completions";
const OPENCLAW_MODEL = "openclaw:executor";

function getGatewayToken(): string {
  try {
    const secretsPath = path.join(process.env.HOME || "/Users/baegchang-u", ".openclaw", "secrets.json");
    const secrets = JSON.parse(fs.readFileSync(secretsPath, "utf-8"));
    return secrets.openclaw?.gatewayAuthToken || "";
  } catch {
    return "";
  }
}

function generateNaverSignature(timestamp: string, method: string, uri: string): string {
  const hmac = crypto.createHmac("sha256", NAVER_SECRET_KEY);
  hmac.update(`${timestamp}.${method}.${uri}`);
  return hmac.digest("base64");
}

interface NaverKeyword {
  keyword: string;
  searchVolume: number;
}

async function fetchNaverKeywords(keyword: string): Promise<NaverKeyword[]> {
  const timestamp = String(Date.now());
  const method = "GET";
  const uri = "/keywordstool";
  const signature = generateNaverSignature(timestamp, method, uri);

  const params = new URLSearchParams({
    hintKeywords: keyword,
    showDetail: "1",
  });

  try {
    const res = await fetch(
      `https://api.naver.com/keywordstool?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "X-Timestamp": timestamp,
          "X-API-KEY": NAVER_ACCESS_LICENSE,
          "X-Customer": NAVER_CUSTOMER_ID,
          "X-Signature": signature,
        },
      }
    );

    if (!res.ok) {
      console.error("Naver API error:", res.status, await res.text());
      return [];
    }

    const data = await res.json();
    const keywordList = data.keywordList || [];

    return keywordList
      .map((item: { relKeyword: string; monthlyPcQcCnt: number | string; monthlyMobileQcCnt: number | string }) => ({
        keyword: item.relKeyword,
        searchVolume:
          (typeof item.monthlyPcQcCnt === "number" ? item.monthlyPcQcCnt : parseInt(String(item.monthlyPcQcCnt)) || 0) +
          (typeof item.monthlyMobileQcCnt === "number" ? item.monthlyMobileQcCnt : parseInt(String(item.monthlyMobileQcCnt)) || 0),
      }))
      .sort((a: NaverKeyword, b: NaverKeyword) => b.searchVolume - a.searchVolume)
      .slice(0, 10);
  } catch (err) {
    console.error("Naver API fetch error:", err);
    return [];
  }
}

const TONE_MAP: Record<string, string> = {
  professional: "전문적이고 신뢰감 있는 톤",
  friendly: "친근하고 따뜻한 톤 (~요 체)",
  casual: "캐주얼하고 가벼운 말투",
  formal: "격식체, 정중한 문어체",
};

const LENGTH_MAP: Record<string, string> = {
  short: "약 1,000자 (짧은 글)",
  medium: "약 2,000자 (보통 길이)",
  long: "약 3,000자 이상 (긴 글)",
};

const TARGET_MAP: Record<string, string> = {
  general: "일반 대중",
  beginner: "초보자 (쉽고 친절하게)",
  expert: "전문가 (심도 있게)",
  business: "비즈니스 관계자",
};

async function generateBlogContent(
  keyword: string,
  relatedKeywords: NaverKeyword[],
  tone: string,
  length: string,
  target: string
): Promise<{ content: string; title: string }> {
  const token = getGatewayToken();
  const keywordInfo =
    relatedKeywords.length > 0
      ? relatedKeywords
          .slice(0, 5)
          .map((k) => `- ${k.keyword} (월 검색량: ${k.searchVolume.toLocaleString()})`)
          .join("\n")
      : "연관 키워드 데이터 없음";

  const toneDesc = TONE_MAP[tone] || TONE_MAP.professional;
  const lengthDesc = LENGTH_MAP[length] || LENGTH_MAP.medium;
  const targetDesc = TARGET_MAP[target] || TARGET_MAP.general;

  const systemPrompt = `당신은 네이버 SEO에 특화된 블로그 전문 작가입니다.
다음 규칙을 반드시 따르세요:
1. 네이버 블로그 SEO 기준에 맞게 글을 작성합니다.
2. 메인 키워드를 제목, 첫 문단, 중간, 마지막에 자연스럽게 배치합니다.
3. 소제목(##)을 최소 3개 이상 사용합니다.
4. 글의 도입부에서 독자의 관심을 끌어야 합니다.
5. 결론에 핵심 정보를 요약합니다.
6. 마크다운 형식으로 작성합니다.
7. 연관 키워드를 본문에 자연스럽게 포함합니다.`;

  const userPrompt = `메인 키워드: "${keyword}"

연관 키워드 및 검색량:
${keywordInfo}

글 톤: ${toneDesc}
글 길이: ${lengthDesc}
타겟 독자: ${targetDesc}

위 정보를 바탕으로 네이버 SEO에 최적화된 블로그 글을 작성해주세요.
첫 줄에 "# 제목" 형식으로 제목을 포함해주세요.`;

  const res = await fetch(OPENCLAW_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: OPENCLAW_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("OpenClaw API error:", res.status, errText);
    throw new Error("AI 글 생성에 실패했습니다.");
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "";

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : `${keyword} — 완벽 가이드`;

  return { content, title };
}

function calculateSeoScore(
  content: string,
  keyword: string,
  relatedKeywords: NaverKeyword[]
): number {
  let score = 0;
  const lower = content.toLowerCase();
  const kwLower = keyword.toLowerCase();

  // Title contains keyword (20 pts)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch && titleMatch[1].toLowerCase().includes(kwLower)) {
    score += 20;
  }

  // Keyword frequency (20 pts)
  const keywordCount = (lower.match(new RegExp(kwLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  if (keywordCount >= 5) score += 20;
  else if (keywordCount >= 3) score += 15;
  else if (keywordCount >= 1) score += 10;

  // Subheadings (15 pts)
  const subheadings = (content.match(/^#{2,3}\s/gm) || []).length;
  if (subheadings >= 4) score += 15;
  else if (subheadings >= 2) score += 10;
  else if (subheadings >= 1) score += 5;

  // Content length (15 pts)
  const charCount = content.length;
  if (charCount >= 2500) score += 15;
  else if (charCount >= 1500) score += 10;
  else if (charCount >= 800) score += 5;

  // First paragraph contains keyword (10 pts)
  const firstParagraph = content.split("\n\n").slice(0, 2).join(" ").toLowerCase();
  if (firstParagraph.includes(kwLower)) score += 10;

  // Related keywords used (10 pts)
  const usedRelated = relatedKeywords.filter(
    (k) => k.keyword !== keyword && lower.includes(k.keyword.toLowerCase())
  ).length;
  if (usedRelated >= 3) score += 10;
  else if (usedRelated >= 1) score += 5;

  // Has conclusion section (10 pts)
  if (lower.includes("결론") || lower.includes("마무리") || lower.includes("정리")) {
    score += 10;
  }

  return Math.min(score, 100);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, tone = "professional", length = "medium", target = "general" } = body;

    if (!keyword || typeof keyword !== "string" || keyword.trim().length === 0) {
      return NextResponse.json({ error: "키워드를 입력해주세요." }, { status: 400 });
    }

    // 1. Fetch Naver keywords
    const relatedKeywords = await fetchNaverKeywords(keyword.trim());

    // 2. Generate blog content
    const { content, title } = await generateBlogContent(
      keyword.trim(),
      relatedKeywords,
      tone,
      length,
      target
    );

    // 3. Calculate SEO score
    const seoScore = calculateSeoScore(content, keyword.trim(), relatedKeywords);

    return NextResponse.json({
      content,
      title,
      seoScore,
      keywords: relatedKeywords,
    });
  } catch (err) {
    console.error("Generate API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
