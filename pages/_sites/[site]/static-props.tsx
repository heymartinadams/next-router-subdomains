/** Add your relevant code here for the issue to reproduce */
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
	const subdomains = ['a']

	return {
		paths: subdomains?.map(subdomain => ({ params: { site: subdomain } })) || [],
		fallback: false
	}
}

export const getStaticProps = async ({ params }) => {
	return { props: { params: 'yay 🎉' } }
}


export default function Site({ params }) {
  console.log('getStaticProps →', params)

  const router = useRouter()
  const { query: { site }, pathname } = router

  return (
    <>
      <div>data from `getStaticProps`: <span>{params ?? 'undefined'}</span></div>

      <button onClick={() => {
        router.push(
          { pathname: '/server-side-props', query: { site } },
          { pathname: '/server-side-props', query: {} },
        )
      }}>
        Check out `getServerSide`
      </button>
    </>    
  )
}
