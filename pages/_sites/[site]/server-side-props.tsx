/** Add your relevant code here for the issue to reproduce */
import { useRouter } from 'next/router'

export const getServerSideProps = async ({ params }) => {
	return { props: { params } }
}

export default function Site({ params }) {
  console.log('getServerSideProps →', params)

  const router = useRouter()
  const { query: { site }, pathname } = router

  return (
    <>
      <div>data from `getServerSideProps`: <span>{params ?? 'undefined'}</span></div>

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
