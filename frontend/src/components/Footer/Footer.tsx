import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.texto}>
          © {anoAtual} Marketplace IFPB Cajazeiras
        </p>
        
        <span className={styles.separador}>|</span>
        
        <p className={styles.texto}>
          Projeto de PWEB2 •{' '}
          <a
            href="https://www.ifpb.edu.br/cajazeiras"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            IFPB Cajazeiras
          </a>
        </p>
      </div>
    </footer>
  )
}