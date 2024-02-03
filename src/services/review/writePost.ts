export type Form = {
    region: string;
    type: string;
    rating: string;
    images: FileList | null; // 여러 파일을 선택하므로 FileList 또는 null로 타입을 지정합니다.
    comment: string;
};

// 리뷰 추가
export async function writePost(form: Form) {
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
