// 로또 번호 가져오기
export async function lotto() {
    const response = await fetch("/api/board", { cache: "no-store" });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "서버 요청 오류");
    }
    return data;
}
