import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
const cheerio = require("cheerio");

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
                    "https://m.search.naver.com/p/csearch/content/apirender.nhn?where=m&pkid=387&_callback=jQuery22408355225649918152_1701949152588&u2=19631210&q=%EC%83%9D%EB%85%84%EC%9B%94%EC%9D%BC+%EC%9A%B4%EC%84%B8&u1=m&u3=lunarGeneral&u4=11&_=1701949152592"
                );
            } catch (error) {
                console.error(error);
            }
        };

        /**--------------------------------------
        * html.data 인 JSOPN 형식에서 JSON 형식으로 변환작업
        * 
        * JSOPN >>>   jQuery22408355225649918152_1701949152588({ "flick" : ["<ul class=\"date_result_list\"> <li class=\"_foldContainer\"> <strong class=\"title _toggler on\" onclick=\"tCR('a=nco_xbv*1.total&r=1&i=88179563_000000622526');\"><span class=\"icon total\"><\/span>총운<a nocr href=\"javascript:;\" class=\"btn_open on\">접기<\/a><\/strong> <div class=\"hidden_box\" style=\"display: block;\">
        * 
        * {"filck" : ["<ul class=\"date_result_list\">.....]}
        * 1. () 부분부터 시작, 끝까지 JSON으로 파싱
        * 2. cheerio를 사용해서 크롤링 하고 싶은 부분 찾기
        * 3. return
        --------------------------------------*/
        const fortuneOfToday = await getHtml().then((html: any) => {
            // console.log(html.data);

            const jsonData = html.data;

            const startIndex = jsonData.indexOf("(") + 1;
            const endIndex = jsonData.lastIndexOf(")");
            const jsonStr = jsonData.substring(startIndex, endIndex);
            const extractedData = JSON.parse(jsonStr);

            const htmlString = extractedData.flick[0];
            const $ = cheerio.load(htmlString);

            const text = $(
                `.date_result_list > li._foldContainer:nth-child(3) > .hidden_box > .text`
            ).text();

            // console.log(`Text from 1st item:`, text);

            return text;
        });

        if (fortuneOfToday) {
            return new NextResponse(JSON.stringify(fortuneOfToday), {
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

    // /**--------------------------------------
    // * axios로 해당 사이트 가져오기
    // --------------------------------------*/
    // const getHtml = async () => {
    //     try {
    //         return await axios.get(
    //             "https://search.naver.com/search.naver?where=view&query=%EB%8F%84%EC%BF%84%20%EC%97%AC%ED%96%89&sm=tab_opt&nso=so%3Add%2Cp%3A&mode=normal&main_q=&st_coll=&topic_r_cat="
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // getHtml().then((html: any) => {
    //     let ulList: any = [];
    //     const $ = cheerio.load(html.data);

    //     const $bodyList = $(".mod_banner_news");

    //     $bodyList.each(function (i: any, elem: any) {
    //         ulList[i] = {
    //             title: $(elem).find(".txt").text(),
    //             // url: $(elem).find(".api_txt_lines").attr("href"),
    //             // image_url: $(elem).find(".api_get").attr("src"),
    //             // date: $(elem).find(".sub_time").text(),
    //         };
    //     });

    //     console.log(ulList);

    //     const data = ulList.filter((n: any) => n.title);
    //     return data;
    // });

    // if (fortuneOfToday) {
    //     return new NextResponse(JSON.stringify(fortuneOfToday), {
    //         status: 200,
    //     });
    // }
}

/**------------------------------------------
 * GET 경로 처리기는 객체 와 함께 메서드를 사용할 때 기본적으로 정적으로 만들어지기 때문에
 * 
 * 동적으로 데이터를 받을 때 눈속임으로 POST로 만들어준다..
 * 그럴거면 POST 쓰지 왜....
 ------------------------------------------*/
export async function POST() {}
