import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuMail, LuLock } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginThunk } from '../../features/auth/authThunks'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import styles from './Login.module.css'

export function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erroEmail, setErroEmail] = useState<string | null>(null)
    const [erroSenha, setErroSenha] = useState<string | null>(null)

    const { carregando, erro } = useAppSelector((state) => state.auth)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        let valido = true

        if (!email.endsWith('@academico.ifpb.edu.br')) {
            setErroEmail('O e-mail deve terminar com @academico.ifpb.edu.br')
            valido = false
        } else {
            setErroEmail(null)
        }

        if (senha.length < 6) {
            setErroSenha('A senha deve ter no mínimo 6 caracteres')
            valido = false
        } else {
            setErroSenha(null)
        }

        if (!valido) return

        try {
            await dispatch(loginThunk({ email, senha })).unwrap()
            navigate('/vendas')
        } catch { }
    }

    return (
        <main className={styles.container}>

            <section className={styles.formSection}>
                <div className={styles.formWrapper}>
                    <Link to="/" className={styles.logoLink}>
                        <img src="/assets/images/logo.svg" alt="Marketplace IFPB" className={styles.logo} />
                    </Link>

                    <div className={styles.header}>
                        <h1 className={styles.title}>Seja bem-vindo!</h1>
                        <p className={styles.subtitle}>Acesse sua conta abaixo.</p>
                    </div>

                    {erro && (
                        <div className={styles.erroGeral}>
                            {erro}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <FormField label="E-mail acadêmico" htmlFor="email" error={erroEmail}>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                hasError={!!erroEmail}
                                icon={<LuMail size={20} />}
                                disabled={carregando}
                            />
                        </FormField>

                        <FormField label="Senha" htmlFor="senha" error={erroSenha}>
                            <Input
                                id="senha"
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                hasError={!!erroSenha}
                                icon={<LuLock size={20} />}
                                disabled={carregando}
                            />
                        </FormField>

                        <Button type="submit" fullWidth isLoading={carregando}>
                            Entrar
                        </Button>
                    </form>

                    <p className={styles.cadastroText}>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className={styles.linkBold}>
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </section>

            <section className={styles.decorSection}>
                <div className={`${styles.circle} ${styles.circle1}`} />
                <div className={`${styles.circle} ${styles.circle2}`} />
                <div className={`${styles.circle} ${styles.circle3}`} />

                <div className={styles.decorContent}>
                    <img src="/assets/images/logo.svg" alt="Marketplace IFPB" className={styles.decorLogo} />

                    <h2 className={styles.decorTitle}>
                        Dê um novo destino<br />aos seus objetos.
                    </h2>
                    <p className={styles.decorText}>
                        Negocie materiais com outros estudantes do IFPB de forma simples e segura, sem sair do campus.
                    </p>
                </div>
            </section>

        </main>
    )
}