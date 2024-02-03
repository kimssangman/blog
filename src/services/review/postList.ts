export type Form = {
    word: string;
    meaning: string;
};

// 리뷰 목록 가져오기
export async function postList(form: Form) {
    // API Route에 리뷰 추가를 위한 요청을 보냄(fetch)
    const response = await fetch("/api/review/writePost", {
        method: "POST",
        body: JSON.stringify(form),
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
