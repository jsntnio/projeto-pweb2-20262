import { useState, useEffect, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuMail, LuLock, LuUser, LuPhone } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { cadastroThunk } from '../../features/auth/authThunks'
import { cursosApi } from '../../api/cursos'
import type { Curso } from '../../types'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { Select } from '../../components/Select'
import styles from './Cadastro.module.css'

export function Cadastro() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cursoId, setCursoId] = useState('')
    const [telefone, setTelefone] = useState('')

    const [cursos, setCursos] = useState<Curso[]>([])
    const [carregandoCursos, setCarregandoCursos] = useState(true)

    const [erroNome, setErroNome] = useState<string | null>(null)
    const [erroEmail, setErroEmail] = useState<string | null>(null)
    const [erroSenha, setErroSenha] = useState<string | null>(null)
    const [erroCurso, setErroCurso] = useState<string | null>(null)

    const { carregando, erro } = useAppSelector((state) => state.auth)

    useEffect(() => {
        cursosApi.listar()
            .then((dados) => setCursos(dados || []))
            .catch(() => console.error('Erro ao carregar cursos'))
            .finally(() => setCarregandoCursos(false))
    }, [])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        let valido = true

        if (nome.trim().length < 3) {
            setErroNome('O nome deve ter no mínimo 3 caracteres')
            valido = false
        } else setErroNome(null)

        if (!email.endsWith('@academico.ifpb.edu.br')) {
            setErroEmail('Use seu e-mail @academico.ifpb.edu.br')
            valido = false
        } else setErroEmail(null)

        if (senha.length < 6) {
            setErroSenha('A senha deve ter no mínimo 6 caracteres')
            valido = false
        } else setErroSenha(null)

        if (!cursoId) {
            setErroCurso('Selecione seu curso')
            valido = false
        } else setErroCurso(null)

        if (!valido) return

        try {
            await dispatch(cadastroThunk({
                nome,
                email,
                senha,
                cursoId: Number(cursoId),
                telefone: telefone.trim() || undefined
            })).unwrap()

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
                        <h1 className={styles.title}>Crie sua conta</h1>
                        <p className={styles.subtitle}>Junte-se à comunidade do Campus Cajazeiras.</p>
                    </div>

                    {erro && (
                        <div className={styles.erroGeral}>
                            {erro}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <FormField label="Nome completo" htmlFor="nome" error={erroNome}>
                            <Input
                                id="nome"
                                type="text"
                                placeholder="Digite seu nome completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                hasError={!!erroNome}
                                icon={<LuUser size={20} />}
                                disabled={carregando}
                            />
                        </FormField>

                        <FormField label="E-mail acadêmico" htmlFor="email" error={erroEmail}>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                hasError={!!erroEmail}
                                icon={<LuMail size={20} />}
                                disabled={carregando}
                            />
                        </FormField>

                        <div className={styles.row}>
                            <FormField label="Curso" htmlFor="curso" error={erroCurso}>
                                <Select
                                    id="curso"
                                    value={cursoId}
                                    onChange={(e) => setCursoId(e.target.value)}
                                    hasError={!!erroCurso}
                                    disabled={carregando || carregandoCursos}
                                >
                                    <option value="" disabled>Selecione seu curso</option>
                                    {cursos.map(curso => (
                                        <option key={curso.id} value={curso.id}>{curso.nome}</option>
                                    ))}
                                </Select>
                            </FormField>

                            <FormField label="Telefone (opcional)" htmlFor="telefone">
                                <Input
                                    id="telefone"
                                    type="tel"
                                    placeholder="Digite seu telefone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    icon={<LuPhone size={20} />}
                                    disabled={carregando}
                                />
                            </FormField>
                        </div>

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
                            Criar conta
                        </Button>
                    </form>

                    <p className={styles.loginText}>
                        Já tem uma conta?{' '}
                        <Link to="/login" className={styles.linkBold}>
                            Faça login
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