import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export async function parseProfileMd () {
  const dirName = path.join(process.cwd(), 'pages')
  const fullPath = path.join(dirName, `index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    contentHtml,
    ...matterResult.data,
  };
}