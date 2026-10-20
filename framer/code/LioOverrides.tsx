import * as React from "react"
import { createPortal } from "react-dom"
import type { ComponentType } from "react"

// Textos do LUCI Studio aplicados por override (template Nolan Barret)

const withText =
    (text: string) =>
    (Component): ComponentType =>
    (props: any) => <Component {...props} text={text} />

export const withSobre = withText("Sobre")
export const withArquivo = withText("Arquivo")
export const withContato = withText("Contato")

export const withIntro = withText(
    "LUCI Studio é um estúdio de design gráfico e interativo que trabalha na interseção entre design, tecnologia e cultura."
)

// Ajustes gerais: celular, legendas e contraste
const SITE_FIX_CSS = `
h1,h2,h3,h4,h5,h6,p,li,figcaption,.lci-q,.lci-sub{text-wrap:pretty}
h1,h2,h3{text-wrap:balance}
[data-luci-home-clone],[data-luci-home-clone] [data-framer-appear-id]{opacity:1!important;transform:none!important}
[data-luci-gallery-title]{position:relative!important;padding-right:125px!important;box-sizing:border-box!important}
[data-luci-home-card] p,[data-luci-pg-card] p{overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;max-width:100%}
.luci-template-caption span{color:#6f6f6f}
.luci-template-controls button[aria-pressed="true"]{color:#8a8a8a!important}
[data-framer-name="Right Column"] [data-framer-name="Link Wrapper"]:has(+div>a[href$="/imprint"])>[data-framer-component-type="RichTextContainer"],[data-framer-name="Right Column"] [data-framer-name="Link Wrapper"]:has(+div>a[href$="/creditos"])>[data-framer-component-type="RichTextContainer"]{display:none!important}
@media(max-width:809px){
[data-luci-gallery-buttons]{display:none!important}
[data-luci-gallery-title]{padding-right:0!important}
.luci-template-controls{grid-template-columns:1fr!important;gap:22px!important}
.luci-template-control{grid-template-columns:100px 1fr!important}
.luci-template-caption{display:grid!important;grid-template-columns:minmax(0,1fr);gap:2px}
.luci-template-caption .luci-template-details{margin-left:0!important;justify-self:start}
.luci-template-dot{display:none}
[data-framer-name="Project Container"]{padding-bottom:48px!important}
}
.luci-template-dot{font-style:normal}
`

const LOGO_CSS = `
.lio-logo,.lio-logo p,.lio-logo span{white-space:nowrap!important}
.lio-logo p,.lio-logo h1,.lio-logo h2,.lio-logo h3,.lio-logo h4,.lio-logo h5,.lio-logo h6{font-size:20px!important;line-height:1!important;letter-spacing:-0.06em!important;font-weight:500!important}
.lio-logo p::after{content:"®";display:inline-block;font-size:0.36em;letter-spacing:0;line-height:1;vertical-align:top;margin-left:0.12em;margin-top:0.05em}
`

const DOTS_CSS = `
.lci-dots{position:fixed;top:7px;left:var(--g,15px);right:var(--g,15px);height:4px;display:flex;justify-content:space-between;pointer-events:none;z-index:9;mix-blend-mode:difference}
.lci-dots i{width:4px;height:4px;border-radius:50%;background:#fff;display:block}
.lci-dots i.d{display:block}
@media (max-width:809px){.lci-dots i.d{display:none}}
`

// Linha de bolinhas no topo do site, alinhada às margens da logo
function GridDots() {
    const [g, setG] = React.useState(15)
    React.useEffect(() => {
        const fit = () => {
            const logo = document.querySelector(
                '[aria-label="LUCI Studio"]'
            ) as HTMLElement | null
            if (logo) setG(Math.round(logo.getBoundingClientRect().left))
        }
        fit()
        const t = setTimeout(fit, 500)
        window.addEventListener("resize", fit)
        return () => {
            clearTimeout(t)
            window.removeEventListener("resize", fit)
        }
    }, [])
    // 7 bolinhas no desktop, 4 no celular (as marcadas com "d" somem)
    const cls = ["", "d", "", "d", "", "d", ""]
    return (
        <div
            className="lci-dots"
            style={{ ["--g" as any]: g + "px" }}
            aria-hidden
        >
            <style>{DOTS_CSS}</style>
            {cls.map((c, i) => (
                <i key={i} className={c} />
            ))}
        </div>
    )
}

// Logo "LUCI Studio®" numa linha no lugar do nome do template (mantém a cor de cada variante)
export function withLioLogo(Component): ComponentType {
    return (props: any) => {
        const route = usePortfolioRoute()
        return (
            <React.Fragment key={route}>
                <style>{LOGO_CSS}</style>
                <style>{SITE_FIX_CSS}</style>
                <PortfolioStopMotion />
                <PortfolioCuration />
                <HomeHoverGalleries />
                <HomeGalleryControls />
                <HomeInfoToggle />
                <NewPortfolioMedia />
                <HomeBazaarMedia />
                <HomeExtraMedia
                    owner="Orbis"
                    match={["ORB_02.JPG", "ORB_04.JPG"]}
                    items={HOME_ORBIS_NEW}
                />
                <HomeExtraMedia
                    owner="Buddemeyer"
                    match={["Vision — Filme de produto"]}
                    items={HOME_BUDDEMEYER_NEW}
                />
                <HomeExtraMedia
                    owner="Unni"
                    match={["Unni — Collective Force"]}
                    items={HOME_UNNI_NEW}
                />
                <HomeMetaProject />
                <HomeBvlgariReplacement />
                <CleanVideoPresentation />
                <SilentSiteMedia />
                <style>{`[data-framer-name="Right Column"] div:has(>a[href$="/imprint"]),[data-framer-name="Right Column"] div:has(>a[href$="/creditos"]),[data-framer-name="Right Column"] [data-framer-component-type="RichTextContainer"]:has(+div>a[href$="/imprint"]),[data-framer-name="Right Column"] [data-framer-component-type="RichTextContainer"]:has(+div>a[href$="/creditos"]){display:none!important}`}</style>
                <PlaygroundLightbox />
                <BritneyRemakeVideo />
                <PlaygroundCuration />
                <CaptionLabels />
                <ViewportVideos />
                <OldPathRedirect />
                <NoOrphans />
                <ProjectRows />
                <Component
                    {...props}
                    text="LUCI Studio"
                    className={(props.className || "") + " lio-logo"}
                    aria-label="LUCI Studio"
                />
            </React.Fragment>
        )
    }
}

// Legendas que ainda vinham com nome de arquivo: mostra um rótulo legível
// sem mudar o texto original (as curadorias continuam lendo o nome antigo).
const CAPTION_LABELS: Record<string, string> = {
    "LYS_01.JPG": "Clínica LYS — Identidade 01",
    "LYS_02.JPG": "Clínica LYS — Identidade 02",
    "LYS_03.JPG": "Clínica LYS — Identidade 03",
    "LYS_04.JPG": "Clínica LYS — Identidade 04",
    "LYS_05.JPG": "Clínica LYS — Identidade 05",
    "ORB_02.JPG": "Orbis — Identidade visual",
    "ORB_04.JPG": "Orbis — Identidade visual",
    "AXIS_03.JPG": "AXIS — Estudo 03",
    "AXIS_05.JPG": "AXIS — Estudo 05",
    "AXIS_06.MP4": "AXIS — Estudo 06",
    "TELA_IA.MP4": "Tela IA — Estudo",
    "STILLS_MONICA_DICREDDO.MP4": "Mônica Di Creddo — Stills",
}
const CAPTION_LABELS_CSS = `
p[data-luci-label]{font-size:0!important;line-height:0!important}
p[data-luci-label]::after{content:attr(data-luci-label);display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--luci-label-fs,10px);line-height:var(--luci-label-lh,1.2);color:var(--luci-label-color,currentColor)}
`
function CaptionLabels() {
    React.useEffect(() => {
        let frame = 0
        // tamanho do texto: o mesmo de uma legenda vizinha com o mesmo estilo
        const measure = (p: HTMLElement) => {
            const twin = Array.from(
                document.querySelectorAll<HTMLElement>("p:not([data-luci-label])")
            ).find(
                (o) =>
                    o.className === p.className &&
                    o.getBoundingClientRect().width > 0
            )
            const cs = getComputedStyle(twin || p)
            if (parseFloat(cs.fontSize) > 0) {
                p.style.setProperty("--luci-label-fs", cs.fontSize)
                p.style.setProperty("--luci-label-lh", cs.lineHeight)
                p.style.setProperty("--luci-label-color", cs.color)
            }
        }
        const apply = () => {
            frame = 0
            document.querySelectorAll<HTMLElement>("p").forEach((p) => {
                if (p.hasAttribute("data-luci-label")) return
                const label = CAPTION_LABELS[p.textContent?.trim() || ""]
                if (!label) return
                measure(p)
                p.style.setProperty("font-size", "0px", "important")
                p.style.setProperty("line-height", "0", "important")
                p.setAttribute("data-luci-label", label)
            })
            // imagens sem descrição: usa a legenda do card
            document
                .querySelectorAll<HTMLImageElement>(
                    "[data-luci-home-card] img:not([alt]),[data-luci-home-card] img[alt=''],[data-luci-pg-card] img:not([alt]),[data-luci-pg-card] img[alt='']"
                )
                .forEach((img) => {
                    const card = img.closest<HTMLElement>(
                        "[data-luci-home-card],[data-luci-pg-card]"
                    )
                    const p = card?.querySelector<HTMLElement>("p")
                    const text =
                        p?.getAttribute("data-luci-label") ||
                        p?.textContent?.trim()
                    if (text) img.alt = text
                })
        }
        const remeasure = () => {
            document
                .querySelectorAll<HTMLElement>("p[data-luci-label]")
                .forEach(measure)
        }
        apply()
        const observer = new MutationObserver(() => {
            if (!frame) frame = window.setTimeout(apply, 60)
        })
        observer.observe(document.body, { childList: true, subtree: true })
        let resize = 0
        const onResize = () => {
            window.clearTimeout(resize)
            resize = window.setTimeout(remeasure, 150)
        }
        window.addEventListener("resize", onResize)
        return () => {
            observer.disconnect()
            window.removeEventListener("resize", onResize)
            window.clearTimeout(resize)
            if (frame) window.clearTimeout(frame)
        }
    }, [])
    return <style>{CAPTION_LABELS_CSS}</style>
}

// Projeto aberto: cada linha de imagens ocupa a largura toda (alturas iguais na linha)
function ProjectRows() {
    React.useEffect(() => {
        if (document.body.dataset.luciRowsOwner) return
        document.body.dataset.luciRowsOwner = "true"
        const ratio = (fig: HTMLElement) => {
            if (fig.hasAttribute("data-luci-r")) return
            const img = fig.querySelector("img")
            const video = fig.querySelector("video")
            const set = (w: number, h: number) => {
                if (!w || !h) return
                fig.style.setProperty("--r", String(Math.round((w / h) * 1000) / 1000))
                fig.setAttribute("data-luci-r", "")
            }
            if (img) {
                if (img.complete && img.naturalWidth)
                    set(img.naturalWidth, img.naturalHeight)
                else
                    img.addEventListener(
                        "load",
                        () => set(img.naturalWidth, img.naturalHeight),
                        { once: true }
                    )
            } else if (video) {
                if (video.videoWidth) set(video.videoWidth, video.videoHeight)
                else
                    video.addEventListener(
                        "loadedmetadata",
                        () => set(video.videoWidth, video.videoHeight),
                        { once: true }
                    )
            }
        }
        const scan = () =>
            document
                .querySelectorAll<HTMLElement>(".luci-project-story > figure")
                .forEach(ratio)
        scan()
        let timer = 0
        const mo = new MutationObserver(() => {
            if (!timer)
                timer = window.setTimeout(() => {
                    timer = 0
                    scan()
                }, 80)
        })
        mo.observe(document.body, { childList: true, subtree: true })
        return () => {
            mo.disconnect()
            if (timer) window.clearTimeout(timer)
            delete document.body.dataset.luciRowsOwner
        }
    }, [])
    return null
}

// Sem palavra sozinha na última linha (para navegadores sem text-wrap)
function NoOrphans() {
    React.useEffect(() => {
        if (typeof CSS !== "undefined" && CSS.supports?.("text-wrap", "pretty"))
            return
        const fix = () =>
            document
                .querySelectorAll<HTMLElement>("h1, h2, h3, .lci-q, .lci-sub")
                .forEach((el) => {
                    const walker = document.createTreeWalker(
                        el,
                        NodeFilter.SHOW_TEXT
                    )
                    let last: Text | null = null
                    let node: Node | null
                    while ((node = walker.nextNode()))
                        if ((node as Text).data.trim()) last = node as Text
                    if (!last) return
                    const text = last.data.replace(/\s+$/, "")
                    const i = text.lastIndexOf(" ")
                    if (i <= 0 || text.split(" ").length < 4) return
                    last.data =
                        text.slice(0, i) + "\u00a0" + text.slice(i + 1) +
                        last.data.slice(text.length)
                })
        fix()
        let timer = 0
        const mo = new MutationObserver(() => {
            if (!timer)
                timer = window.setTimeout(() => {
                    timer = 0
                    fix()
                }, 200)
        })
        mo.observe(document.body, { childList: true, subtree: true })
        return () => {
            mo.disconnect()
            if (timer) window.clearTimeout(timer)
        }
    }, [])
    return null
}

// Endereços antigos (/Info, /contact, /imprint) levam para os novos
const OLD_PATHS: Record<string, string> = {
    "/info": "/sobre",
    "/contact": "/contato",
    "/imprint": "/creditos",
}
function OldPathRedirect() {
    React.useEffect(() => {
        const path = window.location.pathname.replace(/\/$/, "").toLowerCase()
        const target = OLD_PATHS[path]
        if (target)
            window.location.replace(
                target + window.location.search + window.location.hash
            )
    }, [])
    return null
}

// Vídeos só tocam (e baixam) quando aparecem na tela; pausam ao sair.
function ViewportVideos() {
    React.useEffect(() => {
        if (document.body.dataset.luciViewportOwner) return
        document.body.dataset.luciViewportOwner = "true"
        const wants = (v: HTMLVideoElement) =>
            v.hasAttribute("data-luci-autoplay") || v.autoplay
        if (!("IntersectionObserver" in window)) {
            const playAll = () =>
                document
                    .querySelectorAll<HTMLVideoElement>("video")
                    .forEach((v) => {
                        if (wants(v) && v.paused) v.play().catch(() => {})
                    })
            playAll()
            const timer = window.setInterval(playAll, 1000)
            return () => {
                window.clearInterval(timer)
                delete document.body.dataset.luciViewportOwner
            }
        }
        const seen = new WeakSet<HTMLVideoElement>()
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const v = entry.target as HTMLVideoElement
                    if (entry.isIntersecting) {
                        if (wants(v) && v.paused) v.play().catch(() => {})
                    } else if (!v.paused) {
                        v.pause()
                    }
                })
            },
            { rootMargin: "200px 0px" }
        )
        const scan = () => {
            document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
                if (seen.has(v)) return
                seen.add(v)
                // sem capa: mostra o primeiro quadro em vez de um bloco vazio
                const src = v.getAttribute("src")
                if (
                    src &&
                    !v.poster &&
                    v.paused &&
                    v.hasAttribute("data-luci-autoplay") &&
                    !src.includes("#t=")
                )
                    v.setAttribute("src", src + "#t=0.1")
                io.observe(v)
            })
            // links internos abrem na mesma aba
            document
                .querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')
                .forEach((a) => {
                    const href = a.getAttribute("href") || ""
                    if (href.startsWith("./") || href.startsWith("/"))
                        a.removeAttribute("target")
                })
        }
        scan()
        let timer = 0
        const mo = new MutationObserver(() => {
            if (!timer)
                timer = window.setTimeout(() => {
                    timer = 0
                    scan()
                }, 100)
        })
        mo.observe(document.body, { childList: true, subtree: true })
        return () => {
            io.disconnect()
            mo.disconnect()
            if (timer) window.clearTimeout(timer)
            delete document.body.dataset.luciViewportOwner
        }
    }, [])
    return null
}

function usePortfolioRoute() {
    const [route, setRoute] = React.useState("")
    React.useEffect(() => {
        const sync = () => setRoute(window.location.pathname.replace(/\/$/, ""))
        sync()
        const observer = new MutationObserver(sync)
        observer.observe(document.body, { childList: true, subtree: true })
        window.addEventListener("popstate", sync)
        const timer = window.setInterval(sync, 250)
        return () => {
            observer.disconnect()
            window.removeEventListener("popstate", sync)
            window.clearInterval(timer)
        }
    }, [])
    return route
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

const LOGO_BASE =
    "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@a9e7c421fdff6c76ed97e66fc3f0e07cc186447d/clientes/preto/"

// [nome, arquivo, altura em px] — alturas ajustadas para equilibrar o peso visual
const CLIENTS: [string, string, number][] = [
    ["Google", "google.png", 22],
    ["Harper’s Bazaar", "harpers.png", 24],
    ["BVLGARI", "bvlgari.png", 12],
    ["Havaianas", "havaianas.png", 20],
    ["Itaú", "itau.png", 28],
    ["Nubank", "nubank.png", 22],
    ["SPFW", "spfw.png", 18],
    ["Eudora", "eudora.png", 17],
    ["Buddemeyer", "buddemeyer.png", 20],
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
.lci-cta{margin:56px var(--pad) 0;display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.lci-sub{margin:0;max-width:520px;color:var(--mut);font-size:16px;line-height:1.4}
.lci-sub .lci-mail{color:var(--fg);background-size:100% 1px}
.lci-form{width:100%;max-width:560px;display:flex;flex-direction:column;gap:18px;margin-top:22px}
.lci-in{width:100%;font:inherit;font-size:16px;font-weight:500;color:var(--fg);background:transparent;border:0;border-bottom:1px solid var(--line);border-radius:0;padding:8px 0;outline:none;resize:none;appearance:none}
.lci-in::placeholder{color:var(--mut)}
.lci-in:focus{border-bottom-color:var(--fg)}
.lci-ta{min-height:72px}
.lci-actions{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 18px;margin-top:6px}
.lci-send{font:inherit;font-size:16px;font-weight:500;color:var(--fg);background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;text-underline-offset:4px}
.lci-note{font-size:14px;color:var(--mut)}
.lci-note .lci-mail{color:var(--fg)}
.lci-q{margin:0;font-size:clamp(24px,2.2vw,32px);letter-spacing:-.02em;line-height:1.1}
.lci-mail{color:var(--mut);text-decoration:none;background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .4s,color .3s}
.lci-mail:hover{color:var(--fg);background-size:100% 1px}
@media (max-width:809px){.lci-logo{padding-right:40px}.lci-logo img{transform:scale(.85)}.lci-b{padding-top:56px}.lci-cta{margin-top:40px}.lci-row{grid-template-columns:1fr;row-gap:10px;padding-top:12px;padding-bottom:12px}}
@media (prefers-reduced-motion:reduce){.lci-track{animation:none}}
`

// Formulário do bloco final: abre o e-mail já preenchido para o estúdio
function LCIForm() {
    const [name, setName] = React.useState("")
    const [mail, setMail] = React.useState("")
    const [msg, setMsg] = React.useState("")
    const [sent, setSent] = React.useState(false)
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        const subject = "Projeto — " + (name || "contato pelo site")
        const body =
            msg + "\n\n" + name + (mail ? "\n" + mail : "")
        window.location.href =
            "mailto:" +
            EMAIL +
            "?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body)
        setSent(true)
    }
    return (
        <form className="lci-form" onSubmit={submit}>
            <input
                className="lci-in"
                name="Nome"
                placeholder="Nome"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                className="lci-in"
                type="email"
                name="E-mail"
                placeholder="E-mail"
                autoComplete="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
            />
            <textarea
                className="lci-in lci-ta"
                name="Mensagem"
                placeholder="Mensagem"
                rows={3}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
            />
            <div className="lci-actions">
                <button className="lci-send" type="submit">
                    Enviar
                </button>
                <span className="lci-note">
                    {sent
                        ? "Abrimos o seu e-mail com a mensagem pronta."
                        : "ou escreva para "}
                    {!sent && (
                        <a className="lci-mail" href={"mailto:" + EMAIL}>
                            {EMAIL}
                        </a>
                    )}
                </span>
            </div>
        </form>
    )
}

export function LCIBlock(props: any) {
    const dark = props.theme === "dark"
    const ref = React.useRef<HTMLElement>(null)
    const [pad, setPad] = React.useState(0)
    React.useEffect(() => {
        // alinha com a margem da logo no topo do site
        const fit = () => {
            const el = ref.current
            const logo = document.querySelector(
                '[aria-label="LUCI Studio"]'
            ) as HTMLElement | null
            if (!el || !logo) return
            setPad(
                Math.max(
                    0,
                    Math.round(
                        logo.getBoundingClientRect().left -
                            el.getBoundingClientRect().left
                    )
                )
            )
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
        <section
            ref={ref}
            className="lci-b"
            style={{ ...vars, ...(props.style || {}) }}
        >
            <style>{BLOCK_CSS}</style>
            <div className="lci-row">
                <span className="lci-lab">Clientes</span>
                <div className="lci-mq">
                    <div
                        className="lci-track rev"
                        style={{ ["--dur" as any]: "100s" }}
                    >
                        {clients.map(([name, file, h], i) => (
                            <span
                                className="lci-logo"
                                key={i}
                                aria-hidden={i >= CLIENTS.length}
                            >
                                <img
                                    src={LOGO_BASE + file}
                                    alt={name}
                                    style={{ height: h }}
                                    loading="eager"
                                    draggable={false}
                                />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="lci-cta">
                <p className="lci-q">Vamos criar juntos?</p>
                <p className="lci-sub">
                    Conte sobre a sua marca, campanha ou ideia. Respondemos
                    por e-mail.
                </p>
                <LCIForm />
            </div>
        </section>
    )
}

// Override: troca a camada pelo bloco (fundo claro)
export function withLCIBlock(Component): ComponentType {
    return (props: any) => (
        <LCIBlock style={{ ...props.style, height: "auto" }} />
    )
}

// Override: versão escura
export function withLCIBlockDark(Component): ComponentType {
    return (props: any) => (
        <LCIBlock theme="dark" style={{ ...props.style, height: "auto" }} />
    )
}

// Organização editorial de Work — áreas e âncoras independentes do CMS.
const AREA_DATA = [
    [
        "branding",
        "Branding",
        "Identidades visuais e sistemas de marca, do conceito às aplicações.",
    ],
    [
        "ai-video",
        "Vídeo com IA",
        "Filmes criados com inteligência artificial e 3D, da pesquisa visual à finalização.",
    ],
    [
        "ai-foto",
        "Imagem com IA",
        "Stills, editoriais e imagens de produto com IA, com atenção à luz, à textura e ao detalhe.",
    ],
    [
        "motion",
        "Motion",
        "Marcas, livros e campanhas em movimento: animação, ritmo e tipografia.",
    ],
    [
        "design-grafico",
        "Design gráfico",
        "Ilustração, layouts e peças editoriais que levam a identidade para diferentes formatos.",
    ],
]
const WORK_CSS = `
[data-luci-work-root]{padding-top:100px!important;gap:0!important}
[data-luci-work-filter-hidden]{display:none!important}
.lci-work-intro{height:0!important;min-height:0!important;padding:0!important;font-family:Switzer,sans-serif;color:#000}
.lci-work-intro h1{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.lci-work-intro nav{position:fixed;left:28px;top:50%;transform:translateY(-50%);width:180px;z-index:20;display:flex;flex-direction:column;align-items:flex-start;gap:3px}
.lci-work-intro button{font-family:Switzer,Arial,sans-serif;font-size:16px;font-weight:400;letter-spacing:-.025em;line-height:1.2;text-transform:none;color:#ccc;background:none;border:0;padding:0;text-align:left;cursor:pointer;transition:color .2s}
.lci-work-intro button[aria-pressed="true"]{font-family:Switzer,Arial,sans-serif;font-size:16px;font-weight:400;color:#000;letter-spacing:-.025em}
.lci-work-intro button:hover{color:#000}
.lci-work-intro button:focus-visible{outline:1px solid #000;outline-offset:5px}
[data-luci-work-root] [data-framer-name="Section Projects"]{width:min(48vw,700px)!important;margin:0 auto!important;gap:30px!important;overflow:visible!important}
[data-luci-work-root] .lci-area{padding:0 0 24px;border:0;font-family:Switzer,sans-serif;color:#000}
[data-luci-work-root] .lci-area h2{font-size:14px;font-weight:400;margin:0 0 8px}
[data-luci-work-root] .lci-area>p{font-size:13px;line-height:1.45;max-width:460px;color:#777;margin:0}
[data-luci-work-root] [data-framer-name="Project Title"] p{font-size:16px!important;line-height:1.3!important}
[data-luci-work-media-gallery]{display:flex!important;flex-direction:column!important;align-items:center!important;gap:32px!important;width:100%!important;overflow:visible!important}
[data-luci-work-media-card]{width:var(--luci-work-width,76%)!important;flex:none!important;align-self:center!important;margin-inline:auto!important;min-width:0!important;height:auto!important}
[data-luci-work-media-card]>div{width:100%!important;height:auto!important}
[data-luci-work-media-card] [data-framer-name="Content Wrapper"]{height:auto!important;aspect-ratio:var(--luci-work-ratio,4/5)!important;min-height:0!important;width:100%!important}
[data-luci-work-media-card] [data-framer-name="Content Wrapper"]>div{width:100%!important;height:100%!important;position:absolute!important;inset:0!important}
[data-luci-work-media-card] img{object-fit:contain!important}
[data-luci-work-media-card] p{font-size:11px!important;line-height:1.4!important}
[data-luci-work-root] .luci-new-motion video{margin-inline:auto;max-height:70vh;height:auto}
[data-luci-work-root] .luci-new-motion h3{font-size:17px}
[data-luci-work-root] .luci-new-motion p{font-size:13px;color:#777;line-height:1.5}
[data-luci-work-root] .luci-work-batch{margin-top:24px}
[data-luci-work-root] .luci-work-batch-grid{display:flex;flex-direction:column;align-items:center;gap:32px}
[data-luci-work-root] .luci-work-batch figure{width:76%}
[data-luci-work-root] .luci-work-batch figure:nth-child(3n+2){width:100%}
[data-luci-work-root] .luci-work-batch-media{aspect-ratio:auto;background:transparent;max-height:none}
[data-luci-work-root] .luci-work-batch img,[data-luci-work-root] .luci-work-batch video{height:auto;max-height:70vh;object-fit:contain}
[data-luci-work-root] .luci-work-batch h3{font-size:17px}
[data-luci-work-root] .luci-work-batch article>p{font-size:13px;line-height:1.5;color:#777}

[data-luci-work-root] .lci-area>h2,[data-luci-work-root] .lci-area>p{display:none}
[data-luci-work-root] .lci-area{padding:0}
[data-luci-work-root] [data-framer-name="Project Title"] p{font-family:monospace!important;font-size:11px!important}
[data-luci-work-media-gallery]{gap:20px!important}
[data-luci-work-media-card]{max-width:calc(36vh * var(--luci-work-aspect,0.8))!important}
[data-luci-work-root] .luci-work-batch-grid{gap:20px}
[data-luci-work-root] .luci-work-batch figure{width:66%}
[data-luci-work-root] .luci-work-batch img,[data-luci-work-root] .luci-work-batch video,[data-luci-work-root] .luci-new-motion video{max-height:36vh}
[data-luci-work-root] .luci-work-batch h3,[data-luci-work-root] .luci-new-motion h3{font-family:monospace;font-size:11px;font-weight:400}
[data-luci-work-root] .luci-work-batch article>p,[data-luci-work-root] .luci-new-motion p{font-size:11px;max-width:440px;margin-inline:auto}
@media(max-width:809px){
[data-luci-work-root]{padding-top:140px!important}
.lci-work-intro nav{left:15px;right:15px;top:64px;transform:none;width:auto;flex-direction:row;flex-wrap:wrap;gap:5px 18px;background:#fff;padding:10px 0}
.lci-work-intro button,.lci-work-intro button[aria-pressed="true"]{font-size:13px;letter-spacing:0}
[data-luci-work-root] [data-framer-name="Section Projects"]{width:100%!important;max-width:600px!important;gap:44px!important}
[data-luci-work-media-card]{width:var(--luci-work-width,86%)!important}
[data-luci-work-root] .luci-work-batch figure{width:86%}
}
[data-luci-work-secondary]{display:none!important}
[data-luci-work-root] [data-framer-name="Sticky Area"]{display:none!important}
[data-luci-work-media-card]{width:100%!important;max-width:none!important}
[data-luci-work-media-card] [data-framer-name="Content Wrapper"]{aspect-ratio:16/9!important}
[data-luci-work-media-card] img{object-fit:cover!important}
[data-luci-work-media-card] p{display:none!important}
[data-luci-work-root] .luci-work-batch figure:not(:first-child){display:none}
[data-luci-work-root] .luci-work-batch figure{width:100%!important}
[data-luci-work-root] .luci-work-batch-media{aspect-ratio:16/9!important;overflow:hidden}
[data-luci-work-root] .luci-work-batch img,[data-luci-work-root] .luci-work-batch video{width:100%;height:100%;max-height:none;object-fit:cover}
[data-luci-work-root] .luci-work-batch article>h3,[data-luci-work-root] .luci-work-batch article>p,[data-luci-work-root] .luci-work-batch figcaption,[data-luci-work-root] .luci-work-batch article>nav,[data-luci-work-root] .luci-new-motion>h3,[data-luci-work-root] .luci-new-motion>p{display:none}
[data-luci-work-root] .luci-new-motion video{width:100%!important;height:auto;aspect-ratio:16/9;max-height:none;object-fit:cover}
.luci-project-info{width:100%;display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:12px 0 36px;font:11px monospace;color:#111}
.luci-project-info>button,.luci-project-dialog>button{font:11px monospace;background:none;border:0;padding:5px 0;text-decoration:underline;cursor:pointer;color:#111}
.luci-project-dialog{width:min(520px,calc(100vw - 48px));box-sizing:border-box;border:0;padding:32px;color:#111;background:#fff}
.luci-project-dialog::backdrop{background:rgba(0,0,0,.45)}
.luci-project-dialog>button{display:block;margin-left:auto}
.luci-project-dialog h2{font:24px Switzer,sans-serif;margin:24px 0 16px}
.luci-project-dialog p{font:16px/1.6 Switzer,sans-serif;white-space:pre-wrap}

.luci-project-info>button{display:none}
.luci-project-info[data-luci-details-active]>button{display:block;position:fixed;right:28px;top:50%;transform:translateY(-50%);z-index:1000;font-size:12px;padding:12px 0;background:white}
body:has([data-luci-work-root]) button[aria-label="Edit Framer Content"]{display:none!important}
@media(max-width:809px){.luci-project-info[data-luci-details-active]>button{right:15px;font-size:11px}}


@media(min-width:810px) and (max-width:1199px){.lci-work-intro nav{width:220px}.lci-work-intro button,.lci-work-intro button[aria-pressed="true"]{font-size:16px}}
@media(max-width:809px){.lci-work-intro button,.lci-work-intro button[aria-pressed="true"]{font-size:15px;font-weight:400;line-height:1.3;letter-spacing:0;text-transform:none}}

[data-luci-work-root] [data-framer-name="Project Container"]{padding:0!important;gap:0!important}
[data-luci-project-number]{gap:0!important;width:var(--luci-project-width)!important;max-width:none!important;margin-inline:auto!important;position:relative!important;overflow:visible!important;flex:none!important}
[data-luci-work-root] [data-framer-name="Section Projects"]{gap:22px!important}
[data-luci-work-root] .luci-work-batch-grid{gap:22px!important}
[data-luci-work-root] .luci-work-batch article{margin-bottom:22px!important}
.luci-project-info{padding:0!important;height:0!important;min-height:0!important;position:static!important}
.luci-project-info>span{display:none}
.luci-project-info::before{content:attr(data-number);position:absolute;bottom:0;left:-38px;font:10px monospace;color:#111}
[data-luci-project-side="right"]>.luci-project-info::before{left:auto;right:-38px}
@media(max-width:809px){[data-luci-project-number]{width:calc(var(--luci-project-width) * .85)!important}.luci-project-info::before{left:-24px}[data-luci-project-side="right"]>.luci-project-info::before{right:-24px}}

[data-luci-project-number]{width:100%!important}
[data-luci-project-number]>[data-luci-work-media-gallery],[data-luci-project-number]>.luci-work-batch-grid,[data-luci-project-number]>video{transform:scale(var(--luci-focus-scale,.48));transform-origin:center;transition:transform .22s ease-out;will-change:transform}
.luci-project-info::before{left:var(--luci-number-inset,-34px)!important;bottom:var(--luci-number-bottom,0)!important;transition:left .22s ease-out,right .22s ease-out,bottom .22s ease-out}
[data-luci-project-side="right"]>.luci-project-info::before{left:auto!important;right:var(--luci-number-inset,-34px)!important}
@media(prefers-reduced-motion:reduce){[data-luci-project-number]>*{transition:none!important}}

[data-luci-work-root] .lci-b{display:none!important}
`

// Curadoria exclusiva de Work. Os arquivos e as páginas dos projetos são preservados.
const WORK_OMITTED_CAPTIONS = new Set([
    "EMA_03.JPG",
    "EDX_02.JPG",
    "BAM_03.JPG",
    "AYS_01.JPG",
    "MSC_01.JPG",
    "IA — Cena do filme",
    "Google — Imagem em movimento",
    "Vision — Caimento do tecido",
    "UltraSoft — Fibras e volume",
    "UltraSoft — Toalhas",
    "Anel e esboços",
    "Conjunto de joias",
    "BVLGARI — Retrato ilustrado",
    "BVLGARI — Cena da boutique",
    "Index — Símbolo",
])
function WorkSelection() {
    React.useEffect(() => {
        const apply = () => {
            document
                .querySelectorAll('[data-framer-name="Project Title"] p')
                .forEach((paragraph) => {
                    if (paragraph.textContent?.trim() !== "Flávia Aranha")
                        return
                    let project = paragraph.parentElement
                    while (
                        project &&
                        !project.querySelector(
                            '[data-framer-name^="Project Item "]'
                        )
                    )
                        project = project.parentElement
                    project?.parentElement?.setAttribute(
                        "data-lci-work-hidden",
                        ""
                    )
                })

            document
                .querySelectorAll('[data-framer-name^="Project Item "]')
                .forEach((node) => {
                    const item = node as HTMLElement
                    if (
                        item.parentElement?.closest(
                            '[data-framer-name^="Project Item "]'
                        )
                    )
                        return
                    const caption = Array.from(item.querySelectorAll("p")).map(
                        (p) => p.textContent?.trim() || ""
                    )
                    const hidden = caption.some((text) =>
                        WORK_OMITTED_CAPTIONS.has(text)
                    )
                    if (hidden) item.setAttribute("data-lci-work-hidden", "")
                    else item.removeAttribute("data-lci-work-hidden")
                })
        }
        apply()
        const observer = new MutationObserver(apply)
        observer.observe(document.body, { childList: true, subtree: true })
        return () => {
            observer.disconnect()
            document
                .querySelectorAll("[data-lci-work-hidden]")
                .forEach((item) => item.removeAttribute("data-lci-work-hidden"))
        }
    }, [])
    return <style>{"[data-lci-work-hidden]{display:none!important}"}</style>
}

function installWorkDetails(
    project: HTMLElement,
    title: string,
    description: string
) {
    if (project.querySelector(":scope > .luci-project-info")) return
    const row = document.createElement("div")
    row.className = "luci-project-info"
    const name = document.createElement("span")
    name.textContent = title
    const button = document.createElement("button")
    button.type = "button"
    button.textContent = "DETALHES"
    button.setAttribute("aria-label", "Detalhes de " + title)
    const dialog = document.createElement("dialog")
    dialog.className = "luci-project-dialog"
    const close = document.createElement("button")
    close.type = "button"
    close.textContent = "FECHAR ×"
    const heading = document.createElement("h2")
    heading.textContent = title
    const body = document.createElement("p")
    body.textContent = description
    dialog.append(close, heading, body)
    button.onclick = () => dialog.showModal()
    close.onclick = () => dialog.close()
    dialog.onclick = (event) => {
        if (event.target === dialog) {
            const r = dialog.getBoundingClientRect()
            if (
                event.clientX < r.left ||
                event.clientX > r.right ||
                event.clientY < r.top ||
                event.clientY > r.bottom
            )
                dialog.close()
        }
    }
    row.append(name, button, dialog)
    project.append(row)
}

type WorkMedia = { src: string; poster: string; video: boolean }
type WorkEntry = {
    media: WorkMedia[]
    key: string
    title: string
    area: string
    description: string
    src: string
    poster: string
    video: boolean
    ratio: number
}
const WORK_TEMPLATE_CSS = `
[data-luci-work-root]:has(.luci-template){padding-top:110px!important}
[data-luci-work-root] [data-framer-name="Section Projects"]{display:none!important}
.lci-work-intro:has(.luci-template){height:auto!important;width:100%!important;padding:0 15px 100px!important;box-sizing:border-box}
.lci-work-intro .luci-template h1{position:static!important;width:auto!important;height:auto!important;overflow:visible!important;clip-path:none!important;font:500 clamp(64px,9.6vw,160px)/1 Switzer,Arial,sans-serif;letter-spacing:-.065em;margin:42px 0 110px;color:#000}
.luci-template-controls{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-bottom:115px;font:15px/1.4 Switzer,Arial,sans-serif}
.luci-template-control{display:grid;grid-template-columns:110px 1fr;align-items:start}
.luci-template .luci-template-controls nav{position:static!important;transform:none!important;width:auto!important;display:flex!important;flex-direction:column!important;gap:0!important;align-items:start!important;background:none!important;padding:0!important}
.lci-work-intro .luci-template button{font:inherit;color:#111;background:none;border:0;padding:0;cursor:pointer;text-align:left;letter-spacing:0}
.luci-template-controls button,.luci-template-controls button[aria-pressed="true"]{font:15px/1.4 Switzer,Arial,sans-serif!important;color:#111!important;letter-spacing:0!important}
.luci-template-controls button[aria-pressed="true"]{color:#aaa!important}
.luci-template button:focus-visible{outline:1px solid #111;outline-offset:4px}
.luci-template-gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;align-items:start}.luci-template-column{min-width:0}
.luci-template-card{break-inside:avoid;margin:0 0 76px;display:inline-block;width:100%;vertical-align:top}
.luci-template-image{display:block!important;width:100%;position:relative;overflow:hidden;background:#f5f5f5}
.luci-template-image img,.luci-template-image video{width:100%;height:auto;display:block;object-fit:cover}
.luci-template-image::after{content:'+';position:absolute;inset:0;display:grid;place-items:center;font:200 90px/1 Switzer,sans-serif;color:#fff;mix-blend-mode:difference;opacity:0;transition:opacity .18s}
.luci-template-image:hover::after{opacity:1}
.luci-template-caption{font:15px/1.4 Switzer,Arial,sans-serif;display:flex;align-items:baseline;gap:7px;padding-top:10px}
.luci-template-caption span{color:#888}
.luci-template-caption .luci-template-details{margin-left:auto;font-size:10px;text-decoration:underline;opacity:0}
.luci-template-card:hover .luci-template-details,.luci-template-details:focus-visible{opacity:1}
.luci-template-gallery[data-view="grid"]{columns:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:65px 6px}
.luci-template-gallery[data-view="grid"] .luci-template-card{margin:0}
.luci-template-gallery[data-view="grid"] .luci-template-image{aspect-ratio:1;height:auto!important;position:relative}
.luci-template-gallery[data-view="grid"] .luci-template-image img,.luci-template-gallery[data-view="grid"] .luci-template-image video{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:cover;object-position:center}
.luci-template-gallery[data-view="grid"] .luci-template-caption{min-height:42px}
.luci-template-gallery[data-view="grid"] img,.luci-template-gallery[data-view="grid"] video{height:100%}
.luci-template-gallery[data-view="list"]{columns:auto;display:flex;flex-direction:column;gap:0}
.luci-template-gallery[data-view="list"] .luci-template-card{display:grid;grid-template-columns:130px 1fr;gap:25px;border-top:1px solid #ddd;padding:16px 0;margin:0}
.luci-template-gallery[data-view="list"] .luci-template-image{aspect-ratio:16/9}
.luci-template-gallery[data-view="list"] img,.luci-template-gallery[data-view="list"] video{height:100%}
.luci-template-gallery[data-view="list"] .luci-template-caption{font-size:16px!important;line-height:1.4;align-items:center;padding:0}
.luci-template-gallery[data-view="list"] .luci-template-caption button{font-size:16px!important;line-height:1.4}
.luci-template-gallery[data-view="list"] .luci-template-caption .luci-template-details{font-size:12px!important;letter-spacing:.02em}
.luci-template-gallery[data-view="list"] .luci-template-details{opacity:1}
.luci-template-modal{padding:0;border:0;background:white;color:#111;width:min(960px,85vw);max-width:none;max-height:92vh;overflow:auto}
.luci-template-modal::backdrop{background:rgba(255,255,255,.96)}
.luci-template-modal img,.luci-template-modal video{display:block;width:100%;max-height:80vh;height:auto;object-fit:contain}
.luci-template-modal header{display:flex;justify-content:space-between;gap:20px;padding:16px 0;font:15px Switzer,sans-serif}
.luci-template-modal h2{font:28px Switzer,sans-serif;margin:24px 0 12px}
.luci-template-modal p{font:16px/1.6 Switzer,sans-serif;max-width:720px;white-space:pre-wrap;margin:0 0 40px}
@media(max-width:809px){[data-luci-work-root]:has(.luci-template){padding-top:80px!important}.lci-work-intro .luci-template h1{font-size:clamp(50px,11vw,86px);margin:25px 0 65px}.luci-template-controls{gap:16px;margin-bottom:65px}.luci-template-control{grid-template-columns:65px 1fr}.luci-template-controls button,.luci-template-controls button[aria-pressed="true"]{font-size:13px!important}.luci-template-gallery{grid-template-columns:repeat(2,minmax(0,1fr))}.luci-template-gallery[data-view="grid"]{grid-template-columns:repeat(2,minmax(0,1fr))}.luci-template-caption{font-size:12px;flex-wrap:wrap}.luci-template-caption .luci-template-details{opacity:1}.luci-template-card{margin-bottom:40px}.luci-template-modal{width:90vw}.luci-template-gallery[data-view="list"] .luci-template-caption{font-size:14px!important}
.luci-template-gallery[data-view="list"] .luci-template-caption button{font-size:14px!important}
.luci-template-gallery[data-view="list"] .luci-template-caption .luci-template-details{font-size:11px!important}}
@media(prefers-reduced-motion:reduce){.luci-template-image::after{transition:none}}

.luci-template-image::after{display:none!important}
/* Work: arrastar a imagem pra cima (com limite) revela o + e as infos */
.luci-template-gallery:not([data-view="list"]) .luci-template-card{position:relative;--lift:clamp(48px,4.8vw,76px)}
.luci-template-gallery:not([data-view="list"]) .luci-template-image{z-index:2;transform:translateY(var(--y,0px));transition:transform .55s cubic-bezier(.22,.8,.24,1);cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.luci-template-gallery:not([data-view="list"]) .luci-template-image img,.luci-template-gallery:not([data-view="list"]) .luci-template-image video{-webkit-user-drag:none;pointer-events:none}
.luci-template-gallery:not([data-view="list"]) .luci-template-card.is-dragging .luci-template-image{transition:none;cursor:grabbing}
.luci-template-hover{position:relative;z-index:1;display:block!important;width:100%;height:var(--lift,60px);margin-top:calc(-1 * var(--lift,60px));min-height:0!important;padding:0!important;border:0!important;background:#fff!important;overflow:hidden;opacity:var(--p,0);transition:opacity .3s ease;cursor:pointer}
.luci-template-gallery:not([data-view="list"]) .luci-template-card.is-dragging .luci-template-hover{transition:none}
.luci-template-hover::before,.luci-template-hover::after{content:'';position:absolute;left:50%;top:50%;background:#777;transform:translate(-50%,-50%)}
.luci-template-hover::before{width:clamp(30px,2.6vw,44px);height:1px}
.luci-template-hover::after{width:1px;height:clamp(30px,2.6vw,44px)}
@media(hover:hover) and (min-width:810px){
.luci-template-gallery:not([data-view="list"]) .luci-template-caption>span,.luci-template-gallery:not([data-view="list"]) .luci-template-caption .luci-template-details{opacity:var(--p,0);transition:opacity .3s ease}
.luci-template-gallery:not([data-view="list"]) .luci-template-card.is-dragging .luci-template-caption>span,.luci-template-gallery:not([data-view="list"]) .luci-template-card.is-dragging .luci-template-caption .luci-template-details{transition:none}
.luci-template-gallery:not([data-view="list"]) .luci-template-card:hover:not(.is-dragging):not(.is-open) .luci-template-image{transform:translateY(-6px)}
.luci-template-gallery:not([data-view="list"]) .luci-template-card:focus-within{--p:1}
}
@media(hover:none),(max-width:809px){.luci-template-hover{display:none!important}.luci-template-gallery:not([data-view="list"]) .luci-template-image{transform:none!important;cursor:pointer}}
.luci-template-gallery[data-view="list"] .luci-template-hover{display:none!important}
@media(prefers-reduced-motion:reduce){.luci-template-image,.luci-template-hover,.luci-template-caption>span,.luci-template-details{transition:none!important}}

.luci-template-modal{position:fixed;inset:0;margin:0;width:100vw!important;height:100dvh;max-height:none!important;max-width:none!important;padding:0!important;overflow-y:auto;background:#fff;border:0}
.luci-template-modal header{position:fixed;top:20px;left:50%;transform:translateX(-50%);width:min(560px,calc(100% - 40px));box-sizing:border-box;z-index:20;display:flex;align-items:center;justify-content:space-between;background:rgba(240,240,240,.86);backdrop-filter:blur(16px);border-radius:40px;padding:12px 20px!important;font:13px Switzer,Arial,sans-serif}
.luci-template-modal header button{font-size:13px!important}
.luci-project-story{padding-top:0;width:100%}
.luci-project-story figure{margin:0 auto 55px;display:flex;justify-content:center;align-items:center}
.luci-project-story .luci-project-hero{width:100%;min-height:100dvh;background:#fff}
.luci-project-story .luci-project-hero img,.luci-project-story .luci-project-hero video{width:100%;height:100dvh;max-height:none;object-fit:contain}
.luci-project-story .luci-project-frame{width:80%;max-width:1500px}
.luci-project-story .luci-project-frame:nth-child(2n+1){width:60%;max-width:1100px}
.luci-project-story .luci-project-frame img,.luci-project-story .luci-project-frame video{width:100%;height:auto;max-height:none;object-fit:contain}
.luci-project-credits{display:grid;grid-template-columns:1fr 1fr;gap:50px;padding:70px 8vw 100px}
.luci-project-credits h2{font:32px/1.15 Switzer,Arial,sans-serif;margin:0}.luci-project-credits p{font:16px/1.6 Switzer,Arial,sans-serif}.luci-project-credits button{font-size:14px!important;text-decoration:underline}
@media(max-width:809px){.luci-project-story .luci-project-frame{width:94%}.luci-project-story .luci-project-frame:nth-child(2n+1){width:80%}.luci-project-credits{grid-template-columns:1fr;gap:25px;padding:40px 20px 80px}}

@keyframes luci-project-enter{from{transform:translateY(100dvh)}to{transform:translateY(0)}}
@keyframes luci-project-backdrop{from{background:rgba(255,255,255,0)}to{background:rgba(255,255,255,.96)}}
.luci-template-modal[open]{animation:luci-project-enter .8s cubic-bezier(.22,1,.36,1) both;scroll-behavior:smooth;will-change:transform}
.luci-template-modal[open]::backdrop{animation:luci-project-backdrop .8s ease both}
/* Topo do projeto aberto no mesmo estilo do menu do site: logo à esquerda, X fino à direita, sem pílula */
.luci-template-modal header{top:0;left:0;right:0;transform:none;width:100%;border-radius:0;background:none;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none;padding:14px 15px!important;color:#fff;mix-blend-mode:difference;pointer-events:none}
.luci-template-modal header>span{font:500 20px/1 Switzer,Arial,sans-serif;letter-spacing:-.06em;white-space:nowrap;pointer-events:auto}.luci-story-brand-mark{font-size:.36em!important;letter-spacing:0;vertical-align:top;margin-left:.12em;position:relative;top:.05em}
.luci-template-modal header .luci-story-close{position:relative;width:28px;height:28px;background:none;border-radius:0;padding:0;margin-right:-6px;color:inherit;pointer-events:auto;cursor:pointer}
.luci-story-close::before,.luci-story-close::after{content:'';position:absolute;top:50%;left:50%;width:18px;height:1px;background:currentColor;transform:translate(-50%,-50%) rotate(45deg);transition:transform .3s ease}
.luci-story-close::after{transform:translate(-50%,-50%) rotate(-45deg)}
.luci-story-close:hover::before{transform:translate(-50%,-50%) rotate(135deg)}.luci-story-close:hover::after{transform:translate(-50%,-50%) rotate(45deg)}
.luci-project-meta{display:block;font:10px/1.4 "Fragment Mono",monospace;text-transform:uppercase;color:#111;margin:4px 0 14px}
.luci-project-story figure{margin:0 auto 12px}
.luci-project-story .luci-project-film.luci-project-hero{background:#000}
.luci-project-story .luci-project-frame{width:84%;max-width:1600px}
.luci-project-story .luci-project-frame:nth-child(2n+1){width:49%;max-width:1000px}
.luci-project-side-note{position:fixed;bottom:22px;left:20px;z-index:12;max-width:140px;display:flex;flex-direction:column;gap:5px;font:10px/1.4 Switzer,Arial,sans-serif;color:#888;pointer-events:none;mix-blend-mode:difference}
.luci-project-credits{padding-top:90px;padding-bottom:130px;border-top:1px solid #eee;margin:65px 6vw 0;grid-template-columns:1fr 1.4fr;gap:60px}
.luci-project-credits h2{font-size:24px;letter-spacing:-.025em}.luci-project-credits p{font-size:14px;line-height:1.7;color:#666}
@media(max-width:809px){.luci-project-side-note{left:12px;bottom:14px;max-width:110px;font-size:9px}.luci-project-story .luci-project-frame{width:92%}.luci-project-story .luci-project-frame:nth-child(2n+1){width:66%}.luci-project-credits{grid-template-columns:1fr;gap:20px;margin:45px 15px 0;padding:40px 0 90px}}
/* Projeto aberto: texto no topo e imagens em linhas de altura fixa, em tamanho contido */
.luci-template-modal[open]{display:flex;flex-direction:column}
.luci-project-side-note{display:none!important}
.luci-project-credits{order:-1;margin:0 15px;padding:120px 0 60px;border-top:0;border-bottom:1px solid #eee}
.luci-project-story{--h:clamp(240px,40vh,440px);columns:auto!important;display:flex;flex-wrap:wrap;align-items:flex-start;gap:6px;padding:40px 15px 140px;box-sizing:border-box;width:100%;max-width:none!important;margin:0!important}
.luci-project-story figure,.luci-project-story .luci-project-hero,.luci-project-story .luci-project-frame,.luci-project-story .luci-project-frame:nth-child(2n+1){width:auto!important;max-width:100%!important;height:var(--h);min-height:0!important;margin:0!important;display:block;background:#f5f5f5;overflow:hidden}
.luci-project-story .luci-project-film.luci-project-hero{background:#000}
.luci-project-story img,.luci-project-story video,.luci-project-story .luci-project-hero img,.luci-project-story .luci-project-hero video,.luci-project-story .luci-project-frame img,.luci-project-story .luci-project-frame video{height:100%!important;width:auto!important;max-width:100%;max-height:none!important;object-fit:cover;display:block}
@media(max-width:809px){.luci-project-credits{padding:90px 0 40px}.luci-project-story{--h:auto;padding:24px 15px 100px}.luci-project-story figure,.luci-project-story .luci-project-hero,.luci-project-story .luci-project-frame,.luci-project-story .luci-project-frame:nth-child(2n+1){width:100%!important;height:auto}.luci-project-story img,.luci-project-story video,.luci-project-story .luci-project-hero img,.luci-project-story .luci-project-hero video,.luci-project-story .luci-project-frame img,.luci-project-story .luci-project-frame video{width:100%!important;height:auto!important;max-height:70vh!important;object-fit:contain}}
@media(prefers-reduced-motion:reduce){.luci-template-modal[open]{animation:none;scroll-behavior:auto}}
@media(min-width:810px){.luci-project-story::after{content:"";flex-grow:9999}.luci-project-story figure[data-luci-r]{flex:var(--r) 1 calc(var(--h) * var(--r))!important;width:auto!important;height:auto!important;aspect-ratio:var(--r)}.luci-project-story figure[data-luci-r] img,.luci-project-story figure[data-luci-r] video{width:100%!important;height:100%!important;max-width:none;object-fit:cover}}
`
// Arrastar a imagem do card pra cima, até um limite, revelando o + e as infos
const liftMax = () => Math.min(76, Math.max(48, window.innerWidth * 0.048))
function liftStart(e: React.PointerEvent<HTMLElement>) {
    if (e.button !== 0 || e.pointerType === "touch") return
    const el = e.currentTarget
    const card = el.closest(".luci-template-card") as HTMLElement | null
    if (!card || el.closest('[data-view="list"]')) return
    const max = liftMax()
    const start = parseFloat(card.style.getPropertyValue("--y")) || 0
    const y0 = e.clientY
    let moved = false
    let y = -start
    card.classList.add("is-dragging")
    const move = (ev: PointerEvent) => {
        const dy = y0 - ev.clientY - start
        if (Math.abs(y0 - ev.clientY) > 4) moved = true
        let v = Math.max(0, dy)
        if (v > max) v = max + Math.min(10, (v - max) * 0.2)
        y = v
        card.style.setProperty("--y", -v + "px")
        card.style.setProperty("--p", String(Math.min(1, v / max)))
    }
    const up = () => {
        window.removeEventListener("pointermove", move)
        window.removeEventListener("pointerup", up)
        window.removeEventListener("pointercancel", up)
        card.classList.remove("is-dragging")
        if (moved) el.dataset.dragged = "1"
        if (y > max * 0.45) {
            card.classList.add("is-open")
            card.style.setProperty("--y", -max + "px")
            card.style.setProperty("--p", "1")
        } else liftReset(card)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    window.addEventListener("pointercancel", up)
}
function liftReset(target: HTMLElement | React.SyntheticEvent<HTMLElement>) {
    const card = (
        "currentTarget" in target ? target.currentTarget : target
    ) as HTMLElement
    if (card.classList.contains("is-dragging")) return
    card.classList.remove("is-open")
    card.style.setProperty("--y", "0px")
    card.style.setProperty("--p", "0")
}
const wasDragged = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    if (el.dataset.dragged) {
        delete el.dataset.dragged
        return true
    }
    return false
}

function WorkTemplate() {
    const [entries, setEntries] = React.useState<WorkEntry[]>([])
    const [area, setArea] = React.useState("all")
    const [view, setView] = React.useState("grid")
    const [columns, setColumns] = React.useState(4)
    React.useEffect(() => {
        const resize = () => setColumns(innerWidth <= 809 ? 2 : 4)
        resize()
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    }, [])
    const [opened, setOpened] = React.useState<WorkEntry | null>(null)
    const modal = React.useRef<HTMLDialogElement>(null)
    React.useEffect(() => {
        let signature = ""
        const collect = () => {
            const found: WorkEntry[] = []
            const keys = new Set<string>()
            document
                .querySelectorAll<HTMLElement>(
                    "[data-luci-work-area] .luci-project-info"
                )
                .forEach((row) => {
                    const project = row.parentElement
                    const parent = row.closest("[data-luci-work-area]")
                    if (
                        !project ||
                        !parent ||
                        project.closest("[data-lci-work-hidden]")
                    )
                        return
                    const scope =
                        project.querySelector(
                            "[data-luci-work-media-card]:not([data-luci-work-secondary]):not([data-lci-work-hidden])"
                        ) ||
                        project.querySelector("figure") ||
                        project
                    const video = scope.querySelector<HTMLVideoElement>("video")
                    const image = scope.querySelector<HTMLImageElement>("img")
                    const src =
                        video?.getAttribute("src") ||
                        image?.getAttribute("src") ||
                        ""
                    if (!src) return
                    const title =
                        row.querySelector("span")?.textContent?.trim() ||
                        "Projeto"
                    const id =
                        parent.getAttribute("data-luci-work-area") || "branding"
                    const key = id + ":" + title
                    if (keys.has(key)) return
                    keys.add(key)
                    const seenMedia = new Set<string>()
                    const media: WorkMedia[] = Array.from(
                        project.querySelectorAll<
                            HTMLImageElement | HTMLVideoElement
                        >("img,video")
                    )
                        .map((node) => ({
                            src: node.getAttribute("src") || "",
                            poster:
                                node instanceof HTMLVideoElement
                                    ? node.poster
                                    : "",
                            video: node instanceof HTMLVideoElement,
                        }))
                        .filter((m) => {
                            if (!m.src || seenMedia.has(m.src)) return false
                            seenMedia.add(m.src)
                            return true
                        })
                    found.push({
                        media,
                        key,
                        title,
                        area: id,
                        description:
                            row.querySelector("dialog p")?.textContent || "",
                        src,
                        poster: video?.poster || "",
                        video: !!video,
                        ratio:
                            Number(image?.getAttribute("width")) /
                                Number(image?.getAttribute("height")) || 1,
                    })
                })
            const next = JSON.stringify(found)
            if (next !== signature) {
                signature = next
                setEntries(found)
            }
        }
        collect()
        const observer = new MutationObserver(collect)
        observer.observe(document.body, { childList: true, subtree: true })
        return () => observer.disconnect()
    }, [])
    React.useEffect(() => {
        if (opened) {
            if (!modal.current?.open) modal.current?.showModal()
            if (modal.current) modal.current.scrollTop = 0
            const old = document.body.style.overflow
            document.body.style.overflow = "hidden"
            return () => {
                document.body.style.overflow = old
            }
        }
    }, [opened])
    const label =
        area === "all"
            ? "Work"
            : AREA_DATA.find(([id]) => id === area)?.[1] || "Work"
    const items = entries.filter((e) => area === "all" || e.area === area)
    const close = () => {
        modal.current?.close()
        setOpened(null)
    }
    const card = (entry: WorkEntry) => (
        <article
            className="luci-template-card"
            key={entry.key}
            onMouseLeave={liftReset}
        >
            <button
                className="luci-template-image"
                aria-label={"Ampliar " + entry.title}
                onPointerDown={liftStart}
                onClick={(e) => {
                    if (!wasDragged(e)) setOpened(entry)
                }}
            >
                {entry.video ? (
                    <video
                        src={entry.src}
                        poster={entry.poster}
                        muted
                        data-luci-autoplay=""
                        loop
                        playsInline
                        preload="metadata"
                        draggable={false}
                    />
                ) : (
                    <img
                        src={entry.src}
                        alt={entry.title}
                        loading="lazy"
                        draggable={false}
                    />
                )}
            </button>
            <button
                className="luci-template-hover"
                aria-label={"Ver projeto " + entry.title}
                onClick={() => setOpened(entry)}
            />
            <div className="luci-template-caption">
                <button onClick={() => setOpened(entry)}>{entry.title}</button>
                <span>
                    <i className="luci-template-dot">· </i>
                    {AREA_DATA.find(([id]) => id === entry.area)?.[1]}
                </span>
                <button
                    className="luci-template-details"
                    onClick={() => setOpened(entry)}
                >
                    DETALHES
                </button>
            </div>
        </article>
    )
    return (
        <section className="luci-template">
            <style>{WORK_TEMPLATE_CSS}</style>
            <h1>{label}</h1>
            <div className="luci-template-controls">
                <div className="luci-template-control">
                    <span>Serviços</span>
                    <nav aria-label="Filtrar projetos por serviço">
                        {[
                            ["all", "Todos"],
                            ...AREA_DATA.map(([id, name]) => [id, name]),
                        ].map(([id, name]) => (
                            <button
                                key={id}
                                aria-pressed={area === id}
                                onClick={() => setArea(id)}
                            >
                                {name}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="luci-template-control">
                    <span>Visualização</span>
                    <nav aria-label="Visualização da galeria">
                        {[
                            ["grid", "Grid"],
                            ["list", "Lista"],
                        ].map(([id, name]) => (
                            <button
                                key={id}
                                aria-pressed={view === id}
                                onClick={() => setView(id)}
                            >
                                {name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            <div className="luci-template-gallery" data-view={view}>
                {items.map(card)}
            </div>
            <dialog
                className="luci-template-modal"
                ref={modal}
                onCancel={() => setOpened(null)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        const r = event.currentTarget.getBoundingClientRect()
                        if (
                            event.clientX < r.left ||
                            event.clientX > r.right ||
                            event.clientY < r.top ||
                            event.clientY > r.bottom
                        )
                            close()
                    }
                }}
            >
                {opened && (
                    <>
                        <header>
                            <span>
                                LUCI Studio
                                <span className="luci-story-brand-mark">
                                    ®
                                </span>
                            </span>
                            <button
                                className="luci-story-close"
                                aria-label="Fechar projeto"
                                onClick={close}
                            />
                        </header>
                        <div className="luci-project-side-note">
                            <span>{opened.title}</span>
                            <span>
                                {
                                    AREA_DATA.find(
                                        ([id]) => id === opened.area
                                    )?.[1]
                                }
                            </span>
                        </div>
                        <div className="luci-project-story">
                            {(opened.media.length
                                ? opened.media
                                : [opened]
                            ).map((media, index) => (
                                <figure
                                    key={media.src}
                                    className={
                                        (index === 0
                                            ? "luci-project-hero"
                                            : "luci-project-frame") +
                                        (media.video
                                            ? " luci-project-film"
                                            : "")
                                    }
                                >
                                    {media.video ? (
                                        <video
                                            src={media.src}
                                            poster={media.poster}
                                            muted
                                            data-luci-autoplay=""
                                            loop
                                            playsInline
                                            controls={false}
                                            preload="metadata"
                                        />
                                    ) : (
                                        <img
                                            src={media.src}
                                            alt={
                                                opened.title +
                                                " — " +
                                                (index + 1)
                                            }
                                            loading={
                                                index === 0 ? "eager" : "lazy"
                                            }
                                        />
                                    )}
                                </figure>
                            ))}
                        </div>
                        <section className="luci-project-credits">
                            <h2>{opened.title}</h2>
                            <div>
                                {(() => {
                                    // A descrição vem no formato "Título — , — Categoria — , — Ano — Texto"
                                    const parts = (opened.description || "")
                                        .split(" — ")
                                        .map((s) => s.trim())
                                        .filter((s) => s && s !== ",")
                                    const text = parts.reduce(
                                        (a, b) => (b.length > a.length ? b : a),
                                        ""
                                    )
                                    const meta = parts.filter(
                                        (s) => s !== text && s !== opened.title
                                    )
                                    return (
                                        <>
                                            {meta.length > 0 && (
                                                <span className="luci-project-meta">
                                                    {meta.join(" · ")}
                                                </span>
                                            )}
                                            <p>{text}</p>
                                        </>
                                    )
                                })()}
                                <button onClick={close}>
                                    Voltar para Work
                                </button>
                            </div>
                        </section>
                    </>
                )}
            </dialog>
        </section>
    )
}

function WorkFilters({ style }: { style?: React.CSSProperties }) {
    const [selected, setSelected] = React.useState("branding")
    React.useEffect(() => {
        const sync = () => {
            const hash = window.location.hash.slice(1)
            if (AREA_DATA.some(([id]) => id === hash)) setSelected(hash)
        }
        sync()
        window.addEventListener("hashchange", sync)
        window.addEventListener("popstate", sync)
        return () => {
            window.removeEventListener("hashchange", sync)
            window.removeEventListener("popstate", sync)
        }
    }, [])
    React.useEffect(() => {
        if (window.location.pathname.replace(/\/$/, "") !== "/work") return
        const tagged = new Set<HTMLElement>()
        const roots = new Set<HTMLElement>()
        const mediaTags = new Set<HTMLElement>()
        const apply = () => {
            if (window.location.pathname.replace(/\/$/, "") !== "/work") return
            document
                .querySelectorAll<HTMLElement>(
                    'main [data-framer-name="Section Projects"]'
                )
                .forEach((container) => {
                    const main = container.closest<HTMLElement>("main")
                    if (main) {
                        main.setAttribute("data-luci-work-root", "")
                        roots.add(main)
                    }
                    container
                        .querySelectorAll<HTMLElement>(
                            '[data-framer-name^="Project Item "]'
                        )
                        .forEach((card) => {
                            if (
                                card.parentElement?.closest(
                                    '[data-framer-name^="Project Item "]'
                                )
                            )
                                return
                            const gallery = card.parentElement
                            if (gallery) {
                                gallery.setAttribute(
                                    "data-luci-work-media-gallery",
                                    ""
                                )
                                mediaTags.add(gallery)
                            }
                            card.setAttribute("data-luci-work-media-card", "")
                            mediaTags.add(card)
                            const siblings = gallery
                                ? Array.from(gallery.children).filter((e) =>
                                      e.hasAttribute("data-framer-name")
                                  )
                                : []
                            const i = siblings.indexOf(card)
                            card.style.setProperty(
                                "--luci-work-width",
                                i % 3 === 1 ? "100%" : "66%"
                            )
                            gallery?.parentElement?.style.setProperty(
                                "gap",
                                "18px"
                            )
                            const image = card.querySelector("img")
                            const w = Number(image?.getAttribute("width")),
                                h = Number(image?.getAttribute("height"))
                            if (w && h)
                                card.style.setProperty(
                                    "--luci-work-aspect",
                                    String(w / h)
                                )
                            if (w && h)
                                card.style.setProperty(
                                    "--luci-work-ratio",
                                    w + "/" + h
                                )
                        })
                    container
                        .querySelectorAll<HTMLElement>(
                            "[data-luci-work-media-gallery]"
                        )
                        .forEach((gallery) => {
                            const cards = Array.from(gallery.children).filter(
                                (e) =>
                                    e.hasAttribute(
                                        "data-luci-work-media-card"
                                    ) && !e.hasAttribute("data-lci-work-hidden")
                            )
                            cards.forEach((card, i) =>
                                card.toggleAttribute(
                                    "data-luci-work-secondary",
                                    i > 0
                                )
                            )
                            const project = gallery.parentElement
                            if (!project) return
                            const scope =
                                gallery.closest(
                                    '[data-framer-name="Project Container"]'
                                )?.parentElement || project
                            const title = scope.querySelector(
                                '[data-framer-name="Sticky Area"]'
                            )
                            const paragraphs = Array.from(
                                title?.querySelectorAll("p") || []
                            )
                                .map((p) => p.textContent?.trim() || "")
                                .filter(Boolean)
                            installWorkDetails(
                                project,
                                paragraphs[0] || "Projeto",
                                paragraphs.join(" — ")
                            )
                        })
                    container
                        .querySelectorAll<HTMLElement>(
                            ".luci-work-batch article, .luci-new-motion"
                        )
                        .forEach((project) => {
                            installWorkDetails(
                                project,
                                project.querySelector("h3")?.textContent ||
                                    "Projeto",
                                project.querySelector("p")?.textContent || ""
                            )
                        })
                    let area = ""
                    Array.from(container.children).forEach((node) => {
                        const item = node as HTMLElement
                        const heading =
                            item.querySelector<HTMLElement>(".lci-area")
                        if (heading) area = heading.id
                        if (!area || item.querySelector(".lci-b")) return
                        item.setAttribute("data-luci-work-area", area)
                        tagged.add(item)
                        if (area !== selected)
                            item.setAttribute(
                                "data-luci-work-filter-hidden",
                                ""
                            )
                        else
                            item.removeAttribute("data-luci-work-filter-hidden")
                    })
                })
        }
        apply()
        const observer = new MutationObserver(apply)
        observer.observe(document.body, { childList: true, subtree: true })
        return () => {
            observer.disconnect()
            document
                .querySelectorAll(".luci-project-info")
                .forEach((e) => e.remove())
            document
                .querySelectorAll("[data-luci-work-secondary]")
                .forEach((e) => e.removeAttribute("data-luci-work-secondary"))
            tagged.forEach((item) => {
                item.removeAttribute("data-luci-work-area")
                item.removeAttribute("data-luci-work-filter-hidden")
            })
            roots.forEach((root) => root.removeAttribute("data-luci-work-root"))
            mediaTags.forEach((item) => {
                item.removeAttribute("data-luci-work-media-gallery")
                item.removeAttribute("data-luci-work-media-card")
                item.style.removeProperty("--luci-work-width")
                item.style.removeProperty("--luci-work-ratio")
                item.style.removeProperty("--luci-work-aspect")
                if (item.hasAttribute("data-framer-name"))
                    item.parentElement?.parentElement?.style.removeProperty(
                        "gap"
                    )
            })
        }
    }, [selected])

    React.useEffect(() => {
        let frame = 0
        const update = () => {
            const rows = Array.from(
                document.querySelectorAll<HTMLElement>(".luci-project-info")
            )
            let visibleIndex = 0
            let closest: HTMLElement | null = null,
                distance = Infinity
            rows.forEach((row) => {
                const rect = row.parentElement?.getBoundingClientRect()
                if (!rect || !rect.width || !rect.height) return
                const index = visibleIndex++
                const project = row.parentElement as HTMLElement
                project.setAttribute(
                    "data-luci-project-number",
                    String(index + 1)
                )
                project.setAttribute(
                    "data-luci-project-side",
                    index % 2 === 0 ? "left" : "right"
                )
                project.style.setProperty("--luci-project-width", "100%")
                row.setAttribute("data-number", "(" + (index + 1) + ")")
                const d = Math.abs(
                    (rect.top + rect.bottom) / 2 - window.innerHeight / 2
                )
                if (d < distance) {
                    distance = d
                    closest = row
                }
            })
            rows.forEach((row) => {
                row.toggleAttribute("data-luci-details-active", row === closest)
                const project = row.parentElement as HTMLElement
                const rect = project.getBoundingClientRect()
                if (!rect.width || !rect.height) return
                const separation = Math.abs(
                    (rect.top + rect.bottom) / 2 - window.innerHeight / 2
                )
                const scale =
                    0.48 +
                    0.52 *
                        Math.max(
                            0,
                            1 - separation / (window.innerHeight * 0.62)
                        )
                project.style.setProperty("--luci-focus-scale", String(scale))
                project.style.setProperty(
                    "--luci-number-inset",
                    ((1 - scale) * rect.width) / 2 - 34 + "px"
                )
                project.style.setProperty(
                    "--luci-number-bottom",
                    ((1 - scale) * rect.height) / 2 + "px"
                )
            })
        }
        const schedule = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(update)
        }
        window.addEventListener("scroll", schedule, { passive: true })
        window.addEventListener("resize", schedule)
        const observer = new MutationObserver(schedule)
        observer.observe(document.body, { childList: true, subtree: true })
        schedule()
        return () => {
            cancelAnimationFrame(frame)
            observer.disconnect()
            window.removeEventListener("scroll", schedule)
            window.removeEventListener("resize", schedule)
        }
    }, [selected])
    const select = (id: string) => {
        setSelected(id)
        window.history.replaceState(window.history.state, "", "#" + id)
    }
    return (
        <header className="lci-work-intro" style={{ ...style, height: "auto" }}>
            <style>{WORK_CSS}</style>
            <WorkSelection />
            <WorkTemplate />
        </header>
    )
}
export function withWorkIntro(Component): ComponentType {
    return (props: any) => <WorkFilters style={props.style} />
}

const areaOverride =
    (index: number) =>
    (Component): ComponentType =>
    (props: any) => {
        const [id, name, description] = AREA_DATA[index]
        return (
            <section
                id={id}
                className="lci-area"
                style={{ ...props.style, height: "auto" }}
            >
                <style>{WORK_CSS}</style>
                <h2>{name}</h2>
                <p>{description}</p>
                {id === "motion" && <UnniStickerMotion />}
                {<NewWorkBatch area={id} />}
            </section>
        )
    }
export function withBrandingSection(Component): ComponentType {
    return areaOverride(0)(Component)
}
export function withAIVideoSection(Component): ComponentType {
    return areaOverride(1)(Component)
}
export function withAIPhotoSection(Component): ComponentType {
    return areaOverride(2)(Component)
}
export function withMotionSection(Component): ComponentType {
    return areaOverride(3)(Component)
}
export function withGraphicSection(Component): ComponentType {
    return areaOverride(4)(Component)
}

// Sequências de cortes secos com imagens do mesmo projeto.
const STOP_MOTION_PROJECTS = [
    {
        page: "work",
        caption: "EMA_01.JPG",
        label: "Ema Studio — ecobag e camiseta",
        frames: [
            "https://framerusercontent.com/images/BxvVorZsvqzahLF9d9hKqUfv4kk.jpg?width=1600&height=2000",
            "https://framerusercontent.com/images/QMZ1D47VAFaK6tzCNiOD7u3F41Q.jpg?width=2400&height=2400",
        ],
        hide: ["EMA_02.JPG"],
    },
    {
        page: "work",
        caption: "Esmebras — Anéis e pedra azul",
        label: "Esmebras — composição e detalhe de joias",
        frames: [
            "https://framerusercontent.com/images/IeuYbmzZB9rgzZL5iQFwwt9dLw.png?width=1122&height=1402",
            "https://framerusercontent.com/images/kjcFUTbSCB31sqlwpMq6bIXxVs.png?width=1122&height=1402",
        ],
        hide: ["Macro de pedra verde"],
    },
    {
        page: "playground",
        caption: "Mescla",
        label: "Mescla — identidade e aplicações",
        frames: [
            "https://framerusercontent.com/images/NqBRyHfSbHfgyQRWg1BhtAbifag.jpg?width=2400&height=1350",
            "https://framerusercontent.com/images/5PJl3Wwms8BDaw2h9HCe4kKB7w.jpg?width=2400&height=1350",
            "https://framerusercontent.com/images/AAwzGZ7K8vcbFw2NKOsDxEW7KT0.jpg?width=2400&height=1350",
        ],
        hide: [],
    },
]
function PortfolioStopMotion() {
    React.useEffect(() => {
        const page = window.location.pathname.replace(/\/$/, "").slice(1)
        const configs = STOP_MOTION_PROJECTS.filter(
            (config) => config.page === page
        )
        if (
            !configs.length ||
            document.body.hasAttribute("data-lci-stop-owner")
        )
            return
        document.body.setAttribute("data-lci-stop-owner", "")
        const originals = new Map<
            HTMLImageElement,
            { src: string; srcset: string | null; alt: string }
        >()
        const items = new Map<
            HTMLImageElement,
            { config: (typeof configs)[number]; index: number }
        >()
        const findCard = (paragraph: Element) => {
            let card = paragraph.parentElement
            while (card && !card.querySelector("img")) card = card.parentElement
            return card
        }
        const apply = () => {
            const paragraphs = Array.from(document.querySelectorAll("p"))
            configs.forEach((config) => {
                paragraphs
                    .filter((p) => p.textContent?.trim() === config.caption)
                    .forEach((p) => {
                        const card = findCard(p)
                        const image = card?.querySelector("img")
                        if (!image || items.has(image)) return
                        originals.set(image, {
                            src: image.src,
                            srcset: image.getAttribute("srcset"),
                            alt: image.alt,
                        })
                        items.set(image, { config, index: 0 })
                        image.removeAttribute("srcset")
                        image.src = config.frames[0]
                        image.alt = config.label
                        image.setAttribute("data-lci-stop-motion", config.label)
                        config.frames.forEach((src) => {
                            const preload = new Image()
                            preload.src = src
                        })
                    })
                paragraphs
                    .filter((p) =>
                        config.hide.includes(p.textContent?.trim() || "")
                    )
                    .forEach((p) => {
                        const card = findCard(p)
                        card?.parentElement?.setAttribute(
                            "data-lci-stop-omitted",
                            ""
                        )
                    })
            })
        }
        apply()
        const observer = new MutationObserver(apply)
        observer.observe(document.body, { childList: true, subtree: true })
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        const timer = window.setInterval(() => {
            if (reduced.matches || document.hidden) return
            items.forEach((state, image) => {
                const rect = image.getBoundingClientRect()
                if (rect.bottom <= 0 || rect.top >= window.innerHeight) return
                state.index = (state.index + 1) % state.config.frames.length
                image.src = state.config.frames[state.index]
            })
        }, 1000)
        return () => {
            observer.disconnect()
            window.clearInterval(timer)
            originals.forEach((original, image) => {
                image.src = original.src
                if (original.srcset)
                    image.setAttribute("srcset", original.srcset)
                image.alt = original.alt
                image.removeAttribute("data-lci-stop-motion")
            })
            document
                .querySelectorAll("[data-lci-stop-omitted]")
                .forEach((item) =>
                    item.removeAttribute("data-lci-stop-omitted")
                )
            document.body.removeAttribute("data-lci-stop-owner")
        }
    }, [])
    return <style>{"[data-lci-stop-omitted]{display:none!important}"}</style>
}

// Seleção revisada: frames recusados e proporções variadas apenas na home.
const REJECTED_CAPTIONS = new Set([
    "Vision — Caimento do tecido",
    "Vision — Detalhe do cetim",
    "UltraSoft — Fibras e volume",
    "UltraSoft — Toalhas",
    "ORB_01.JPG",
    "ORB_03.JPG",
    "ORB_05.JPG",
    "BTH_01.JPG",
    "BTH_02.JPG",
    "IA — Cena do filme",
    "SPFW — 30 anos",
    "BVLGARI — Retrato ilustrado",
    "Google — Imagem em movimento",
])
const REJECTED_ASSETS = [
    "fHxqHY2apKOsCNRMtxJAqL3xL2I.png",
    "EPCKz3RaZ0XELyP7lfgrT7ySLo.png",
    "newqvV14y5LReRO6HlabOKfEpPg.png",
    "1HsL0okefSZrFEVhZNNkaldRHg.png",
    "64vAqRCnOGKEZ57grcuMV69e0.jpg",
    "jOlFe1U6F2t8oFM14tEKU2rfGXA.jpg",
    "4nWSF14gIepIUNEB1wW630DCx4w.jpg",
    "N3VBDDMjTNS3XkVzE9G5MBGPQ.jpg",
    "YxJXAuuNnHmjwHB3r92VRivxpc.jpg",
]
const HOME_RHYTHM_CSS = `
[data-luci-rejected]{display:none!important}
[data-luci-home-card]{width:100%!important;align-self:start!important;justify-self:start!important;min-width:0!important}
[data-luci-home-card] [data-framer-name="Content Wrapper"]{aspect-ratio:var(--luci-card-ratio,1)!important;height:auto!important;min-height:0!important}
[data-luci-home-gallery]{column-gap:20px!important;row-gap:24px!important}
[data-luci-home-gallery="unni"]{grid-template-columns:repeat(3,minmax(0,1fr))!important}
@media(max-width:809px){[data-luci-home-gallery]{column-gap:10px!important;row-gap:20px!important}}
`
function PortfolioCuration() {
    React.useEffect(() => {
        if (document.body.hasAttribute("data-luci-curation-owner")) return
        document.body.setAttribute("data-luci-curation-owner", "")
        const isHome = window.location.pathname.replace(/\/$/, "") === ""
        const apply = () => {
            if ((window.location.pathname.replace(/\/$/, "") === "") !== isHome)
                return
            const roots = Array.from(
                document.querySelectorAll('[data-framer-name^="Project Item "]')
            ).filter(
                (item) =>
                    !item.parentElement?.closest(
                        '[data-framer-name^="Project Item "]'
                    )
            ) as HTMLElement[]
            const galleries = new Map<HTMLElement, HTMLElement[]>()
            roots.forEach((item) => {
                const captions = Array.from(item.querySelectorAll("p")).map(
                    (p) => p.textContent?.trim() || ""
                )
                const rejected =
                    (isHome &&
                        (captions.includes("Unni — Camisetas C.01") ||
                            (!captions.some(Boolean) &&
                                !item.querySelector("img,video")))) ||
                    captions.some((caption) =>
                        REJECTED_CAPTIONS.has(caption)
                    ) ||
                    Array.from(item.querySelectorAll("img")).some((image) =>
                        REJECTED_ASSETS.some((asset) =>
                            image.src.includes(asset)
                        )
                    )
                if (rejected) item.setAttribute("data-luci-rejected", "")
                if (
                    !isHome ||
                    rejected ||
                    !item.querySelector('[data-framer-name="Content Wrapper"]')
                )
                    return
                const gallery = item.parentElement
                if (!gallery) return
                gallery.setAttribute(
                    "data-luci-home-gallery",
                    captions.some((caption) => caption.startsWith("Unni"))
                        ? "unni"
                        : "regular"
                )
                if (!galleries.has(gallery)) galleries.set(gallery, [])
                galleries.get(gallery)!.push(item)
            })
            if (isHome)
                galleries.forEach((items) => {
                    const profiles = [
                        ["4 / 5", "100%"],
                        ["1", "100%"],
                        ["3 / 4", "100%"],
                        ["4 / 3", "100%"],
                        ["1", "100%"],
                    ]
                    items.forEach((item, index) => {
                        const [profileRatio, width] =
                            profiles[index % profiles.length]
                        const isBottehArt =
                            item.textContent?.includes("Botteh + Bravio")
                        const ratio = isBottehArt ? "4 / 5" : profileRatio
                        item.setAttribute(
                            "data-luci-home-card",
                            width === "88%" ? "small" : "regular"
                        )
                        item.style.setProperty("--luci-card-ratio", ratio)
                        item.style.setProperty("--luci-card-width", width)
                    })
                })
        }
        apply()
        const observer = new MutationObserver(apply)
        observer.observe(document.body, { childList: true, subtree: true })
        return () => {
            observer.disconnect()
            document
                .querySelectorAll("[data-luci-rejected]")
                .forEach((item) => item.removeAttribute("data-luci-rejected"))
            document
                .querySelectorAll("[data-luci-home-card]")
                .forEach((node) => {
                    const item = node as HTMLElement
                    item.removeAttribute("data-luci-home-card")
                    item.style.removeProperty("--luci-card-ratio")
                    item.style.removeProperty("--luci-card-width")
                })
            document
                .querySelectorAll("[data-luci-home-gallery]")
                .forEach((gallery) =>
                    gallery.removeAttribute("data-luci-home-gallery")
                )
            document.body.removeAttribute("data-luci-curation-owner")
        }
    }, [])
    return <style>{HOME_RHYTHM_CSS}</style>
}

const PLAYGROUND_REJECTED = new Set([
    "Aysù",
    "AQUARELUCI_02.JPG",
    "Bazaar — Texturas 02",
    "Bazaar — Texturas 04",
    "Bazaar — Texturas 05",
])
const PLAYGROUND_ORDER = [
    "Handtracking Flor",
    "Esferas 3D",
    "Objetos em equilíbrio",
    "Bravio — Sketch joias",
    "LOEWE Agua — Filme",
    "Pintura manual",
    "MBOOM Beauty — IA + 3D",
    "Volvo — Filme experimental",
    "Jeph GTA",
    "Mescla",
    "AXIS — Idoso",
    "Handtracking cerâmica",
    "Piscina — Estudo de imagem",
    "Remake Britney",
    "STILLS_MONICA_DICREDDO.MP4",
    "LOEWE Agua — Still",
    "The Substance — Kaiber",
    "Avião — Estudo de movimento",
    "AXIS_05.JPG",
    "TELA_IA.MP4",
    "Clipe poste fofo",
    "Bazaar — Texturas 01",
    "Moda — Filme experimental",
    "Remake Hannah Montana",
    "AXIS_03.JPG",
    "Bazaar — Texturas 03",
    "AXIS_06.MP4",
]
const PLAYGROUND_CSS = `
[data-luci-pg-hidden]{display:none!important}
[data-luci-pg-gallery]{grid-template-columns:repeat(auto-fill,minmax(110px,1fr))!important;column-gap:32px!important;row-gap:48px!important;align-items:start!important}
[data-luci-pg-card],[data-luci-pg-card="featured"]{width:110px!important;grid-column:span 1!important;align-self:start!important;justify-self:start!important;min-width:0!important}
[data-luci-pg-card] [data-framer-name="Content Wrapper"]{aspect-ratio:1!important;height:110px!important;min-height:0!important}
[data-luci-pg-card] img,[data-luci-pg-card] video{object-fit:contain!important}
@media(max-width:809px){[data-luci-pg-gallery]{grid-template-columns:repeat(auto-fill,minmax(96px,1fr))!important;column-gap:20px!important;row-gap:36px!important}[data-luci-pg-card],[data-luci-pg-card="featured"]{width:96px!important}[data-luci-pg-card] [data-framer-name="Content Wrapper"]{height:96px!important}}
`
function PlaygroundCuration() {
    React.useEffect(() => {
        if (
            window.location.pathname.replace(/\/$/, "") !== "/playground" ||
            document.body.hasAttribute("data-luci-pg-owner")
        )
            return
        document.body.setAttribute("data-luci-pg-owner", "")
        const featured = new Set([
            "Handtracking Flor",
            "MBOOM Beauty — IA + 3D",
            "Bravio — Sketch joias",
        ])
        const landscape = new Set([
            "Handtracking Flor",
            "LOEWE Agua — Filme",
            "LOEWE Agua — Still",
            "Mescla",
            "Bravio — Sketch joias",
            "MBOOM Beauty — IA + 3D",
        ])
        const apply = () => {
            if (window.location.pathname.replace(/\/$/, "") !== "/playground")
                return
            document
                .querySelectorAll('main [data-framer-name="Content Wrapper"]')
                .forEach((media, index) => {
                    const component = media.parentElement
                    const card = component?.parentElement
                    if (!card || !component) return
                    const caption =
                        component.querySelector("p")?.textContent?.trim() || ""
                    card.parentElement?.setAttribute("data-luci-pg-gallery", "")
                    const position = PLAYGROUND_ORDER.indexOf(caption)
                    card.style.order = String(
                        position < 0
                            ? PLAYGROUND_ORDER.length + index
                            : position
                    )
                    if (PLAYGROUND_REJECTED.has(caption)) {
                        card.setAttribute("data-luci-pg-hidden", "")
                        return
                    }
                    const columns = getComputedStyle(
                        card.parentElement!
                    ).gridTemplateColumns.split(" ").length
                    const large = featured.has(caption) && columns > 4
                    card.setAttribute(
                        "data-luci-pg-card",
                        large ? "featured" : "regular"
                    )
                    const ratio = landscape.has(caption)
                        ? large
                            ? "3 / 2"
                            : "4 / 3"
                        : ["4 / 5", "3 / 4", "1", "4 / 5"][index % 4]
                    card.style.setProperty("--luci-pg-ratio", ratio)
                })
        }
        apply()
        const observer = new MutationObserver(apply)
        observer.observe(document.body, { childList: true, subtree: true })
        window.addEventListener("resize", apply)
        return () => {
            observer.disconnect()
            window.removeEventListener("resize", apply)
            document
                .querySelectorAll("[data-luci-pg-hidden]")
                .forEach((card) => card.removeAttribute("data-luci-pg-hidden"))
            document.querySelectorAll("[data-luci-pg-card]").forEach((node) => {
                const card = node as HTMLElement
                card.removeAttribute("data-luci-pg-card")
                card.style.removeProperty("--luci-pg-ratio")
                card.style.removeProperty("order")
            })
            document
                .querySelectorAll("[data-luci-pg-gallery]")
                .forEach((gallery) =>
                    gallery.removeAttribute("data-luci-pg-gallery")
                )
            document.body.removeAttribute("data-luci-pg-owner")
        }
    }, [])
    return <style>{PLAYGROUND_CSS}</style>
}

const HOME_HOVER_CSS = `
[data-luci-home-gallery] > [data-luci-home-card][data-luci-natural]{flex:0 0 var(--luci-natural-width)!important;width:var(--luci-natural-width)!important}
[data-luci-home-gallery] [data-luci-home-card][data-luci-natural] [data-framer-name="Content Wrapper"]{aspect-ratio:var(--luci-natural-ratio)!important;height:auto!important;min-height:0!important}

[data-luci-home-gallery] > article[data-luci-home-card] > [data-framer-name="Content Wrapper"]{aspect-ratio:auto!important;height:auto!important;min-height:0!important}
[data-luci-home-gallery] > article[data-luci-home-card] video{display:block!important;width:100%!important;height:auto!important;max-width:none!important;object-fit:contain!important}

body[data-luci-hover-owner] [data-framer-name="Sticky Area"],body[data-luci-hover-owner] [data-framer-name="Sticky Area"] *{pointer-events:none!important}
body[data-luci-hover-owner] [data-framer-name="Sticky Area"] [data-framer-name="Project Bar"],body[data-luci-hover-owner] [data-framer-name="Sticky Area"] [data-framer-name="Project Bar"] *{pointer-events:auto!important}

[data-luci-home-gallery]{display:flex!important;flex-wrap:nowrap!important;align-items:flex-start!important;justify-content:flex-start!important;overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:none!important;scroll-behavior:auto!important;scroll-snap-type:none!important;overscroll-behavior-x:contain;--luci-gallery-gap:20px;column-gap:var(--luci-gallery-gap)!important}
[data-luci-home-gallery]::-webkit-scrollbar{display:none}
[data-luci-home-gallery]:focus-visible{outline:1px solid currentColor;outline-offset:6px}
[data-luci-home-gallery] > [data-luci-home-card]{flex:0 0 calc((100% - (var(--luci-visible-count,3) - 1)*var(--luci-gallery-gap))/var(--luci-visible-count,3))!important;width:calc((100% - (var(--luci-visible-count,3) - 1)*var(--luci-gallery-gap))/var(--luci-visible-count,3))!important}
@media(max-width:809px){[data-luci-home-gallery]{--luci-gallery-gap:10px;}}
@media(prefers-reduced-motion:reduce){[data-luci-home-gallery]{scroll-behavior:auto}}

[data-luci-home-gallery]{cursor:grab;touch-action:pan-y}
[data-luci-home-gallery] img{-webkit-user-drag:none;user-select:none}
[data-luci-home-gallery][data-luci-dragging]{cursor:grabbing;user-select:none}
`

function HomeInfoToggle() {
    React.useEffect(() => {
        if (
            window.location.pathname.replace(/\/$/, "") !== "" ||
            document.body.dataset.luciInfoOwner
        )
            return
        document.body.dataset.luciInfoOwner = "true"
        const setup = () =>
            document
                .querySelectorAll<HTMLElement>(
                    '[data-framer-name^="Project Bar"]'
                )
                .forEach((bar) => {
                    const icon = bar.querySelector<HTMLElement>(
                        '[data-framer-name="Icon Wrapper"]'
                    )
                    if (!icon) return
                    icon.setAttribute("role", "button")
                    icon.setAttribute("aria-label", "Informações do projeto")
                    icon.setAttribute(
                        "aria-expanded",
                        String(bar.hasAttribute("data-luci-info-open"))
                    )
                })
        const toggle = (e: Event) => {
            const icon =
                e.target instanceof Element
                    ? e.target.closest<HTMLElement>(
                          '[data-framer-name="Icon Wrapper"]'
                      )
                    : null
            const bar = icon?.closest<HTMLElement>(
                '[data-framer-name^="Project Bar"]'
            )
            if (!bar) return
            if (e instanceof KeyboardEvent && !["Enter", " "].includes(e.key))
                return
            e.preventDefault()
            e.stopImmediatePropagation()
            const open = bar.toggleAttribute("data-luci-info-open")
            icon!.setAttribute("aria-expanded", String(open))
        }
        const blockNative = (e: Event) => {
            if (
                e.target instanceof Element &&
                e.target.closest('[data-framer-name="Icon Wrapper"]')
            ) {
                e.preventDefault()
                e.stopImmediatePropagation()
            }
        }
        setup()
        const ob = new MutationObserver(setup)
        ob.observe(document.body, { childList: true, subtree: true })
        document.addEventListener("pointerdown", toggle, true)
        document.addEventListener("click", blockNative, true)
        document.addEventListener("keydown", toggle, true)
        return () => {
            ob.disconnect()
            document.removeEventListener("pointerdown", toggle, true)
            document.removeEventListener("click", blockNative, true)
            document.removeEventListener("keydown", toggle, true)
            delete document.body.dataset.luciInfoOwner
        }
    }, [])
    return (
        <style>{`body[data-luci-info-owner] [data-framer-name^="Project Bar"],body[data-luci-info-owner] [data-framer-name^="Project Bar"]>[data-framer-name="Container"]{height:auto!important;max-height:none!important;overflow:visible!important}
body[data-luci-info-owner] [data-framer-name^="Project Bar"] [data-framer-name="Info"]{display:grid!important;grid-template-rows:0fr;padding:0!important;position:relative!important;inset:auto!important;width:100%!important;min-width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;overflow:hidden!important;margin-top:0!important;opacity:0!important;visibility:hidden;flex:none!important;transition:grid-template-rows .5s cubic-bezier(.22,1,.36,1),margin-top .5s cubic-bezier(.22,1,.36,1),padding-bottom .5s cubic-bezier(.22,1,.36,1),opacity .3s ease,visibility .5s}
body[data-luci-info-owner] [data-luci-info-open] [data-framer-name="Info"]{grid-template-rows:1fr;margin-top:6px!important;padding-bottom:36px!important;opacity:1!important;visibility:visible}
body[data-luci-info-owner] [data-framer-name^="Project Bar"] [data-framer-name="Info"]>div{min-height:0!important;overflow:hidden!important;width:100%!important;min-width:100%!important;max-width:none!important;position:relative!important}
body[data-luci-info-owner] [data-framer-name^="Project Bar"] [data-framer-name="Info"] p{width:100%!important;max-width:720px!important;white-space:normal!important;font-size:16px!important;line-height:1.5!important;margin:0!important;transform:translateY(6px);transition:transform .5s cubic-bezier(.22,1,.36,1)}
body[data-luci-info-owner] [data-luci-info-open] [data-framer-name="Info"] p{transform:translateY(0)}
body[data-luci-info-owner] [data-framer-name="Icon Wrapper"]{position:relative;cursor:pointer;min-width:24px;min-height:24px}
body[data-luci-info-owner] [data-framer-name="Icon Wrapper"]>*{visibility:hidden!important}
body[data-luci-info-owner] [data-framer-name="Icon Wrapper"]::before,body[data-luci-info-owner] [data-framer-name="Icon Wrapper"]::after{content:'';position:absolute;left:50%;top:50%;background:#111;transform:translate(-50%,-50%);transition:opacity .25s ease,transform .35s ease}
body[data-luci-info-owner] [data-framer-name="Icon Wrapper"]::after{width:22px;height:1px}
body[data-luci-info-owner] [data-framer-name="Icon Wrapper"]::before{width:1px;height:22px}
body[data-luci-info-owner] [data-luci-info-open] [data-framer-name="Icon Wrapper"]::before{opacity:0;transform:translate(-50%,-50%) rotate(90deg)}
@media(prefers-reduced-motion:reduce){body[data-luci-info-owner] [data-framer-name="Info"],body[data-luci-info-owner] [data-framer-name="Info"] p{transition:none}}
`}</style>
    )
}

function HomeGalleryControls() {
    React.useEffect(() => {
        if (
            window.location.pathname.replace(/\/$/, "") !== "" ||
            document.body.dataset.luciGalleryControls
        )
            return
        document.body.dataset.luciGalleryControls = "true"
        const hosts = new Map<HTMLElement, HTMLElement>()
        const setup = () =>
            document
                .querySelectorAll<HTMLElement>("[data-luci-home-gallery]")
                .forEach((g) => {
                    if (hosts.has(g) || g.hasAttribute("data-luci-bvg-old"))
                        return
                    const block =
                        g.closest(
                            '[data-framer-name="2 Column - Mobile"], [data-framer-name="4 Column - Desktop"]'
                        ) || g.parentElement
                    const native = block?.querySelector<HTMLElement>(
                        '[data-framer-name="Layout Toggle"]'
                    )
                    if (!block) return
                    const host = document.createElement("div")
                    host.dataset.luciGalleryButtons = "true"
                    Object.assign(host.style, {
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        pointerEvents: "auto",
                    })
                    const values = [2, 3, 5]
                    values.forEach((count, i) => {
                        const b = document.createElement("button")
                        b.type = "button"
                        b.setAttribute(
                            "aria-label",
                            [
                                "Imagens grandes",
                                "Imagens médias",
                                "Imagens pequenas",
                            ][i]
                        )
                        Object.assign(b.style, {
                            border: "0",
                            padding: "3px",
                            background: "transparent",
                            cursor: "pointer",
                            width: "27px",
                            height: "27px",
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(" + [2, 2, 3][i] + ",1fr)",
                            gap: "2px",
                        })
                        for (let n = 0; n < [2, 4, 9][i]; n++) {
                            const cell = document.createElement("span")
                            cell.style.background = "currentColor"
                            b.appendChild(cell)
                        }
                        const update = () =>
                            Array.from(host.children).forEach((btn, j) => {
                                btn.setAttribute(
                                    "aria-pressed",
                                    String(
                                        values[j] ===
                                            Number(g.dataset.luciColumns || 3)
                                    )
                                )
                                ;(btn as HTMLElement).style.color =
                                    values[j] ===
                                    Number(g.dataset.luciColumns || 3)
                                        ? "#000"
                                        : "#bbb"
                            })
                        b.addEventListener("click", (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            g.dataset.luciColumns = String(count)
                            g.scrollLeft = 0
                            window.dispatchEvent(new Event("resize"))
                            update()
                        })
                        host.appendChild(b)
                        update()
                    })
                    if (native) {
                        native.style.setProperty("display", "none", "important")
                        native.insertAdjacentElement("afterend", host)
                        const title = native.parentElement
                        if (title) title.dataset.luciGalleryTitle = "true"
                        Object.assign(host.style, {
                            position: "absolute",
                            right: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: "10",
                            margin: "0",
                        })
                    } else {
                        host.style.marginBottom = "12px"
                        g.insertAdjacentElement("beforebegin", host)
                    }
                    hosts.set(g, host)
                })
        setup()
        const ob = new MutationObserver(setup)
        ob.observe(document.body, { childList: true, subtree: true })
        return () => {
            ob.disconnect()
            hosts.forEach((h) => h.remove())
            delete document.body.dataset.luciGalleryControls
        }
    }, [])
    return null
}

function HomeHoverGalleries() {
    React.useEffect(() => {
        if (
            window.location.pathname.replace(/\/$/, "") !== "" ||
            document.body.hasAttribute("data-luci-hover-owner")
        )
            return
        document.body.setAttribute("data-luci-hover-owner", "")
        const reduced = matchMedia("(prefers-reduced-motion:reduce)")
        const prepared = new Map<
            HTMLElement,
            { tabindex: string | null; label: string | null }
        >()
        let active: HTMLElement | null = null,
            frame = 0,
            last = 0,
            cycle = 0,
            position = 0
        const stop = () => {
            cancelAnimationFrame(frame)
            frame = 0
            last = 0
            active?.removeAttribute("data-luci-sliding")
            active = null
        }
        const tick = (time: number) => {
            if (
                !active ||
                !active.isConnected ||
                document.hidden ||
                reduced.matches ||
                window.location.pathname.replace(/\/$/, "") !== ""
            ) {
                stop()
                return
            }
            const rect = active.getBoundingClientRect()
            const max = cycle
            if (max <= 1 || rect.bottom <= 0 || rect.top >= innerHeight) {
                stop()
                return
            }
            if (last) {
                position = (position + Math.min(time - last, 64) * 0.018) % max
                active.scrollLeft = position
            }
            last = time

            frame = requestAnimationFrame(tick)
        }
        const start = (gallery: HTMLElement | null) => {
            if (gallery === active) return
            stop()
            if (
                !gallery ||
                reduced.matches ||
                gallery.scrollWidth - gallery.clientWidth <= 1
            )
                return
            active = gallery
            position = gallery.scrollLeft
            const first = gallery.querySelector<HTMLElement>(
                "[data-luci-home-card]:not([data-luci-home-clone]):not([data-luci-rejected])"
            )
            const clone = gallery.querySelector<HTMLElement>(
                "[data-luci-home-clone]"
            )
            cycle =
                first && clone
                    ? clone.offsetLeft - first.offsetLeft
                    : gallery.scrollWidth - gallery.clientWidth
            if (cycle <= 0) return
            gallery.setAttribute("data-luci-sliding", "")
            frame = requestAnimationFrame(tick)
        }
        const find = (target: EventTarget | null) =>
            target instanceof Element
                ? target.closest<HTMLElement>("[data-luci-home-gallery]")
                : null
        let dragging: {
            gallery: HTMLElement
            id: number
            x: number
            y: number
            scroll: number
            moved: boolean
            mouse: boolean
        } | null = null
        let suppressClick = false
        const down = (event: PointerEvent) => {
            const gallery = find(event.target)
            if (!gallery || event.button !== 0) return
            stop()
            suppressClick = false
            dragging = {
                gallery,
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                scroll: gallery.scrollLeft,
                moved: false,
                mouse: event.pointerType === "mouse",
            }
        }
        const move = (event: PointerEvent) => {
            if (!dragging || dragging.id !== event.pointerId) return
            const delta = event.clientX - dragging.x
            if (
                !dragging.moved &&
                Math.abs(delta) > 5 &&
                Math.abs(delta) > Math.abs(event.clientY - dragging.y)
            ) {
                dragging.moved = true
                dragging.gallery.setAttribute("data-luci-dragging", "")
                dragging.gallery.setPointerCapture(event.pointerId)
            }
            if (!dragging.moved) return
            event.preventDefault()
            const first = dragging.gallery.querySelector<HTMLElement>(
                "[data-luci-home-card]:not([data-luci-home-clone])"
            )
            const clone = dragging.gallery.querySelector<HTMLElement>(
                "[data-luci-home-clone]"
            )
            const travel =
                first && clone ? clone.offsetLeft - first.offsetLeft : 0
            const next = dragging.scroll - delta
            dragging.gallery.scrollLeft =
                travel > 0 ? ((next % travel) + travel) % travel : next
        }
        const up = (event: PointerEvent) => {
            if (!dragging || dragging.id !== event.pointerId) return
            const drag = dragging
            dragging = null
            suppressClick = drag.moved
            drag.gallery.removeAttribute("data-luci-dragging")
            if (drag.gallery.hasPointerCapture(event.pointerId))
                drag.gallery.releasePointerCapture(event.pointerId)
            const rect = drag.gallery.getBoundingClientRect()
            if (
                drag.mouse &&
                event.type !== "pointercancel" &&
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            )
                start(drag.gallery)
        }
        const click = (event: MouseEvent) => {
            if (suppressClick && find(event.target)) {
                event.preventDefault()
                event.stopImmediatePropagation()
                suppressClick = false
            }
        }
        const preventNativeDrag = (event: DragEvent) => {
            if (find(event.target)) event.preventDefault()
        }
        const pointer = (event: PointerEvent) => {
            if (event.pointerType === "mouse" && !dragging)
                start(find(event.target))
        }
        const leave = (event: PointerEvent) => {
            if (
                event.pointerType === "mouse" &&
                active &&
                find(event.relatedTarget) !== active
            )
                stop()
        }
        const focus = (event: FocusEvent) => start(find(event.target))
        const blur = (event: FocusEvent) => {
            if (active && find(event.relatedTarget) !== active) stop()
        }
        const key = (event: KeyboardEvent) => {
            const gallery = find(event.target)
            if (
                !gallery ||
                event.target !== gallery ||
                !["ArrowLeft", "ArrowRight"].includes(event.key)
            )
                return
            event.preventDefault()
            stop()
            const card = gallery.querySelector<HTMLElement>(
                "[data-luci-home-card]:not([data-luci-rejected])"
            )
            gallery.scrollLeft +=
                (event.key === "ArrowRight" ? 1 : -1) *
                ((card?.getBoundingClientRect().width || 200) +
                    parseFloat(getComputedStyle(gallery).columnGap))
        }
        const counts = new WeakMap<HTMLElement, number>()
        const prepare = () => {
            if (window.location.pathname.replace(/\/$/, "") !== "") return
            document
                .querySelectorAll<HTMLElement>("[data-luci-home-gallery]")
                .forEach((gallery) => {
                    gallery.style.setProperty(
                        "--luci-visible-count",
                        String(
                            innerWidth <= 809
                                ? Number(gallery.dataset.luciColumns || 3) / 2
                                : Number(gallery.dataset.luciColumns || 3)
                        )
                    )
                    Array.from(gallery.children).forEach((node) => {
                        if (
                            node.hasAttribute("data-luci-home-card") &&
                            /^(Bazaar — Tipografia|Bolsas — Retouching 3D)$/i.test(
                                node.textContent?.trim() || ""
                            )
                        )
                            node.remove()
                    })
                    const cards = Array.from(gallery.children).filter(
                        (node) =>
                            node.hasAttribute("data-luci-home-card") &&
                            !node.hasAttribute("data-luci-home-clone") &&
                            !node.hasAttribute("data-luci-rejected")
                    ) as HTMLElement[]
                    if (cards.length && counts.get(gallery) !== cards.length) {
                        counts.set(gallery, cards.length)
                        gallery
                            .querySelectorAll("[data-luci-home-clone]")
                            .forEach((node) => node.remove())
                        const copies = Math.max(2, Math.ceil(8 / cards.length))
                        for (let repeat = 0; repeat < copies; repeat++)
                            cards.forEach((card) => {
                                const clone = card.cloneNode(
                                    true
                                ) as HTMLElement
                                clone.setAttribute("data-luci-home-clone", "")
                                clone.setAttribute("aria-hidden", "true")
                                clone.setAttribute("inert", "")
                                clone.removeAttribute("id")
                                clone
                                    .querySelectorAll("[id]")
                                    .forEach((node) =>
                                        node.removeAttribute("id")
                                    )
                                gallery.appendChild(clone)
                            })
                    }
                    const gap =
                        parseFloat(getComputedStyle(gallery).columnGap) || 20
                    const visible =
                        innerWidth <= 809
                            ? Number(gallery.dataset.luciColumns || 3) / 2
                            : Number(gallery.dataset.luciColumns || 3)
                    const baseWidth =
                        (gallery.clientWidth - gap * (visible - 1)) / visible
                    Array.from(gallery.children).forEach((node) => {
                        if (
                            !(node instanceof HTMLElement) ||
                            !node.hasAttribute("data-luci-home-card")
                        )
                            return
                        const video =
                            node.querySelector<HTMLVideoElement>("video")
                        const img = node.querySelector<HTMLImageElement>("img")
                        let w =
                            video?.videoWidth ||
                            img?.naturalWidth ||
                            Number(img?.getAttribute("width")) ||
                            0
                        let h =
                            video?.videoHeight ||
                            img?.naturalHeight ||
                            Number(img?.getAttribute("height")) ||
                            0
                        if (video && !video.videoWidth && video.poster) {
                            try {
                                const poster = new URL(video.poster)
                                w =
                                    Number(poster.searchParams.get("width")) ||
                                    w
                                h =
                                    Number(poster.searchParams.get("height")) ||
                                    h
                            } catch {}
                        }
                        if (!w || !h) return
                        node.setAttribute("data-luci-natural", "")
                        const cropped =
                            w / h < 0.7 ||
                            (h > w &&
                                /BVLGARI — (Detalhe|Fragrâncias)/i.test(
                                    node.textContent || ""
                                ))
                        node.toggleAttribute("data-luci-cropped", cropped)
                        node.style.setProperty(
                            "--luci-natural-ratio",
                            w + " / " + (cropped ? h * 0.7 : h)
                        )
                        node.style.setProperty(
                            "--luci-natural-width",
                            baseWidth * (h > w ? 0.82 : 1) + "px"
                        )
                    })
                    const first = cards[0]
                    const clone = gallery.querySelector<HTMLElement>(
                        "[data-luci-home-clone]"
                    )
                    if (first && clone) {
                        const travel = clone.offsetLeft - first.offsetLeft
                        gallery.style.setProperty(
                            "--luci-home-travel",
                            travel + "px"
                        )
                        gallery.style.setProperty(
                            "--luci-home-duration",
                            Math.max(40, travel / 24) + "s"
                        )
                    }
                    if (!prepared.has(gallery)) {
                        prepared.set(gallery, {
                            tabindex: gallery.getAttribute("tabindex"),
                            label: gallery.getAttribute("aria-label"),
                        })
                        gallery.setAttribute("tabindex", "0")
                        gallery.setAttribute(
                            "aria-label",
                            "Galeria de " +
                                (gallery
                                    .querySelector("p")
                                    ?.textContent?.trim() || "projeto")
                        )
                    }
                })
        }
        const wrapScroll = (event: Event) => {
            const gallery =
                event.target instanceof HTMLElement &&
                event.target.matches("[data-luci-home-gallery]")
                    ? event.target
                    : null
            if (!gallery) return
            const first = gallery.querySelector<HTMLElement>(
                "[data-luci-home-card]:not([data-luci-home-clone])"
            )
            const clone = gallery.querySelector<HTMLElement>(
                "[data-luci-home-clone]"
            )
            const travel =
                first && clone ? clone.offsetLeft - first.offsetLeft : 0
            if (travel > 0 && gallery.scrollLeft >= travel)
                gallery.scrollLeft %= travel
        }
        document.addEventListener("scroll", wrapScroll, true)
        document.addEventListener("loadedmetadata", prepare, true)
        document.addEventListener("load", prepare, true)
        window.addEventListener("resize", prepare)
        prepare()
        const observer = new MutationObserver(prepare)
        observer.observe(document.body, { childList: true, subtree: true })

        document.addEventListener("pointerover", pointer, true)
        document.addEventListener("pointermove", pointer, true)
        document.addEventListener("pointerdown", down, true)
        document.addEventListener("pointermove", move, {
            capture: true,
            passive: false,
        })
        document.addEventListener("pointerup", up, true)
        document.addEventListener("pointercancel", up, true)
        document.addEventListener("click", click, true)
        document.addEventListener("dragstart", preventNativeDrag, true)
        document.addEventListener("pointerout", leave, true)

        document.addEventListener("focusout", blur, true)
        document.addEventListener("keydown", key, true)
        document.addEventListener("visibilitychange", stop)
        reduced.addEventListener("change", stop)
        return () => {
            stop()
            observer.disconnect()
            document.removeEventListener("scroll", wrapScroll, true)
            document.removeEventListener("loadedmetadata", prepare, true)
            document.removeEventListener("load", prepare, true)
            window.removeEventListener("resize", prepare)
            document.removeEventListener("pointerover", pointer, true)
            document.removeEventListener("pointermove", pointer, true)
            document.removeEventListener("pointerdown", down, true)
            document.removeEventListener("pointermove", move, true)
            document.removeEventListener("pointerup", up, true)
            document.removeEventListener("pointercancel", up, true)
            document.removeEventListener("click", click, true)
            document.removeEventListener("dragstart", preventNativeDrag, true)
            document.removeEventListener("pointerout", leave, true)
            document.removeEventListener("focusin", focus, true)
            document.removeEventListener("focusout", blur, true)
            document.removeEventListener("keydown", key, true)
            document.removeEventListener("visibilitychange", stop)
            reduced.removeEventListener("change", stop)
            prepared.forEach((previous, gallery) => {
                gallery
                    .querySelectorAll("[data-luci-home-clone]")
                    .forEach((clone) => clone.remove())
                gallery.style.removeProperty("--luci-visible-count")
                if (previous.tabindex === null)
                    gallery.removeAttribute("tabindex")
                else gallery.setAttribute("tabindex", previous.tabindex)
                if (previous.label === null)
                    gallery.removeAttribute("aria-label")
                else gallery.setAttribute("aria-label", previous.label)
            })
            document.body.removeAttribute("data-luci-hover-owner")
        }
    }, [])
    return <style>{HOME_HOVER_CSS}</style>
}

const NEW_PG_MEDIA = [
    {
        caption: "Volvo — Filme experimental",
        poster: "https://framerusercontent.com/images/Axlzc9A9BalvzKa9VzKO5kTErdU.png?width=640&height=1138",
        src: "https://framerusercontent.com/assets/VaypxT3QW5qHcVgpQP5qTKnNg.mp4",
    },
    {
        caption: "Objetos em equilíbrio",
        poster: "https://framerusercontent.com/images/dd0AbO39pQsVF2TYVQXgLKcm8.png?width=640&height=1138",
        src: "https://framerusercontent.com/assets/Npz9Tvo5XxMQlZeFgUdo3JWoeE.mp4",
    },
    {
        caption: "Avião — Estudo de movimento",
        poster: "https://framerusercontent.com/images/w4z9jAHX2Qq56crJZ7LqkwHwlIU.png?width=640&height=360",
        src: "https://framerusercontent.com/assets/1HGMl1wP5RoYUCCVaJgTp2umRu4.mp4",
    },
    {
        caption: "Moda — Filme experimental",
        poster: "https://framerusercontent.com/images/6f76G0E2l6BpFUl4gkSnAy5vBA.png?width=640&height=1138",
        src: "https://framerusercontent.com/assets/pYGdvO7rXavEdlLnzSyg9PHfzTI.mp4",
    },
    {
        caption: "Piscina — Estudo de imagem",
        src: "https://framerusercontent.com/images/de9xVCfu93xbMG4v5cHKNabGA.png?width=2816&height=1584",
        image: true,
    },
]
const NEW_UNNI_MEDIA = {
    poster: "https://framerusercontent.com/images/zIeTLcnVNBmIWiKxWz6LrecpKy8.png?width=640&height=1138",
    src: "https://framerusercontent.com/assets/orIfyOB8gKxFrfUX9nVRCfHHbc.mp4",
}

const NEW_MEDIA_CSS = `
.luci-new-pg{color:#fff;font-family:monospace;box-sizing:border-box}
.luci-new-pg p{font-family:monospace!important;font-size:10px!important;line-height:1.3!important;color:#fff!important;margin:8px 0 0!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase}
.luci-new-pg [data-framer-name="Content Wrapper"]{display:flex;align-items:center;justify-content:center;width:100%;overflow:hidden}
.luci-new-pg video,.luci-new-pg img{display:block;width:100%;height:100%;object-fit:contain}
.luci-new-motion{font-family:Switzer,sans-serif;margin-top:40px;color:#000}
.luci-new-motion h3{font-size:24px;font-weight:500;letter-spacing:-.025em;line-height:1.2;margin:0 0 12px}
.luci-new-motion p{margin:0 0 24px;max-width:620px}
.luci-new-motion video{display:block;width:min(380px,100%);aspect-ratio:9/16;object-fit:contain;background:#ece8e2}
`
function NewPortfolioMedia() {
    const [target, setTarget] = React.useState<HTMLElement | null>(null)
    const [kind, setKind] = React.useState("")
    React.useEffect(() => {
        const path = window.location.pathname.replace(/\/$/, "")
        if (path !== "/playground") return
        if (document.body.hasAttribute("data-luci-new-media-owner")) return
        document.body.setAttribute("data-luci-new-media-owner", "")
        const clearOwner = () =>
            document.body.removeAttribute("data-luci-new-media-owner")
        const find = () => {
            const node = document.querySelector<HTMLElement>(
                path === "/playground" ? "[data-luci-pg-gallery]" : "#motion"
            )
            if (node) {
                setTarget((current) => (current === node ? current : node))
                setKind(path)
                return true
            }
            return false
        }
        find()
        const observer = new MutationObserver(find)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-luci-pg-gallery"],
        })
        return () => {
            observer.disconnect()
            clearOwner()
        }
    }, [])
    if (!target) return null

    return createPortal(
        <>
            <style>{NEW_MEDIA_CSS}</style>
            {NEW_PG_MEDIA.map((media) => (
                <article
                    key={media.caption}
                    className="luci-new-pg"
                    data-luci-pg-card="regular"
                >
                    <div>
                        <div data-framer-name="Content Wrapper">
                            {media.image ? (
                                <img
                                    src={media.src}
                                    alt={media.caption}
                                    loading="lazy"
                                />
                            ) : (
                                <video
                                    src={media.src}
                                    poster={media.poster}
                                    aria-label={media.caption}
                                    muted
                                    data-luci-autoplay=""
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                            )}
                        </div>
                        <p title={media.caption}>{media.caption}</p>
                    </div>
                </article>
            ))}
        </>,
        target
    )
}

function UnniStickerMotion() {
    return (
        <>
            <style>{NEW_MEDIA_CSS}</style>
            <article className="luci-new-motion" data-luci-new-motion="unni">
                <h3>Unni Studio — Adesivos</h3>
                <p>
                    Os adesivos do Unni Studio ganham movimento: um estudo das
                    aplicações da identidade visual.
                </p>
                <video
                    src={NEW_UNNI_MEDIA.src}
                    poster={NEW_UNNI_MEDIA.poster}
                    aria-label="Unni Studio — Adesivos em movimento"
                    muted
                    data-luci-autoplay=""
                    loop
                    playsInline
                    controls={false}
                    preload="metadata"
                />
            </article>
        </>
    )
}

const WORK_BATCH_MEDIA = {
    "ai-video": [
        {
            title: "Itaú — Orla e cidade",
            description:
                "Três cenas em vídeo com IA para o Itaú: personagens, bicicletas e movimento entre a orla e a cidade.",
            media: [
                {
                    caption: "Itaú — Cena na orla",
                    poster: "https://framerusercontent.com/images/KoN3OS3rPvLIVn2qGwHti5Fve9g.jpg?width=1080&height=1920",
                    src: "https://framerusercontent.com/assets/GfrwRnlX2VKqw6qoqNy60cvE.mp4",
                },
                {
                    caption: "Itaú — Bicicletas em movimento",
                    poster: "https://framerusercontent.com/images/ZTEtTxx12yLWlirxM6ugS0aw0.jpg?width=1080&height=1920",
                    src: "https://framerusercontent.com/assets/GoqSY4MPFAecIptMY6Rd8HQSuzw.mp4",
                },
                {
                    caption: "Itaú — Cena urbana",
                    poster: "https://framerusercontent.com/images/5L2T5odukCJl0lgGmho3wwj0GYo.jpg?width=1080&height=1920",
                    src: "https://framerusercontent.com/assets/pp0i3B1xXru6N4aGQW6vJDVfKo.mp4",
                },
            ],
        },
        {
            title: "Loucos por manteiga",
            description:
                "Filme de produto com IA em que a textura, a composição e o movimento contam a história.",
            media: [
                {
                    caption: "Loucos por manteiga",
                    poster: "https://framerusercontent.com/images/iKW2zARXewVE3M06SSx2j77ab4.jpg?width=720&height=1280",
                    src: "https://framerusercontent.com/assets/QixovAYPYP047FIu2pJxYoXtjQ.mp4",
                },
            ],
        },
    ],
    motion: [
        {
            title: "Moda — Estudos de motion",
            description:
                "Filmes de moda e composições editoriais animadas, com ritmo de revista.",
            media: [
                {
                    caption: "Moda — Filme",
                    poster: "https://framerusercontent.com/images/aRARAIoYHPaHXYX3cnGoXWOVbxE.jpg?width=720&height=1280",
                    src: "https://framerusercontent.com/assets/pYGdvO7rXavEdlLnzSyg9PHfzTI.mp4",
                },
                {
                    caption: "Moda — Composição animada",
                    poster: "https://framerusercontent.com/images/9fEaqScMZ5GsZuhXxc7RV3YT1rA.jpg?width=720&height=898",
                    src: "https://framerusercontent.com/assets/gcPaue6SbTueOTX5RW4VJklK3I.mp4",
                },
            ],
        },
        {
            title: "Harper’s Bazaar — Imagens e tipografia",
            description:
                "Sequência de imagens com animação tipográfica para a Harper’s Bazaar.",
            media: [
                {
                    caption: "Harper’s Bazaar — Imagens e tipografia",
                    poster: "https://framerusercontent.com/images/LAtZvUf5CC3jHb5w7pWDvPMR6bE.jpg?width=720&height=1280",
                    src: "https://framerusercontent.com/assets/jx0anlyrrmNtDRXej3IzcD3PnkI.mp4",
                },
            ],
        },
        {
            title: "Itaú — Estudo visual",
            description:
                "Estudo de composição com bicicletas e personagens na praia, parte do filme com IA para o Itaú.",
            media: [
                {
                    src: "https://framerusercontent.com/images/L3JIbzJ6WVajmQ9Gg1kFL0HreO8.png?width=1584&height=2816",
                    caption: "Itaú — Estudo visual",
                    image: true,
                },
            ],
        },
        {
            title: "Harper’s Bazaar — Retoque 3D",
            description:
                "Retoque 3D do LUCI Studio sobre imagens criadas pelo Jeferson Araujo Studio para o Kleber Matheus Studio. A sequência mostra as etapas do processo até a imagem final.",
            media: [
                {
                    poster: "https://framerusercontent.com/images/PZ45L7VluzCwS3vQ3Pekes2v5QQ.jpg?width=720&height=908",
                    src: "https://framerusercontent.com/assets/53FEwI3nferzmzjnxyxCU83T6DI.mp4",
                    caption: "Chanel — Processo e retoque 3D",
                },
            ],
        },
    ],
    "design-grafico": [
        {
            title: "Kleber Matheus Studio — Layouts de divulgação",
            description:
                "Layouts de divulgação criados pelo LUCI Studio para campanhas do Kleber Matheus Studio, como as capas da Harper’s Bazaar Man.",
            media: [
                {
                    src: "https://framerusercontent.com/images/hyZct1e7dEdapoiDuSF0MhQEg.jpg?width=1080&height=1350",
                    caption: "Bazaar Man — Capa amarela",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/yO4d0EJ7fZNIdLGFvaiPQ88mw.jpg?width=1080&height=1350",
                    caption: "Jesuíta Barbosa — Layout duplo",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/gtZPKQkdiZfBdIwo8KUsIZcvc8.jpg?width=1080&height=1350",
                    caption: "Campanha — Layout 1",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/0jd64G3FnmMt1SSz9mWYBurXkM.jpg?width=1080&height=1350",
                    caption: "Jesuíta Barbosa — Preto e branco",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/afBRVVQVluBbmkC9yBZLaLOq5Ao.jpg?width=1080&height=1350",
                    caption: "Jesuíta Barbosa — Retrato",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/OfTTAVtWUQ5HFUqVIuKca15Dm4.jpg?width=1080&height=1350",
                    caption: "Bazaar Man — Capa laranja",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/Kec70kOFnB1488AhcmU4CGvqOA.jpg?width=1080&height=1350",
                    caption: "Campanha — Layout 2",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/Y2iB0ugdZmDsaIif0s8OWDEI7Y.jpg?width=1080&height=1350",
                    caption: "Campanha — Layout 3",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/jEJRsEWTqj6JW1OLPtKYhGaSYTY.jpg?width=1080&height=1350",
                    caption: "Campanha — Layout 4",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/Hsd5kl8jKngWXPxJfhMgP58ioo.jpg?width=1080&height=1350",
                    caption: "Campanha — Layout 5",
                    image: true,
                },
            ],
        },
    ],
    "ai-foto": [
        {
            title: "Achei Primeiro — Stills de produto",
            description:
                "Stills de produto com IA e tratamento de imagem para o e-commerce de luxo Achei Primeiro: bolsas, calçados, acessórios e roupas em fundos neutros, com destaque para forma, textura e acabamento.",
            media: [
                {
                    src: "https://framerusercontent.com/images/7D6lVDmrM2ntE0DM5hBKYR9mXDw.webp?width=1086&height=1448",
                    caption: "Bottega Veneta — Bolsa preta",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/LC60sr7sxGYXCtS5vrG0EYdU2bE.jpg?width=490&height=490",
                    caption: "Gucci — Horsebit loafer",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/ZEfUvZsHPIJXNjW5Bec5uVwAJGY.png?width=1792&height=2400",
                    caption: "Dsquared2 — Jaqueta",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/VPxGJvZurUMEJLhxyxWkGmOxAw.webp?width=1086&height=1448",
                    caption: "Bottega Veneta — Cassette verde",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/NaoGw3t0aZrU4lNhJUfEEokNayo.webp?width=1086&height=1448",
                    caption: "Hermès — Cinto azul",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/qVmyT9CExPa8CkrdsUHQXUxDVE.webp?width=1086&height=1448",
                    caption: "Gucci — Mocassins",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/ilH3tBSCeTJi6hcX5ReVRBEfJk.jpg?width=1086&height=1448",
                    caption: "Dsquared2 — Boné",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/5iDERdO2ZyTYDnXIoEIg3Kuv3jc.jpg?width=1086&height=1448",
                    caption: "Dsquared2 — Cinto",
                    image: true,
                },
                {
                    src: "https://framerusercontent.com/images/9cuaLH8poRwQduXt15OCsOsVPw.png?width=1000&height=1250",
                    caption: "Off-White — Óculos",
                    image: true,
                },
            ],
        },
    ],
}

const WORK_BATCH_CSS = `
.luci-work-batch{margin-top:48px;width:100%;font-family:Switzer,sans-serif}
.luci-work-batch article{margin-bottom:64px}
.luci-work-batch h3{font-size:22px;line-height:1.2;font-weight:500;letter-spacing:-.025em;margin:0 0 12px}
.luci-work-batch article>p{margin-bottom:24px}
.luci-work-batch-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;align-items:start}
.luci-work-batch figure{margin:0;min-width:0}
.luci-work-batch-media{width:100%;aspect-ratio:4/5;overflow:hidden;background:#f3f3f3}
.luci-work-batch video,.luci-work-batch img{display:block;width:100%;height:100%;object-fit:contain}
.luci-work-batch figcaption{font-family:monospace;font-size:12px;line-height:1.35;color:#000;margin-top:10px;text-transform:uppercase}
@media(max-width:809px){.luci-work-batch-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.luci-work-batch article{margin-bottom:44px}}
@media(max-width:479px){.luci-work-batch-grid{grid-template-columns:1fr}.luci-work-batch-media{max-height:460px}}
`
function WorkMediaGroup({ group }) {
    const [page, setPage] = React.useState(0)
    const pages = Math.ceil(group.media.length / 3)
    return (
        <article>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="luci-work-batch-grid">
                {group.media.slice(page * 3, page * 3 + 3).map((media) => (
                    <figure key={media.src}>
                        <div className="luci-work-batch-media">
                            {media.image ? (
                                <img
                                    src={media.src}
                                    alt={media.caption}
                                    loading="lazy"
                                />
                            ) : (
                                <video
                                    src={media.src}
                                    poster={media.poster}
                                    aria-label={media.caption}
                                    muted
                                    data-luci-autoplay=""
                                    loop
                                    playsInline
                                    controls={false}
                                    preload="metadata"
                                />
                            )}
                        </div>
                        <figcaption>{media.caption}</figcaption>
                    </figure>
                ))}
            </div>
            {pages > 1 && (
                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        marginTop: 20,
                        fontFamily: "monospace",
                        fontSize: 12,
                    }}
                >
                    <button
                        aria-label={"Materiais anteriores de " + group.title}
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                        style={{
                            background: "transparent",
                            border: "1px solid currentColor",
                            padding: "8px 12px",
                            cursor: "pointer",
                        }}
                    >
                        ←
                    </button>
                    <span>
                        {page * 3 + 1}–
                        {Math.min(page * 3 + 3, group.media.length)} /{" "}
                        {group.media.length}
                    </span>
                    <button
                        aria-label={"Próximos materiais de " + group.title}
                        disabled={page === pages - 1}
                        onClick={() => setPage(page + 1)}
                        style={{
                            background: "transparent",
                            border: "1px solid currentColor",
                            padding: "8px 12px",
                            cursor: "pointer",
                        }}
                    >
                        →
                    </button>
                </div>
            )}
        </article>
    )
}
function NewWorkBatch({ area }: { area: string }) {
    const groups = WORK_BATCH_MEDIA[area] || []
    return (
        <div className="luci-work-batch" data-luci-work-batch={area}>
            <style>{WORK_BATCH_CSS}</style>
            {groups.map((group) => (
                <WorkMediaGroup key={group.title} group={group} />
            ))}
        </div>
    )
}

function PlaygroundLightbox() {
    const [media, setMedia] = React.useState<any>(null)
    const origin = React.useRef<HTMLElement | null>(null)
    const closeButton = React.useRef<HTMLButtonElement | null>(null)
    const close = React.useCallback(() => {
        setMedia(null)
        requestAnimationFrame(() =>
            origin.current?.focus({ preventScroll: true })
        )
    }, [])
    React.useEffect(() => {
        if (!window.location.pathname.includes("playground")) return
        if (document.body.dataset.luciLightboxOwner) return
        document.body.dataset.luciLightboxOwner = "true"
        const open = (event: any) => {
            if (
                event.type === "keydown" &&
                event.key !== "Enter" &&
                event.key !== " "
            )
                return
            const card = (event.target as HTMLElement)?.closest<HTMLElement>(
                "[data-luci-pg-card]"
            )
            if (!card) return
            const video = card.querySelector("video")
            const image = card.querySelector("img")
            const src = video
                ? video.currentSrc ||
                  video.src ||
                  video.querySelector("source")?.src
                : image?.currentSrc || image?.src
            if (!src) return
            event.preventDefault()
            event.stopPropagation()
            origin.current = card
            setMedia({
                src,
                video: !!video,
                poster: video?.poster,
                caption:
                    card.querySelector("p")?.textContent ||
                    image?.alt ||
                    "Playground",
            })
        }
        const prepare = () =>
            document
                .querySelectorAll<HTMLElement>("[data-luci-pg-card]")
                .forEach((card) => {
                    if (
                        card.querySelector("p")?.textContent?.trim() ===
                        "Remake Britney"
                    ) {
                        const video = card.querySelector("video")
                        const replacement =
                            "https://framerusercontent.com/assets/D00UkTmpyi7hkwjhGDv1iNzM.mp4"
                        if (video && video.src !== replacement) {
                            video.src = replacement
                            video.poster =
                                "https://framerusercontent.com/images/M2UQetPruMaaECmXRqbengIWDg.jpg?width=716&height=806"
                            video.load()
                        }
                    }
                    card.tabIndex = 0
                    card.setAttribute("role", "button")
                    card.setAttribute(
                        "aria-label",
                        "Ampliar " +
                            (card.querySelector("p")?.textContent ||
                                "imagem ou vídeo")
                    )
                    card.style.cursor = "zoom-in"
                })
        prepare()
        const observer = new MutationObserver(prepare)
        observer.observe(document.body, { childList: true, subtree: true })
        document.addEventListener("click", open, true)
        document.addEventListener("keydown", open, true)
        return () => {
            observer.disconnect()
            document.removeEventListener("click", open, true)
            document.removeEventListener("keydown", open, true)
            delete document.body.dataset.luciLightboxOwner
        }
    }, [])
    React.useEffect(() => {
        if (!media) return
        const overflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        closeButton.current?.focus()
        const keys = (event: KeyboardEvent) => {
            if (event.key === "Escape") close()
            if (event.key === "Tab") {
                const buttons = Array.from(
                    document.querySelectorAll<HTMLElement>(
                        "[data-luci-lightbox] button, [data-luci-lightbox] video"
                    )
                )
                if (buttons.length < 2) {
                    event.preventDefault()
                    closeButton.current?.focus()
                }
            }
        }
        document.addEventListener("keydown", keys)
        return () => {
            document.body.style.overflow = overflow
            document.removeEventListener("keydown", keys)
        }
    }, [media, close])
    if (!media || typeof document === "undefined") return null
    return createPortal(
        <div
            data-luci-lightbox=""
            role="dialog"
            aria-modal="true"
            aria-label={media.caption}
            onClick={(event) => {
                if (event.target === event.currentTarget) close()
            }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 2147483000,
                background: "rgba(0,0,0,.86)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "56px 24px 24px",
                gap: 16,
            }}
        >
            <button
                ref={closeButton}
                onClick={close}
                aria-label="Fechar ampliação"
                style={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    border: 0,
                    background: "transparent",
                    color: "white",
                    fontSize: 32,
                    cursor: "pointer",
                    padding: 8,
                }}
            >
                ×
            </button>
            {media.video ? (
                <video
                    key={media.src}
                    src={media.src}
                    poster={media.poster}
                    controls={false}
                    autoPlay
                    muted
                    loop
                    playsInline
                    tabIndex={0}
                    style={{
                        maxWidth: "92vw",
                        maxHeight: "80vh",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            ) : (
                <img
                    src={media.src}
                    alt={media.caption}
                    style={{
                        maxWidth: "92vw",
                        maxHeight: "80vh",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            )}
            <p
                style={{
                    margin: 0,
                    color: "white",
                    fontFamily: "monospace",
                    fontSize: 13,
                    textAlign: "center",
                }}
            >
                {media.caption}
            </p>
        </div>,
        document.body
    )
}

const HOME_BAZAAR_NEW = [
    {
        poster: "https://framerusercontent.com/images/kDCv3QL4OXTzT4W6xN0dmDUMvY.jpg?width=720&height=1280",
        src: "https://framerusercontent.com/assets/XqcG1FnFvh7LNxFdHldlTRrwct0.mp4",
        caption: "Bazaar — Filme editorial",
    },
    {
        poster: "https://framerusercontent.com/images/DQ8hrWas1DgrlQCzLp6Dd45cGPA.jpg?width=1280&height=266",
        src: "https://framerusercontent.com/assets/Q0NyP1jVMFacfT3yOSggEwcpPig.mp4",
        caption: "Bazaar — Teaser",
    },
    {
        src: "https://framerusercontent.com/assets/jx0anlyrrmNtDRXej3IzcD3PnkI.mp4",
        poster: "https://framerusercontent.com/images/LAtZvUf5CC3jHb5w7pWDvPMR6bE.jpg?width=720&height=1280",
        caption: "Bazaar — Imagens e tipografia",
    },
    {
        poster: "https://framerusercontent.com/images/WJ8xpUbpFZB8ayzQ7gMg0P4kRMU.jpg?width=720&height=1280",
        src: "https://framerusercontent.com/assets/lJ3p2DjR2UuAnaOVOEdYYdkXYA.mp4",
        caption: "Bazaar — Motion editorial",
    },
    {
        src: "https://framerusercontent.com/assets/aOJERhlNzb8irsE8rZjdRNrSzWY.mp4",
        caption: "Bazaar — Bolsas em movimento",
    },
    {
        src: "https://framerusercontent.com/assets/pzeiPD2mYj7jUBMnT5GkXgWM5Fc.mp4",
        caption: "Bazaar Man — Jesuíta Barbosa",
    },
    {
        src: "https://framerusercontent.com/images/YwD0m3umjScXoOwenWtNTTQMCT4.jpg?width=1440&height=1817",
        caption: "Bazaar — Chanel no gelo",
        image: true,
        width: 1440,
        height: 1817,
    },
    {
        src: "https://framerusercontent.com/images/VxhkAIzoOi9tXuTzTJj2qxBvUTY.jpg?width=1080&height=1362",
        caption: "Bazaar — Processo 3D",
        image: true,
        width: 1080,
        height: 1362,
    },
    {
        src: "https://framerusercontent.com/images/BnlML2fmBIe3a5kxD8nQ13D898.jpg?width=1080&height=1350",
        caption: "Bazaar — Lais Oliveira",
        image: true,
        width: 1080,
        height: 1350,
    },
    {
        src: "https://framerusercontent.com/images/dH1iAWWTwflGIcWIXRaatt7qjQ.jpg?width=1080&height=1350",
        caption: "Bazaar — Eliza Douglas",
        image: true,
        width: 1080,
        height: 1350,
    },
]

function HomeMetaProject() {
    const [target, setTarget] = React.useState<HTMLElement | null>(null)
    React.useEffect(() => {
        if (window.location.pathname.replace(/\/$/, "") !== "") return
        if (document.body.dataset.luciMetaOwner) return
        document.body.dataset.luciMetaOwner = "true"
        let host: HTMLElement | null = null
        const find = () => {
            if (host?.isConnected) return
            const gallery = Array.from(
                document.querySelectorAll<HTMLElement>(
                    "[data-luci-home-gallery]"
                )
            ).find((node) =>
                node.textContent?.includes("Harper’s Bazaar — Capas 2025")
            )
            const section = gallery?.closest(
                '[data-framer-name="Section Projects"]'
            )
            if (!gallery || !section) return
            let anchor: HTMLElement = gallery
            while (anchor.parentElement && anchor.parentElement !== section)
                anchor = anchor.parentElement
            if (anchor.parentElement !== section) return
            host = document.createElement("div")
            host.dataset.luciMetaProject = "true"
            host.style.width = "100%"
            host.style.minWidth = "0"
            anchor.insertAdjacentElement("afterend", host)
            setTarget(host)
        }
        find()
        const observer = new MutationObserver(find)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-luci-home-gallery"],
        })
        return () => {
            observer.disconnect()
            host?.remove()
            delete document.body.dataset.luciMetaOwner
        }
    }, [])
    if (!target) return null
    return createPortal(
        <>
            <div
                data-framer-name="Project Bar Meta"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 18,
                    fontFamily: "Switzer, Arial, sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1.3,
                }}
            >
                <div
                    data-framer-name="Container"
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                    <div
                        data-framer-name="Details"
                        style={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                    >
                        <p style={{ margin: 0, color: "#000" }}>
                            Meta — Muse Charm
                            <span style={{ color: "rgba(0,0,0,.4)" }}>,</span>
                        </p>
                        <p style={{ margin: 0, color: "rgba(0,0,0,.4)" }}>
                            Vídeo com IA
                        </p>
                    </div>
                    <div
                        data-framer-name="Icon Wrapper"
                        tabIndex={0}
                        style={{ width: 24, height: 24, flex: "none" }}
                    />
                </div>
                <div data-framer-name="Info">
                    <div>
                        <p style={{ fontWeight: 400, color: "#000" }}>
                            Série de filmes com IA para o Muse Charm, da Meta:
                            o acessório e o personagem ganham vida em cenas
                            curtas de produto, com foco em textura, luz e
                            movimento.
                        </p>
                    </div>
                </div>
            </div>
            <div
                data-luci-home-gallery="regular"
                style={{
                    display: "flex",
                    gap: 20,
                    width: "100%",
                    overflowX: "auto",
                    alignItems: "flex-start",
                }}
            >
                {[
                    "https://framerusercontent.com/assets/ermTHtqFbrA7h37yoLLTmCE.mp4",
                    "https://framerusercontent.com/assets/o3lO91SC4SqnnM54GVZDKIoVgk.mp4",
                    "https://framerusercontent.com/assets/ryH0V7Z96wbISKzOKuO3z3Yc.mp4",
                    "https://framerusercontent.com/assets/t7ydv4SSqnXJES0imRAAEP2ZYXU.mp4",
                ].map((src, index) => (
                    <article
                        key={src}
                        data-framer-name="Project Item Added Meta"
                        data-luci-home-card="regular"
                        style={{ minWidth: 0, fontFamily: "monospace" }}
                    >
                        <div
                            data-framer-name="Content Wrapper"
                            style={{ width: "100%", overflow: "hidden" }}
                        >
                            <video
                                src={src}
                                aria-label={"Meta — Filme " + (index + 1)}
                                muted
                                data-luci-autoplay=""
                                loop
                                playsInline
                                controls={false}
                                preload="metadata"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                        <p
                            style={{
                                fontSize: 12,
                                lineHeight: 1.3,
                                margin: "10px 0 0",
                                textTransform: "uppercase",
                            }}
                        >
                            Meta — Filme {String(index + 1).padStart(2, "0")}
                        </p>
                    </article>
                ))}
            </div>
        </>,
        target
    )
}

function HomeBvlgariReplacement() {
    const [target, setTarget] = React.useState<HTMLElement | null>(null)
    React.useEffect(() => {
        if (
            window.location.pathname.replace(/\/$/, "") !== "" ||
            document.body.dataset.luciBvgOwner
        )
            return
        document.body.dataset.luciBvgOwner = "true"
        let host: HTMLElement | null = null,
            original: HTMLElement | null = null
        const find = () => {
            if (host?.isConnected) return
            original =
                Array.from(
                    document.querySelectorAll<HTMLElement>(
                        "[data-luci-home-gallery]"
                    )
                ).find((g) =>
                    g.textContent?.includes("BVLGARI — Pesquisa visual")
                ) || null
            if (!original) return
            original.dataset.luciBvgOld = "true"
            host = document.createElement("div")
            host.dataset.luciHomeGallery = "regular"
            host.dataset.luciBvgReplacement = "true"
            Object.assign(host.style, {
                display: "flex",
                gap: "20px",
                width: "100%",
                minWidth: "0",
                overflowX: "auto",
                alignItems: "flex-start",
            })
            original.insertAdjacentElement("afterend", host)
            setTarget(host)
        }
        find()
        const observer = new MutationObserver(find)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-luci-home-gallery"],
        })
        return () => {
            observer.disconnect()
            host?.remove()
            original?.removeAttribute("data-luci-bvg-old")
            delete document.body.dataset.luciBvgOwner
        }
    }, [])
    if (!target) return null
    return createPortal(
        <>
            <style>{"[data-luci-bvg-old]{display:none!important}"}</style>
            {[
                "https://framerusercontent.com/assets/6t3XxJr0S3NUHnrlMq3CGH5rOpM.mp4",
                "https://framerusercontent.com/assets/7cfKh5U9AobXksQkQDj9QANXwD0.mp4",
                "https://framerusercontent.com/images/XDQWC2A4GahUgVtGPHdnQQheJE.jpg",
                "https://framerusercontent.com/images/Kxyem7l6N29Oixv4d2ctFpu2KEc.jpg?width=2160&height=2880",
                "https://framerusercontent.com/images/7CHXbdkgMzwdHjoHBB2aRiueAmk.jpg?width=1122&height=1496",
                "https://framerusercontent.com/images/PWLj0h69xRo78jEhzQovpzgqbo.jpg?width=2160&height=2880",
            ].map((src, index) => (
                <article
                    key={src}
                    data-framer-name="Project Item Added BVLGARI"
                    data-luci-home-card="regular"
                    style={{ minWidth: 0, fontFamily: "monospace" }}
                >
                    <div
                        data-framer-name="Content Wrapper"
                        style={{ width: "100%", overflow: "hidden" }}
                    >
                        {index < 2 ? (
                            <video
                                src={src}
                                aria-label={"BVLGARI — Filme " + (index + 1)}
                                muted
                                data-luci-autoplay=""
                                loop
                                playsInline
                                controls={false}
                                preload="metadata"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        ) : (
                            <img
                                src={src}
                                alt={
                                    [
                                        "",
                                        "",
                                        "BVLGARI — Boutique",
                                        "BVLGARI — Detalhe",
                                        "BVLGARI — Storyboard",
                                        "BVLGARI — Fragrâncias",
                                    ][index]
                                }
                                width={index === 4 ? 1122 : 2160}
                                height={index === 4 ? 1496 : 2880}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    </div>
                    <p
                        style={{
                            fontSize: 12,
                            lineHeight: 1.3,
                            margin: "10px 0 0",
                            textTransform: "uppercase",
                        }}
                    >
                        {
                            [
                                "BVLGARI — Filme 01",
                                "BVLGARI — Filme 02",
                                "BVLGARI — Boutique",
                                "BVLGARI — Detalhe",
                                "BVLGARI — Storyboard",
                                "BVLGARI — Fragrâncias",
                            ][index]
                        }
                    </p>
                </article>
            ))}
        </>,
        target
    )
}

function SilentSiteMedia() {
    React.useEffect(() => {
        if (document.body.dataset.luciSilentOwner) return
        document.body.dataset.luciSilentOwner = "true"
        const silence = (media: HTMLMediaElement) => {
            if (!media.muted) media.muted = true
            if (!media.defaultMuted) media.defaultMuted = true
            if (media.volume !== 0) media.volume = 0
            if (!media.hasAttribute("muted")) media.setAttribute("muted", "")
        }
        const all = () =>
            document
                .querySelectorAll<HTMLMediaElement>("video,audio")
                .forEach(silence)
        const enforce = (e: Event) => {
            if (e.target instanceof HTMLMediaElement) silence(e.target)
        }
        all()
        const ob = new MutationObserver(all)
        ob.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["muted", "src"],
        })
        document.addEventListener("volumechange", enforce, true)
        document.addEventListener("play", enforce, true)
        document.addEventListener("loadedmetadata", enforce, true)
        return () => {
            ob.disconnect()
            document.removeEventListener("volumechange", enforce, true)
            document.removeEventListener("play", enforce, true)
            document.removeEventListener("loadedmetadata", enforce, true)
            delete document.body.dataset.luciSilentOwner
        }
    }, [])
    return null
}

function CleanVideoPresentation() {
    React.useEffect(() => {
        if (document.body.dataset.luciCleanVideoOwner) return
        document.body.dataset.luciCleanVideoOwner = "true"
        const clean = () =>
            document
                .querySelectorAll<HTMLVideoElement>("video[controls]")
                .forEach((video) => {
                    video.controls = false
                    video.removeAttribute("controls")
                })
        clean()
        const observer = new MutationObserver(clean)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["controls"],
        })
        return () => {
            observer.disconnect()
            delete document.body.dataset.luciCleanVideoOwner
        }
    }, [])
    return (
        <style>{`body[data-luci-gallery-controls] [data-framer-name="Layout Toggle"]{display:none!important}
video::-webkit-media-controls,video::-webkit-media-controls-enclosure{display:none!important}
 [data-luci-home-gallery] [data-luci-home-card] p,[data-luci-home-gallery] [data-luci-home-card] p span{font-size:10px!important;line-height:1.3!important;letter-spacing:0!important}
 [data-luci-home-gallery] [data-luci-home-card][data-luci-cropped] [data-framer-name="Content Wrapper"]{aspect-ratio:var(--luci-natural-ratio)!important;height:auto!important;overflow:hidden!important;position:relative!important}
 [data-luci-home-gallery] [data-luci-home-card][data-luci-cropped] [data-framer-name="Content Wrapper"] video,
 [data-luci-home-gallery] [data-luci-home-card][data-luci-cropped] [data-framer-name="Content Wrapper"] img{position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important}
 `}</style>
    )
}

// Home: mockups novos da Orbis no fim da galeria do projeto
const HOME_ORBIS_NEW: ExtraMedia[] = [
    { src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@cf7905a8825d0d9cc855e816bfada4c54fae2f66/orbis/orbis-01.jpg", caption: "Orbis — Cartões" },
    { src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@cf7905a8825d0d9cc855e816bfada4c54fae2f66/orbis/orbis-02.jpg", caption: "Orbis — Ecobag" },
    { src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@cf7905a8825d0d9cc855e816bfada4c54fae2f66/orbis/orbis-03.jpg", caption: "Orbis — Abrigo de ônibus" },
    { src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@cf7905a8825d0d9cc855e816bfada4c54fae2f66/orbis/orbis-04.jpg", caption: "Orbis — Painéis de rua" },
    { src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@cf7905a8825d0d9cc855e816bfada4c54fae2f66/orbis/orbis-05.jpg", caption: "Orbis — Painel iluminado" },
    { src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@cf7905a8825d0d9cc855e816bfada4c54fae2f66/orbis/orbis-06.jpg", caption: "Orbis — Moletom" },
    { src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@cf7905a8825d0d9cc855e816bfada4c54fae2f66/orbis/orbis-07.jpg", caption: "Orbis — Cartazes iluminados" },
]
type ExtraMedia = { src: string; caption: string; video?: boolean; poster?: string }
const HOME_UNNI_NEW: ExtraMedia[] = [
    {
        src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@88bce082b19b9e68ee8b689fbaa986cf376d6c01/unni/unni-adesivos-02.mp4",
        poster: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@88bce082b19b9e68ee8b689fbaa986cf376d6c01/unni/unni-adesivos-02.jpg",
        caption: "Unni Studio — Adesivos",
        video: true,
    },
]
const HOME_BUDDEMEYER_NEW: ExtraMedia[] = [
    {
        src: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@4767de0e7b4c9fb51eee3d9b99b6dd9f2aa575a6/buddemeyer/buddemeyer-filme.mp4",
        poster: "https://cdn.jsdelivr.net/gh/lucibellelemos-commits/meustudio@4767de0e7b4c9fb51eee3d9b99b6dd9f2aa575a6/buddemeyer/buddemeyer-filme.jpg",
        caption: "UltraSoft — Filme",
        video: true,
    },
]
function HomeExtraMedia(props: {
    owner: string
    match: string[]
    items: ExtraMedia[]
}) {
    const [target, setTarget] = React.useState<HTMLElement | null>(null)
    React.useEffect(() => {
        if (window.location.pathname.replace(/\/$/, "") !== "") return
        const key = "luciExtra" + props.owner
        if (document.body.dataset[key]) return
        document.body.dataset[key] = "true"
        const find = () => {
            const gallery = Array.from(
                document.querySelectorAll<HTMLElement>(
                    "[data-luci-home-gallery]"
                )
            ).find((node) =>
                props.match.some((text) => node.textContent?.includes(text))
            )
            if (gallery)
                setTarget((current) =>
                    current === gallery ? current : gallery
                )
        }
        find()
        const observer = new MutationObserver(find)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-luci-home-gallery"],
        })
        return () => {
            observer.disconnect()
            delete document.body.dataset[key]
        }
    }, [])
    if (!target) return null
    return createPortal(
        <>
            {props.items.map((media) => (
                <article
                    key={media.src}
                    data-framer-name={"Project Item Added " + props.owner}
                    data-luci-home-card="regular"
                    style={{ minWidth: 0, fontFamily: "monospace" }}
                >
                    <div
                        data-framer-name="Content Wrapper"
                        style={{ width: "100%", overflow: "hidden" }}
                    >
                        {media.video ? (
                            <video
                                src={media.src}
                                poster={media.poster}
                                aria-label={media.caption}
                                muted
                                data-luci-autoplay=""
                                loop
                                playsInline
                                controls={false}
                                preload="metadata"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        ) : (
                            <img
                                src={media.src}
                                alt={media.caption}
                                width={1800}
                                height={1013}
                                loading="lazy"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    </div>
                    <p
                        style={{
                            fontSize: 12,
                            lineHeight: 1.3,
                            margin: "10px 0 0",
                            textTransform: "uppercase",
                        }}
                    >
                        {media.caption}
                    </p>
                </article>
            ))}
        </>,
        target
    )
}

function HomeBazaarMedia() {
    const [target, setTarget] = React.useState<HTMLElement | null>(null)
    React.useEffect(() => {
        if (window.location.pathname.replace(/\/$/, "") !== "") return
        if (document.body.dataset.luciBazaarOwner) return
        document.body.dataset.luciBazaarOwner = "true"
        const find = () => {
            const gallery = Array.from(
                document.querySelectorAll<HTMLElement>(
                    "[data-luci-home-gallery]"
                )
            ).find((node) =>
                node.textContent?.includes("Harper’s Bazaar — Capas 2025")
            )
            if (gallery)
                setTarget((current) =>
                    current === gallery ? current : gallery
                )
        }
        find()
        const observer = new MutationObserver(find)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-luci-home-gallery"],
        })
        return () => {
            observer.disconnect()
            delete document.body.dataset.luciBazaarOwner
        }
    }, [])
    if (!target) return null
    return createPortal(
        <>
            {HOME_BAZAAR_NEW.map((media) => (
                <article
                    key={media.src}
                    data-framer-name="Project Item Added Bazaar"
                    data-luci-home-card="regular"
                    style={{ minWidth: 0, fontFamily: "monospace" }}
                >
                    <div
                        data-framer-name="Content Wrapper"
                        style={{ width: "100%", overflow: "hidden" }}
                    >
                        {"image" in media && media.image ? (
                            <img
                                src={media.src}
                                alt={media.caption}
                                width={
                                    "width" in media ? media.width : undefined
                                }
                                height={
                                    "height" in media ? media.height : undefined
                                }
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        ) : (
                            <video
                                src={media.src}
                                poster={
                                    "poster" in media ? media.poster : undefined
                                }
                                aria-label={media.caption}
                                muted
                                data-luci-autoplay=""
                                loop
                                playsInline
                                controls={false}
                                preload="metadata"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    </div>
                    <p
                        style={{
                            fontSize: 12,
                            lineHeight: 1.3,
                            margin: "10px 0 0",
                            textTransform: "uppercase",
                        }}
                    >
                        {media.caption}
                    </p>
                </article>
            ))}
        </>,
        target
    )
}

function BritneyRemakeVideo() {
    const [target, setTarget] = React.useState<HTMLElement | null>(null)
    React.useEffect(() => {
        if (window.location.pathname !== "/playground") return
        if (document.body.dataset.luciBritneyOwner) return
        document.body.dataset.luciBritneyOwner = "true"
        const find = () => {
            const card = Array.from(
                document.querySelectorAll<HTMLElement>("[data-luci-pg-card]")
            ).find(
                (node) =>
                    node.querySelector("p")?.textContent?.trim() ===
                    "Remake Britney"
            )
            const wrapper = card?.querySelector<HTMLElement>(
                '[data-framer-name="Content Wrapper"]'
            )
            if (wrapper) {
                wrapper.dataset.luciBritneyMedia = ""
                setTarget((current) =>
                    current === wrapper ? current : wrapper
                )
            }
        }
        find()
        const observer = new MutationObserver(find)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-luci-pg-card"],
        })
        return () => {
            observer.disconnect()
            delete document.body.dataset.luciBritneyOwner
        }
    }, [])
    if (!target) return null
    return createPortal(
        <>
            <style>{`[data-luci-britney-media]>div:not(.luci-britney-video){display:none!important}[data-luci-britney-media]{display:flex!important;align-items:center;justify-content:center}[data-luci-britney-media] video{width:100%!important;height:100%!important;object-fit:contain!important}`}</style>
            <video
                className="luci-britney-video"
                src="https://framerusercontent.com/assets/D00UkTmpyi7hkwjhGDv1iNzM.mp4"
                poster="https://framerusercontent.com/images/M2UQetPruMaaECmXRqbengIWDg.jpg?width=716&height=806"
                aria-label="Remake Britney"
                data-luci-autoplay=""
                muted
                loop
                playsInline
                preload="metadata"
            />
        </>,
        target
    )
}
