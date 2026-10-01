import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const IMG = "https://framerusercontent.com/images/"

const SLIDES = [
    { name: "Orbis", slug: "orbis", img: IMG + "Lv0v4SWBbiYRIy19xRjqyOzmK5o.jpg", text: "Identidade e motion para um hub de inovação na Design Week 2025." },
    { name: "Mescla", slug: "mescla", img: IMG + "SdmLA3M0qiEo1kZXSAqOpYzgmps.jpg", text: "Rebranding e direção de arte para uma marca de slow fashion." },
    { name: "Surrealismo Tropical", slug: "surrealismo-tropical", img: IMG + "s9IM3pQv2i9M6TkfoQWtaVftk6s.jpg", text: "Direção criativa para a campanha de Carnaval da Mescla." },
    { name: "Aysù", slug: "aysu", img: IMG + "QbHdfcOEXrbupcNsNmsJnk70ZYE.jpg", text: "Identidade visual que aproxima a marca do público europeu." },
    { name: "Easy Diagnostics", slug: "easy-diagnostics", img: IMG + "EsqrNKNPLRDMIU187ayGPbvwUk.jpg", text: "Branding para inovação no campo dos diagnósticos." },
]

const CSS = `
.hs{position:relative;width:100%;height:100%;display:grid;grid-template-columns:1fr minmax(0,62%) 1fr;align-items:center;gap:24px;box-sizing:border-box;color:#000;font-family:"Inter Display","Inter",sans-serif}
.hs a{color:inherit;text-decoration:none}
.hs-left{align-self:center;display:flex;flex-direction:column;gap:10px;min-width:0}
.hs-nums{display:flex;gap:10px;font-family:"Martian Mono",monospace;font-size:12px;letter-spacing:-0.05em}
.hs-nums button{all:unset;cursor:pointer;color:#8a8a8a;padding-bottom:1px;border-bottom:1px solid transparent;transition:color .3s}
.hs-nums button.on{color:#000;border-bottom-color:#000}
.hs-name{font-size:20px;font-weight:500;font-style:italic;letter-spacing:-0.02em;line-height:1.1}
.hs-text{font-size:14px;line-height:1.35;color:#4D4D4D;max-width:260px}
.hs-stage{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;display:block;background:#e9e9e9}
.hs-stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.08);transition:opacity 1s ease,transform 7s ease}
.hs-stage img.on{opacity:1;transform:scale(1)}
.hs-right{justify-self:end;display:flex;align-items:center;gap:14px;font-family:"Martian Mono",monospace;font-size:12px;letter-spacing:-0.05em;text-transform:uppercase}
.hs-right button{all:unset;cursor:pointer;display:flex;align-items:center;gap:14px}
.hs-thumb{width:84px;height:104px;object-fit:cover;display:block;transition:opacity .4s}
.hs-right button:hover .hs-thumb{opacity:.7}
@media (max-width:809px){
 .hs{grid-template-columns:1fr;gap:16px}
 .hs-stage{order:1;aspect-ratio:4/5}
 .hs-left{order:2}
 .hs-right{display:none}
}
`

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 640
 */
export default function HeroSlideshow(props) {
    const { style, interval } = props
    const [i, setI] = React.useState(0)
    const [paused, setPaused] = React.useState(false)

    React.useEffect(() => {
        if (paused) return
        const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), Math.max(2, interval) * 1000)
        return () => clearInterval(t)
    }, [interval, paused, i])

    const s = SLIDES[i]
    const next = SLIDES[(i + 1) % SLIDES.length]

    return (
        <div className="hs" style={style} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <style>{CSS}</style>
            <div className="hs-left">
                <div className="hs-nums">
                    {SLIDES.map((sl, k) => (
                        <button key={sl.slug} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={sl.name}>
                            {k + 1}
                        </button>
                    ))}
                </div>
                <a className="hs-name" href={"/works/" + s.slug}>{s.name}</a>
                <div className="hs-text">{s.text}</div>
            </div>
            <a className="hs-stage" href={"/works/" + s.slug} aria-label={s.name}>
                {SLIDES.map((sl, k) => (
                    <img key={sl.slug} src={sl.img} alt={sl.name} className={k === i ? "on" : ""} loading={k === 0 ? "eager" : "lazy"} />
                ))}
            </a>
            <div className="hs-right">
                <button onClick={() => setI((i + 1) % SLIDES.length)} aria-label="Próximo projeto">
                    <span>Próximo</span>
                    <img className="hs-thumb" src={next.img} alt={next.name} />
                </button>
            </div>
        </div>
    )
}

HeroSlideshow.defaultProps = { interval: 5 }

addPropertyControls(HeroSlideshow, {
    interval: { type: ControlType.Number, title: "Segundos", min: 2, max: 20, step: 1, defaultValue: 5 },
})

// Override: substitui a camada pelo slideshow do topo
export function withHeroSlideshow(Component): React.ComponentType {
    return (props: any) => <HeroSlideshow style={{ ...props.style, height: "auto" }} interval={5} />
}

const LOGO_CSS = `
.lio{display:flex;justify-content:flex-end;width:100%;box-sizing:border-box}
.lio-in{display:flex;flex-direction:column;font-family:"Inter Display","Inter",sans-serif;font-weight:500;font-size:76px;line-height:0.86;letter-spacing:-0.075em;color:#000}
.lio-row{display:flex;align-items:flex-start}
.lio-r{font-size:0.21em;letter-spacing:0;line-height:1;margin-left:0.12em;margin-top:0.1em}
@media (max-width:809px){.lio-in{font-size:52px}}
`

// Override: logo Lio Studio (empilhada)
export function withLioLogo(Component): React.ComponentType {
    return (props: any) => (
        <div className="lio" style={{ ...props.style }} role="img" aria-label="Lio Studio">
            <style>{LOGO_CSS}</style>
            <div className="lio-in">
                <span>Lio</span>
                <span className="lio-row">
                    Studio<span className="lio-r">®</span>
                </span>
            </div>
        </div>
    )
}
