// 오늘의 운세 가져오기
export async function fortuneOfToday(character: any) {
    const response = await fetch("/api/check/fortuneOfToday", {
        method: "POST",
        body: JSON.stringify(character),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "서버 요청 오류");
    }
    return data;
}
