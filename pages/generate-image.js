import "@rainbow-me/rainbowkit/styles.css";
import Main from "../components/Main";
import NonPageMeta from "../components/NonPageMeta";

export default function Home() {
  return (
    <>
      <Main />
      <NonPageMeta />
    </>
  )
}

export async function getServerSideProps() {

  // imageUrl : props.query.i || null,
  const data = {
      title : 'DALLE ',
      imageUrl : null,
      id:"render props"
    }
    return { props: { data } }
}
