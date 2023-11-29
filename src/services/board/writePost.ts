export type Form = {
    title: string;
    idea: string;
    input: string;
    output: string;
    contents: string;
};

// 글 작성
export async function writePost(form: Form) {
    // 우리 API Route에 글 작성을 위한 요청을 보냄(fetch)
    const response = await fetch("/api/board/writePost", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    // console.log('signUp data >>> ', data)
    if (!response.ok) {
        throw new Error(data.message || "서버 요청 오류");
    }
    return data;
}
