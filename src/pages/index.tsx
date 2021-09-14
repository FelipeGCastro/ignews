import { GetStaticProps } from 'next'
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import Logo from '../assets/logo.svg'
import { stripe } from '../services/stripe';
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
    <Head>
      <title>Home | ig.news</title>
    </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>Olá, seja bem-vindo</span>
        <h1>Aprenda e <br/><span>Ensine o caminho</span><br/> da verdade.</h1>
        <p>
          Tenha acesso a todo conteúdo <br />
          <span>por apenas {product.amount} por mês </span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>
      <Logo/>
    </main>
    </>
    
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JZbkVBg9OZ0JSBOKwCwz23s')
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100)
  }
  return {
    props: { product },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
