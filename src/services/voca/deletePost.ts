// 글 수정
export async function deletePost(_id: string) {
    // API Route에 글 수정을 위한 요청을 보냄(fetch)
    const response = await fetch("/api/voca/deletePost", {
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
