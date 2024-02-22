import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
const cheerio = require("cheerio");
/**----------------------------------------------------------------------------------------
 * fortuneOfToday에서 사용한 방법과 차이점이 있는데
 * 동행복권 사이트에서 axios를 사용한 경우 나온 값을 찍어보면 글자가 깨져서 나온다.
 * 이런 현상은 head에 charset이 UTF-8이 아닌 EUC-KR로 설정되어 있을 경우 발생하는데 해결법은 아래와 같다.
 * 
 * https://velog.io/@minshxxx/%EC%98%A4%EB%A5%98%ED%95%B4%EA%B2%B0-axios-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%90
 * 
 * 
 * 1. 
 * npm i iconv-lite
 * 
 * 2. 
 * const iconv = require('iconv-lite')
 * ... 
 * const html = await axios.get(url, {responseType: "arraybuffer"})
 * const contnet = iconv.decode(html.data, "EUC-KR").toString()
 * const $ = cheerio.load(content)
 * ... 이하 생략
 ----------------------------------------------------------------------------------------*/
const iconv = require("iconv-lite");

export async function GET(request: NextRequest) {
    try {
        /**--------------------------------------
        * axios로 해당 사이트 가져오기
        * 모바일 버전에서 Network의 Headers > Request URL 부분을 가져오면
        * JSONP 형식 > JSON으로 바꿔줘야한다.
        --------------------------------------*/
        const getHtml = async () => {
            try {
                return await axios.get(
                    "https://dhlottery.co.kr/common.do?method=main",
                    { responseType: "arraybuffer" } // 글자 깨짐 해결 위해 추가한 부분
                );
            } catch (error) {
                console.error(error);
            }
        };

        const lottoInfo = await getHtml().then((html: any) => {
            const content = iconv.decode(html.data, "EUC-KR").toString(); // 글자 깨짐 해결 위해 추가한 부분
            const $ = cheerio.load(content);

            // 스피또 1000_1
            const speetto_1000_1 = {
                common: {
                    round: $(
                        "section > div > div > div > div:nth-child(3) > div > strong"
                    ).text(), //회차
                    date: $(
                        "section > div > div > div > div:nth-child(3) > div > div:nth-child(6) > a > ul > li:nth-child(1)"
                    ).text(), // 날짜
                    inventoryRate: $(
                        "section > div > div > div > div:nth-child(3) > div > div:nth-child(6) > a > ul > li:nth-child(2) > span > em"
                    ).text(), // 입고율 퍼센트
                },
                first: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(3) > div > .quantity > a > ul:nth-child(3) > li:nth-child(1) > span > em"
                    ).text(), // 잔여수량
                },
                second: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(3) > div > .quantity > a > ul:nth-child(3) > li:nth-child(2) > span > em"
                    ).text(), // 잔여수량
                },
                third: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(3) > div > .quantity > a > ul:nth-child(3) > li:nth-child(3) > span > em"
                    ).text(), // 잔여수량
                },
            };

            // 스피또 1000_2
            const speetto_1000_2 = {
                common: {
                    round: $(
                        "section > div > div > div > div:nth-child(4) > div > strong"
                    ).text(), // 회차
                    date: $(
                        "section > div > div > div > div:nth-child(4) > div > div:nth-child(6) > a > ul > li:nth-child(1)"
                    ).text(), // 날짜
                    inventoryRate: $(
                        "section > div > div > div > div:nth-child(4) > div > div:nth-child(6) > a > ul > li:nth-child(2) > span > em"
                    ).text(), // 입고율 퍼센트
                },
                first: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(4) > div > .quantity > a > ul:nth-child(3) > li:nth-child(1) > span > em"
                    ).text(), // 잔여수량
                },
                second: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(4) > div > .quantity > a > ul:nth-child(3) > li:nth-child(2) > span > em"
                    ).text(), // 잔여수량
                },
                third: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(4) > div > .quantity > a > ul:nth-child(3) > li:nth-child(3) > span > em"
                    ).text(), // 잔여수량
                },
            };

            // 스피또 2000_1
            const speetto_2000_1 = {
                common: {
                    round: $(
                        "section > div > div > div > div:nth-child(1) > div > strong"
                    ).text(), //회차
                    date: $(
                        "section > div > div > div > div:nth-child(1) > div > div:nth-child(6) > a > ul > li:nth-child(1)"
                    ).text(), // 날짜
                    inventoryRate: $(
                        "section > div > div > div > div:nth-child(1) > div > div:nth-child(6) > a > ul > li:nth-child(2) > span > em"
                    ).text(), // 입고율 퍼센트
                },
                first: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(1) > div > .quantity > a > ul:nth-child(3) > li:nth-child(1) > span > em"
                    ).text(), // 잔여수량
                },
                second: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(1) > div > .quantity > a > ul:nth-child(3) > li:nth-child(2) > span > em"
                    ).text(), // 잔여수량
                },
                third: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(1) > div > .quantity > a > ul:nth-child(3) > li:nth-child(3) > span > em"
                    ).text(), // 잔여수량
                },
            };

            // 스피또 2000_2
            const speetto_2000_2 = {
                common: {
                    round: $(
                        "section > div > div > div > div:nth-child(2) > div > strong"
                    ).text(), //회차
                    date: $(
                        "section > div > div > div > div:nth-child(2) > div > div:nth-child(6) > a > ul > li:nth-child(1)"
                    ).text(), // 날짜
                    inventoryRate: $(
                        "section > div > div > div > div:nth-child(2) > div > div:nth-child(6) > a > ul > li:nth-child(2) > span > em"
                    ).text(), // 입고율 퍼센트
                },
                first: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(2) > div > .quantity > a > ul:nth-child(3) > li:nth-child(1) > span > em"
                    ).text(), // 잔여수량
                },
                second: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(2) > div > .quantity > a > ul:nth-child(3) > li:nth-child(2) > span > em"
                    ).text(), // 잔여수량
                },
                third: {
                    remaining: $(
                        "section > div > div > div > div:nth-child(2) > div > .quantity > a > ul:nth-child(3) > li:nth-child(3) > span > em"
                    ).text(), // 잔여수량
                },
            };

            // 객체로 만들어서 보내기
            const data = {
                speetto_1000_1: speetto_1000_1,
                speetto_1000_2: speetto_1000_2,
                speetto_2000_1: speetto_2000_1,
                speetto_2000_2: speetto_2000_2,
            };

            return data;
        });

        if (lottoInfo) {
            return new NextResponse(JSON.stringify(lottoInfo), {
                status: 200,
            });
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "오늘의 운세 가져오기 실패!",
                state: "error",
            }),
            {
                status: 405,
            }
        );
    }
}

/**------------------------------------------
 * GET 경로 처리기는 객체 와 함께 메서드를 사용할 때 기본적으로 정적으로 만들어지기 때문에
 * 
 * 동적으로 데이터를 받을 때 눈속임으로 POST로 만들어준다..
 * 그럴거면 POST 쓰지 왜....
 ------------------------------------------*/
export async function POST() {}
