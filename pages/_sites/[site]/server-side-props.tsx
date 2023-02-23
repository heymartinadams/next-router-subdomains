/** Add your relevant code here for the issue to reproduce */
import { useRouter } from 'next/router'
import { useRef } from 'react'

export const getServerSideProps = async ({ req }) => {
	return { props: { data: req.headers['x-custom'] } }
}

export default function Site({ data }) {
  console.log('getServerSideProps →', data)

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
