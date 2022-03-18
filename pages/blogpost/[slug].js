import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/BlogPost.module.css'
import * as fs from 'fs';


// Step1: Find the file corresponding to the slug
// Step2: Populate them inside the page

const Slug = (props) => {
  function createMarkup(c) {
    return {__html: c};
  }
  const [blog, setBlog] = useState(props.myBlog);

  // useEffect(() => {
  //  if(!router.isReady) return;
  //  const { slug } = router.query
  //  fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a)=>{
  //    return a.json();
  //  }).then((parsed) =>{
  //    setBlog(parsed)
  //  })

  // }, [router.isReady])
  
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>{blog && blog.title}</h1>
      <hr />
      <div>{blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)} /> } </div>
      </main>
      </div>
  )
}

// Get staticPath
export async function getStaticPaths() {  // getStaticPath is used to tell that how many pages we want generate
  return {
    paths: [
      { params: { slug: 'how-to-learn-flask' } }, 
      { params: { slug: 'how-to-learn-javascript'}}, 
      { params: { slug: 'how-to-learn-nextjs'}}, 
    ],
    fallback: true // false or 'blocking'
  };
}

// static site generation
// What ever we send in this fucntion we get inserted in the above coponent
export async function getStaticProps(context) {  // getStaticProps is used to bring the data from the props and server
  const {slug} = context.params;

 let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8")
   
  return {
    props: {myBlog: JSON.parse(myBlog)}, // will be passed to the page component as props
  }
}



// // SERVER SIDE RENDERING
// // What ever we send in this fucntion we get inserted in the above coponent
// export async function getServerSideProps(context) {
//   const {slug} = context.query;

//   let data = await  fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//       let myblog = await data.json();

//   return {
//     props: {myblog}, // will be passed to the page component as props
//   }
// }

export default Slug