export default function BlogList(props: { list: any[] }) {
  return (
    <ul className='pl-4'>
      {props.list.map(blog => (
        <li className='my-2 text-lg' key={blog.data.title}>
          <time className="text-gray-400 mr-5" dateTime={blog.data.pubDate.toISOString()}>
            {
              blog.data.pubDate.toLocaleDateString('en-us', {
                day: 'numeric',
                month: 'short',
              })
            }
          </time>
          <a className="underline underline-offset-2 hover:decoration-red-600 mr-2" href={`/blog/${blog.slug}/`}>
            {blog.data.title}
          </a>
          {
            blog.data.tag ? (
              blog.data.tag.map((t: any) => (
                <span key={t} className="text-red-600 text-sm bg-zinc-200 dark:bg-zinc-700 rounded mr-2 mb-2 px-1">{t}</span>
              ))
            ) : (<div></div>)
          }
        </li>
      ))}
    </ul>
  )
}
