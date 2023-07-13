export type Data = {
    message: string,
}

// ip 가져오기
export async function ip(form: Data) {
    // 우리 API Route에 회원가입을 위한 요청을 보냄(fetch)
    const response = await fetch('/api/ip', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();

    // console.log('signUp data >>> ', data)
    if (!response.ok) {
        throw new Error(data.message || '서버 요청 오류')
    }
    return data
}