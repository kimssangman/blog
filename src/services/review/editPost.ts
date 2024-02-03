export type Form = {
    title: string;
    idea: string;
    input: string;
    output: string;
    contents: string;
};

// 리뷰 수정
export async function editPost(form: Form) {
    // API Route에 리뷰 수정을 위한 요청을 보냄(fetch)
    const response = await fetch("/api/review/editPost", {
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
