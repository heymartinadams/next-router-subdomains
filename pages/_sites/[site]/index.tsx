/** Add your relevant code here for the issue to reproduce */
import { useRouter } from 'next/router'
import { useRef } from 'react'

export const getStaticPaths = async () => {
	const subdomains = ['a']

	return {
		paths: subdomains?.map(subdomain => ({ params: { site: subdomain } })) || [],
		fallback: false
	}
}

export const getStaticProps = async ({ params }) => {
	return { props: { data: 'yay 🎉' } }
}


export default function Site({ data }) {
  console.log('getStaticProps →', data)

  const router = useRouter()
  const { query: { site }, pathname } = router

  const renderCounter  = useRef(0);

  renderCounter.current++

  return (
    <>
      <button onClick={() => {
        router.push(
          {
            pathname,
            query: { site, hello: 'world' },
          },
          { pathname: '/', query: { hello: 'world' } },
          { shallow: true }
        )
      }}>
        Shallow routing
      </button>

      <p>Renders: {renderCounter.current}</p>

    </>    
  )
}
