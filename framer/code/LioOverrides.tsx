import * as React from "react"
import type { ComponentType } from "react"

// Textos do LCI Studio aplicados por override (template Nolan Barret)

const withText =
    (text: string) =>
    (Component): ComponentType =>
    (props: any) => <Component {...props} text={text} />

export const withSobre = withText("Sobre")
export const withArquivo = withText("Arquivo")
export const withContato = withText("Contato")

export const withIntro = withText(
    "LCI Studio é um estúdio criativo entre São Paulo e Recife. Branding, identidade visual, direção de arte e motion para marcas que querem ser lembradas."
)

const LOGO_CSS = `
.lio-logo,.lio-logo p,.lio-logo span{white-space:nowrap!important}
.lio-logo p,.lio-logo h1,.lio-logo h2,.lio-logo h3,.lio-logo h4,.lio-logo h5,.lio-logo h6{font-size:20px!important;line-height:1!important;letter-spacing:-0.06em!important;font-weight:500!important}
.lio-logo p::after{content:"®";display:inline-block;font-size:0.36em;letter-spacing:0;line-height:1;vertical-align:top;margin-left:0.12em;margin-top:0.05em}
`

// Logo "LCI Studio®" numa linha no lugar do nome do template (mantém a cor de cada variante)
export function withLioLogo(Component): ComponentType {
    return (props: any) => (
        <>
            <style>{LOGO_CSS}</style>
            <Component
                {...props}
                text="LCI Studio"
                className={(props.className || "") + " lio-logo"}
                aria-label="LCI Studio"
            />
        </>
    )
}

// ---------- Bloco "Ferramentas / Clientes / Tem um projeto em mente?" ----------

const TOOLS = [
    ["Ai", "Illustrator"],
    ["Ps", "Photoshop"],
    ["Ae", "After Effects"],
    ["Fg", "Figma"],
    ["Fr", "Framer"],
    ["Rm", "Readymag"],
    ["Hf", "Higgsfield"],
    ["Oa", "OpenArt"],
    ["Ax", "Axis"],
    ["Gp", "ChatGPT"],
]

const CLIENTS = [
    "Orbis",
    "Mescla",
    "Aysù",
    "Flávia Aranha",
    "Easy Diagnostics",
    "Clínica LYS",
    "Ema Studio",
    "Best Amuse",
    "Botteh Tapetes",
    "Mônica Di Creddo",
]

const EMAIL = "lucibellelemos@gmail.com"

const BLOCK_CSS = `
.lci-b{width:100%;box-sizing:border-box;padding:96px 0 24px;font-family:"Switzer","Switzer Placeholder",sans-serif;color:var(--fg);background:var(--bg);overflow:hidden}
.lci-b *{box-sizing:border-box}
.lci-in{padding:0 var(--pad)}
.lci-lab{font-family:"Fragment Mono",monospace;font-size:10px;line-height:1;text-transform:uppercase;color:var(--mut);margin:0 0 18px}
.lci-mq{position:relative;width:100%;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent);mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)}
.lci-track{display:flex;align-items:center;width:max-content;animation:lci-x var(--dur) linear infinite}
.lci-track.rev{animation-direction:reverse}
.lci-mq:hover .lci-track{animation-play-state:paused}
@keyframes lci-x{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.lci-tool{display:flex;align-items:center;gap:8px;padding:0 28px 0 0;white-space:nowrap;font-size:16px;font-weight:500;letter-spacing:-.01em;line-height:1}
.lci-ic{width:22px;height:22px;border-radius:5px;border:1px solid var(--fg);display:flex;align-items:center;justify-content:center;font-family:"Fragment Mono",monospace;font-size:9px;font-weight:400;letter-spacing:0}
.lci-note{color:var(--mut);font-size:16px;line-height:1.2;letter-spacing:-.02em;margin:16px 0 0}
.lci-cl{font-size:24px;font-weight:500;letter-spacing:-.02em;line-height:1.1;white-space:nowrap;padding:0 18px 0 0}
.lci-cl::after{content:"/";color:var(--mut);margin-left:18px;font-weight:400}
.lci-sec{margin-bottom:64px}
.lci-h{font-size:clamp(24px,2.5vw,32px);font-weight:500;letter-spacing:-.02em;line-height:1.1;margin:0}
.lci-p{color:var(--mut);font-size:16px;line-height:1.2;letter-spacing:-.02em;max-width:420px;margin:12px 0 0}
.lci-mail{display:inline-block;margin-top:28px;font-size:clamp(24px,2.5vw,32px);font-weight:500;letter-spacing:-.02em;line-height:1.1;color:var(--fg);text-decoration:none;background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .4s}
.lci-mail:hover{background-size:100% 1px}
@media (max-width:809px){.lci-b{padding-top:72px}.lci-sec{margin-bottom:48px}.lci-cl{font-size:20px}}
@media (prefers-reduced-motion:reduce){.lci-track{animation:none}}
`

export function LCIBlock(props: any) {
    const dark = props.theme === "dark"
    const ref = React.useRef<HTMLElement>(null)
    const [pad, setPad] = React.useState(0)
    React.useEffect(() => {
        // alinha o texto com a margem da logo no topo do site
        const fit = () => {
            const el = ref.current
            const logo = document.querySelector('[aria-label="LCI Studio"]') as HTMLElement | null
            if (!el || !logo) return
            const d = logo.getBoundingClientRect().left - el.getBoundingClientRect().left
            setPad(Math.max(0, Math.round(d)))
        }
        fit()
        const t = setTimeout(fit, 600)
        window.addEventListener("resize", fit)
        return () => {
            clearTimeout(t)
            window.removeEventListener("resize", fit)
        }
    }, [])
    const vars: any = {
        "--fg": dark ? "#FFFFFF" : "#000000",
        "--bg": dark ? "#000000" : "transparent",
        "--mut": dark ? "rgba(255,255,255,.4)" : "rgba(0,0,0,.4)",
        "--pad": pad + "px",
        "--dur": "60s",
    }
    const tools = [...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS]
    const clients = [...CLIENTS, ...CLIENTS]
    return (
        <section ref={ref} className="lci-b" style={{ ...vars, ...(props.style || {}) }}>
            <style>{BLOCK_CSS}</style>
            <div className="lci-sec">
                <p className="lci-lab lci-in">Ferramentas</p>
                <div className="lci-mq">
                    <div className="lci-track" style={{ ["--dur" as any]: "80s" }}>
                        {tools.map(([ab, name], i) => (
                            <div className="lci-tool" key={i} aria-hidden={i >= TOOLS.length}>
                                <span className="lci-ic">{ab}</span>
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
                <p className="lci-note lci-in">E modelos de IA, e o que mais cada projeto pedir.</p>
            </div>
            <div className="lci-sec">
                <p className="lci-lab lci-in">Clientes</p>
                <div className="lci-mq">
                    <div className="lci-track rev" style={{ ["--dur" as any]: "90s" }}>
                        {clients.map((c, i) => (
                            <span className="lci-cl" key={i} aria-hidden={i >= CLIENTS.length}>
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="lci-in">
                <p className="lci-lab">Contato</p>
                <h2 className="lci-h">Tem um projeto em mente?</h2>
                <p className="lci-p">Conte a ideia e o prazo, e a gente resolve o resto junto.</p>
                <a className="lci-mail" href={"mailto:" + EMAIL}>
                    {EMAIL}
                </a>
            </div>
        </section>
    )
}

// Override: troca a camada pelo bloco (fundo claro)
export function withLCIBlock(Component): ComponentType {
    return (props: any) => <LCIBlock style={{ ...props.style, height: "auto" }} />
}

// Override: versão escura
export function withLCIBlockDark(Component): ComponentType {
    return (props: any) => <LCIBlock theme="dark" style={{ ...props.style, height: "auto" }} />
}
