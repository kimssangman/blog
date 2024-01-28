// 모든 퀴즈 가져오기
export async function getQuiz() {
    const response = await fetch("/api/voca/allPost/", { cache: "no-store" });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "서버 요청 오류");
    }
    return data;
}
