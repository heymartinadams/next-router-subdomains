/** Add your relevant code here for the issue to reproduce */
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
	const subdomains = ['a']

	return {
		paths: subdomains?.map(subdomain => ({ params: { site: subdomain } })) || [],
		fallback: false
	}
}

export const getServerSideProps = async ({ req }) => {
	return { props: { data: req.headers['x-custom'] } }
}

export default function Site({ data }) {
  console.log('getServerSideProps →', data)

  const router = useRouter()
  const { query: { site }, pathname } = router

  return (
    <>
      <div>data from `getServerSideProps`: <span>{data}</span></div>

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
