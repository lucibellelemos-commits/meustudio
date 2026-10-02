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
.lci-b{width:100%;box-sizing:border-box;padding:120px 0 40px;font-family:"Switzer","Inter Display","Inter",sans-serif;color:var(--fg);background:var(--bg);overflow:hidden}
.lci-b *{box-sizing:border-box}
.lci-lab{font-family:ui-monospace,"SF Mono","JetBrains Mono",Menlo,monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);padding:0 var(--pad);margin:0 0 28px}
.lci-mq{position:relative;width:100%;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.lci-track{display:flex;width:max-content;animation:lci-x var(--dur) linear infinite}
.lci-track.rev{animation-direction:reverse}
.lci-mq:hover .lci-track{animation-play-state:paused}
@keyframes lci-x{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.lci-tool{display:flex;align-items:center;gap:14px;padding:0 36px 0 0;white-space:nowrap;font-size:24px;letter-spacing:-.02em}
.lci-ic{width:38px;height:38px;border-radius:9px;border:1.5px solid var(--fg);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;letter-spacing:-.02em}
.lci-note{color:var(--mut);font-size:18px;padding:0 var(--pad);margin:28px 0 0}
.lci-cl{font-size:clamp(44px,6vw,88px);font-weight:500;letter-spacing:-.045em;line-height:1;white-space:nowrap;padding:0 .6em 0 0}
.lci-cl::after{content:"·";color:var(--mut);margin-left:.6em}
.lci-sec{margin-bottom:110px}
.lci-cta{padding:0 var(--pad)}
.lci-h{font-size:clamp(48px,7.4vw,112px);font-weight:500;letter-spacing:-.05em;line-height:.95;margin:0}
.lci-p{color:var(--mut);font-size:clamp(17px,1.6vw,22px);line-height:1.5;max-width:620px;margin:28px 0 0}
.lci-mail{display:inline-block;margin-top:70px;font-size:clamp(30px,5vw,72px);font-weight:500;letter-spacing:-.045em;color:var(--fg);text-decoration:none;border-bottom:2px solid transparent;transition:border-color .3s}
.lci-mail:hover{border-color:var(--fg)}
@media (max-width:809px){.lci-b{padding-top:80px}.lci-sec{margin-bottom:80px}.lci-tool{font-size:19px}.lci-ic{width:32px;height:32px;font-size:13px}.lci-mail{margin-top:48px;word-break:break-all}}
@media (prefers-reduced-motion:reduce){.lci-track{animation:none}}
`

export function LCIBlock(props: any) {
    const dark = props.theme === "dark"
    const vars: any = {
        "--fg": dark ? "#F2F2F2" : "#0A0A0A",
        "--bg": dark ? "#0A0A0A" : "transparent",
        "--mut": dark ? "rgba(242,242,242,.55)" : "rgba(10,10,10,.5)",
        "--pad": props.pad || "0px",
        "--dur": "60s",
    }
    const tools = [...TOOLS, ...TOOLS]
    const clients = [...CLIENTS, ...CLIENTS]
    return (
        <section className="lci-b" style={{ ...vars, ...(props.style || {}) }}>
            <style>{BLOCK_CSS}</style>
            <div className="lci-sec">
                <p className="lci-lab">Ferramentas</p>
                <div className="lci-mq">
                    <div className="lci-track" style={{ ["--dur" as any]: "70s" }}>
                        {tools.map(([ab, name], i) => (
                            <div className="lci-tool" key={i} aria-hidden={i >= TOOLS.length}>
                                <span className="lci-ic">{ab}</span>
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
                <p className="lci-note">E modelos de IA, e o que mais cada projeto pedir.</p>
            </div>
            <div className="lci-sec">
                <p className="lci-lab">Clientes</p>
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
            <div className="lci-cta">
                <h2 className="lci-h">
                    Tem um projeto
                    <br />
                    em mente?
                </h2>
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
