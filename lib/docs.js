import matter from "gray-matter";
import {remark} from 'remark';
import html from "remark-html";

const fs = require("fs");
const path = require("path");

const postsDirectory = path.join(process.cwd(), "docs");

// to  get documents
export function getDocuments() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allDocuments = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allDocuments.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    } else {
      return 1;
    }
    return 0;
  });
}

// to get document content
export async function getDocumentContent(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
