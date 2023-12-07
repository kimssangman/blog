// 오늘의 운세 가져오기
export async function fortuneOfToday() {
    const response = await fetch("/api/check/fortuneOfToday", {
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "서버 요청 오류");
    }
    return data;
}
