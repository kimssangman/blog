# Link
https://kimsangmin.com/


# version
node 20.4.1
</br>
react 18.2.0
</br>
nextjs 13.4.9

# npm
```
npm i
```

# pm2 
```
sudo npm i pm2 -g
```
```
pm2 start npm --name "kimsangminServer" -- run "start"

pm2 list
pm2 kill
pm2 delete 0
```

# buld
npm run build
</br></br>

# start 
npm run dev
</br></br>

# build start
npm run start
</br></br>

# SWR 참고

https://velog.io/@gene028/NextJS-%EC%A7%80%EB%8F%84-%EA%B0%9C%EB%B0%9C-2-SWR%EB%A1%9C-%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
</br></br>

## 파일 업로드 시 테스트 환경에서는 잘 되는데 빌드 시 413 (Request Entity Too Large) 뜰 때
nginx 문제로 nginx 설정에서 용량제한을 늘려야한다.

경로 sudo vi /etc/nginx/nginx.conf
```
http 부분에 아래 client_max_body_size 64M 추가


http {
    client_max_body_size 64M;
}
```

저장 후 nginx 재시작
```
sudo nginx -s reload
```
</br></br>

## ec2 인스턴스 npm i 시 먹통일 때
스왑 파일 생성하여 메모리 늘리기
```
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap  /swapfile
swapon /swapfile
swapon  --show
free -h
```
</br></br>


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
