import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

{
  /* 
지금가지 개발한 스택 보여주는용
<a href="https://github.com/ten-log">
  <img align="center" src="https://github-readme-stats-theta-gules-17.vercel.app/api/top-langs?username=ten-log&layout=compact&theme=dark" />
</a>
<br /> */
}
/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# 👋 Hi there 
My name is TenChoi
I work as a server programmer
<br />

<a href="https://github.com/ten-log">
  <img align="center" src="https://github-readme-stats-theta-gules-17.vercel.app/api?username=ten-log&show_icons=true&theme=dark&line_height=20"/>
</a>
<br />
<br />
<div>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TS and typescript"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="white jester shoe icon"/> <br/>
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="java"/>
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="spring"/>
</div>

### 📕 Latest Blog Posts
`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://yeolceo.tistory.com/rss");

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 7; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `</br>${i + 1}. <a href=${link}>${title}</a>`;
  }

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();
