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
