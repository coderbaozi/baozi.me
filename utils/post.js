import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
export default class PostUtil{

  constructor(dataDir){
    this.postsDirectory = path.join(process.cwd(), 'public' , 'posts', dataDir)
  }

  getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(this.postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')
  
      // Read markdown file as string
      const fullPath = path.join(this.postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
  
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)
      // Combine the data with the id
      return {
        id,
        ...matterResult.data, 
      };
    })
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  }

  
getAllPostIds () {
  const fileNames = fs.readdirSync(this.postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/,'')
      }
    }
  })
}

 async getPostData(id) {
  const fullPath = path.join(this.postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.value

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
}

