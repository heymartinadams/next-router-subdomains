/** Add your relevant code here for the issue to reproduce */
import { useRouter } from 'next/router'

export const getServerSideProps = async ({ req }) => {
	return { props: { data: req.headers['x-middleware-request-custom'] } }
}

export default function Site({ data }) {
  console.log('getServerSideProps →', data)

  const router = useRouter()
  const { query: { site }, pathname } = router

  return (
    <>
      <div>data from `getServerSideProps`: <span>{data ?? 'undefined'}</span></div>

      <button onClick={() => {
        router.push(
          { pathname: '/static-props', query: { site } },
          { pathname: '/static-props', query: {} },
        )
      }}>
        Check out `getStaticProps`
      </button>
    </>    
  )
}
