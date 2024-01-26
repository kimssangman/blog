export type Form = {
    word: string;
    meaning: string;
};

// 단어 추가
export async function writePost(form: Form) {
    // API Route에 단어 추가를 위한 요청을 보냄(fetch)
    const response = await fetch("/api/voca/writePost", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
        throw new Error(data.message || "서버 요청 오류");
    }
    return data;
}
