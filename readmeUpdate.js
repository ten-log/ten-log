import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

//自分のblogLink
const blogLink = `https://yeolceo.tistory.com/rss`;

/**
 * README.MDとなるtext
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

(async () => {
  // rss-parserをつくります。それでfeedを持ってきます。
  const parser = new Parser({
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
    },
  });
  const feed = await parser.parseURL(blogLink);

  // 債権のtitle, linkを持ってきます。そしてtextに追加
  for (let i = 0; i < 7; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}`);
    console.log(`${title}`);
    console.log(`${link}`);
    text += `</br>${i + 1}. <a href=${link}>${title}</a>`;
  }

  // create or update README.md
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("updated");
})();

/* 
지금가지 개발한 스택 보여주는용
<a href="https://github.com/ten-log">
  <img align="center" src="https://github-readme-stats-theta-gules-17.vercel.app/api/top-langs?username=ten-log&layout=compact&theme=dark" />
</a>
<br /> */
