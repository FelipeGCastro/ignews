
import Link from 'next/link'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'
export function Header() {
    
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <h1>Ensine o Caminho</h1>
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Inicio</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>
                    
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}