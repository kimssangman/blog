// 리뷰 삭제
export async function getPost(_id: any) {
    // API Route에 리뷰 수정을 위한 요청을 보냄(fetch)
    const response = await fetch("/api/review/getPost", {
        method: "POST",
        body: JSON.stringify(_id),
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
