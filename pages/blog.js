import React, {useEffect, useState} from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link';
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

// Step1: Collect all the files from the blogpost directory
// Step2: Iterate thriough them and display them

const Blog = (props) => {
console.log(props)
  const [blogs, setBlogs] = useState(props.allBlogs)
  const [count, setCount] = useState(2)

// Using useEffect to bring the data in console
// Now we will remove this from our component and render it through server side props
// useEffect(() => {
// console.log("useEffect is running");
// fetch('http://localhost:3000/api/blogs').then((a)=>{
//   return a.json()})
//   .then((parsed)=>{
//     console.log(parsed)
//     setBlogs(parsed)
//   })
// },[])

const fetchData = async () => {
let d = await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`)
setCount(count + 2)
let data = await d.json();
 setBlogs(data)
};



  return (
    <div className={styles.container}>
      <main className={styles.main}>


{/* // Using ifinite Scrollbar */}
<InfiniteScroll
  dataLength={blogs.length} //This is important field to render the next data
  next={fetchData}
  hasMore={props.allCount !== blogs.length}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
 
>
{blogs.map((blogitem)=>{
  return <div key={blogitem.slug} className={styles.blogItem}>
  <Link href={`/blogpost/${blogitem.slug}`}>
 <h3>{blogitem.title}</h3>
  </Link>
  <p className={styles.blogp}>{blogitem.metadesc.substr(0,150)}...</p>
  <Link href={`/blogpost/${blogitem.slug}`}><button className={styles.btn}>Read More</button></Link>
</div>
  })}
</InfiniteScroll>



  {/* {blogs.map((blogitem)=>{
  return <div key={blogitem.slug} className={styles.blogItem}>
  <Link href={`/blogpost/${blogitem.slug}`}>
 <h3>{blogitem.title}</h3>
  </Link>
  <p className={styles.blogp}>{blogitem.metadesc.substr(0,150)}...</p>
  <Link href={`/blogpost/${blogitem.slug}`}><button className={styles.btn}>Read More</button></Link>
</div>
  })} */}
    </main>
  </div>
  )
}

// Static site generation

// What ever we send in this fucntion we get inserted in the above coponent
export async function getStaticProps(context) {

  let data = await fs.promises.readdir("blogdata")
  let allCount = data.length;
let myfile;
let allBlogs = [];
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    console.log(item);
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    // console.log(myfile)
    allBlogs.push(JSON.parse(myfile)); // We are parsing myfile because it is a string
  }

  return {
    props: {allBlogs, allCount}, // will be passed to the page component as props
  }
}

// // SERVER SIDE RENDERING
// // Same we will do for the slug

// // What ever we send in this fucntion we get inserted in the above coponent
// export async function getServerSideProps(context) {

//   let data = await  fetch('http://localhost:3000/api/blogs')
//       let allblogs = await data.json();

//   return {
//     props: {allblogs}, // will be passed to the page component as props
//   }
// }


export default Blog