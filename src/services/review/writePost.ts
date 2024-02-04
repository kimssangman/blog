import { useEffect } from "react";

export type Form = {
    region: string;
    type: string;
    rating: string;
    name: string;
    location: string;
    images: FileList | null;
    comment: string;
};

/*----------------------------------------------------------------
    * 이미지와 함께 저장하기
    *
    * 이미지가 들어 있는 데이터를 함께 서버에 보내기 위해서는 FormData()를 선언하여
    * 한꺼번에 보내는 작업을 거쳐야한다.
    ----------------------------------------------------------------*/
// 리뷰 추가
export async function writePost(form: Form) {
    // console.log(form);
    const formData = new FormData();
    formData.append("region", form.region);
    formData.append("type", form.type);
    formData.append("rating", form.rating);
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("comment", form.comment);

    // 이미지를 추가
    if (form.images) {
        for (let i = 0; i < form.images.length; i++) {
            const file = form.images[i];
            // console.log(file);
            formData.append("images", file); // 이미지 파일을 'images'라는 이름으로 전달
        }
    }

    // API Route에 리뷰 추가를 위한 요청을 보냄(fetch)
    const response = await fetch("/api/review/writePost", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "서버 요청 오류");
    }
    return data;
}
