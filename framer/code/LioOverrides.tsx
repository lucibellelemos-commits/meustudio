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
    ["", "+ modelos de IA"],
]

const LOGO_BASE = "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@a9e7c421fdff6c76ed97e66fc3f0e07cc186447d/clientes/preto/"

// [nome, arquivo, altura em px] — alturas ajustadas para equilibrar o peso visual
const CLIENTS: [string, string, number][] = [
    ["Havaianas", "havaianas.png", 20],
    ["Google", "google.png", 22],
    ["Eudora", "eudora.png", 17],
    ["Harper’s Bazaar", "harpers.png", 24],
    ["Buddemeyer", "buddemeyer.png", 20],
    ["SPFW", "spfw.png", 18],
    ["BVLGARI", "bvlgari.png", 12],
    ["Nubank", "nubank.png", 22],
    ["Itaú", "itau.png", 28],
    ["Lupo", "lupo.png", 18],
]

const EMAIL = "lucibellelemos@gmail.com"

const BLOCK_CSS = `
.lci-b{width:100%;box-sizing:border-box;padding:80px 0 8px;font-family:"Switzer","Switzer Placeholder",sans-serif;font-size:16px;font-weight:500;letter-spacing:-.01em;line-height:1.2;color:var(--fg);background:var(--bg)}
.lci-b *{box-sizing:border-box}
.lci-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,3fr);align-items:center;column-gap:20px;margin:0 var(--pad);padding:14px 0;border-top:1px solid var(--line)}
.lci-row{border-bottom:1px solid var(--line)}
.lci-lab{font-family:"Fragment Mono",monospace;font-size:10px;font-weight:400;letter-spacing:0;line-height:1;text-transform:uppercase;color:var(--fg)}
.lci-mq{position:relative;min-width:0;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}
.lci-track{display:flex;align-items:center;width:max-content;animation:lci-x var(--dur) linear infinite}
.lci-track.rev{animation-direction:reverse}
.lci-mq:hover .lci-track{animation-play-state:paused}
@keyframes lci-x{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.lci-it{display:flex;align-items:center;gap:6px;padding-right:32px;white-space:nowrap}
.lci-ic{width:16px;height:16px;border-radius:4px;border:1px solid currentColor;display:inline-flex;align-items:center;justify-content:center;font-family:"Fragment Mono",monospace;font-size:7px;font-weight:400;letter-spacing:0}
.lci-mut{color:var(--mut)}
.lci-logo{display:flex;align-items:center;height:36px;padding-right:56px}
.lci-logo img{display:block;width:auto;filter:var(--lf);opacity:.9}
.lci-cta{margin:120px var(--pad) 0;display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.lci-q{margin:0;font-size:clamp(24px,2.2vw,32px);letter-spacing:-.02em;line-height:1.1}
.lci-mail{color:var(--mut);text-decoration:none;background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .4s,color .3s}
.lci-mail:hover{color:var(--fg);background-size:100% 1px}
@media (max-width:809px){.lci-logo{padding-right:40px}.lci-logo img{transform:scale(.85)}.lci-b{padding-top:56px}.lci-cta{margin-top:80px}.lci-row{grid-template-columns:1fr;row-gap:10px;padding-top:12px;padding-bottom:12px}}
@media (prefers-reduced-motion:reduce){.lci-track{animation:none}}
`

export function LCIBlock(props: any) {
    const dark = props.theme === "dark"
    const ref = React.useRef<HTMLElement>(null)
    const [pad, setPad] = React.useState(0)
    React.useEffect(() => {
        // alinha com a margem da logo no topo do site
        const fit = () => {
            const el = ref.current
            const logo = document.querySelector('[aria-label="LCI Studio"]') as HTMLElement | null
            if (!el || !logo) return
            setPad(Math.max(0, Math.round(logo.getBoundingClientRect().left - el.getBoundingClientRect().left)))
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
        "--line": dark ? "rgba(255,255,255,.15)" : "rgba(0,0,0,.1)",
        "--lf": dark ? "invert(1)" : "none",
        "--pad": pad + "px",
    }
    const clients = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS]
    return (
        <section ref={ref} className="lci-b" style={{ ...vars, ...(props.style || {}) }}>
            <style>{BLOCK_CSS}</style>
            <div className="lci-row">
                <span className="lci-lab">Clientes</span>
                <div className="lci-mq">
                    <div className="lci-track rev" style={{ ["--dur" as any]: "100s" }}>
                        {clients.map(([name, file, h], i) => (
                            <span className="lci-logo" key={i} aria-hidden={i >= CLIENTS.length}>
                                <img src={LOGO_BASE + file} alt={name} style={{ height: h }} loading="eager" draggable={false} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="lci-cta">
                <p className="lci-q">Tem um projeto em mente?</p>
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
