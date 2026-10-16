# Converte as mídias originais em versões leves para a web (jpg ≤1600px, mp4 ≤720px sem áudio + poster)
import os, subprocess, sys
U = "/mnt/user-data/uploads/"
P = U + "01 - Projetos em prioridade/"
X = U + "03 - Outros projetos extras/"
OUT = os.path.dirname(os.path.abspath(__file__))
M = {
 "bazaar": [
  (P+"01 - Bazaar Moda/09 - Harper's Bazaar - Capas KM Studio 2025/bazaar-capas-km-studio-2025.mp4","capas"),
  (P+"01 - Bazaar Moda/14 - Harper's Bazaar - Retouching 3D Bolsas/01_1440x1817.jpg","bolsas_01"),
  (P+"01 - Bazaar Moda/14 - Harper's Bazaar - Retouching 3D Bolsas/04_video.mp4","bolsas_v1"),
  (P+"01 - Bazaar Moda/14 - Harper's Bazaar - Retouching 3D Bolsas/05_1440x1817.jpg","bolsas_02"),
  (P+"01 - Bazaar Moda/14 - Harper's Bazaar - Retouching 3D Bolsas/07_video.mp4","bolsas_v2"),
  (P+"01 - Bazaar Moda/14 - Harper's Bazaar - Retouching 3D Bolsas/03_1080x1362.jpg","bolsas_03"),
  (P+"01 - Bazaar Moda/38 - Harper's Bazaar - Eliza Douglas - Julho 2025/imagens/01_DN3n_vTXNpg.jpg","eliza_01"),
  (P+"01 - Bazaar Moda/38 - Harper's Bazaar - Eliza Douglas - Julho 2025/imagens/03_DN3n_vTXNpg.jpg","eliza_03"),
  (P+"01 - Bazaar Moda/35 - Harper's Bazaar Man - Jesuíta Barbosa - Junho 2025/imagens/01_DMtYg2oP7k9.jpg","jesuita_01"),
  (P+"01 - Bazaar Moda/35 - Harper's Bazaar Man - Jesuíta Barbosa - Junho 2025/videos/03_DMtYg2oP7k9.mp4","jesuita_v"),
  (P+"01 - Bazaar Moda/36 - Harper's Bazaar - Daiane Sodré - Janeiro 2026/imagens/04_DTgYCDkEpZT.jpg","daiane_04"),
  (P+"01 - Bazaar Moda/26 - Harper's Bazaar - Março 25 Lais Oliveira/01_bazaar-mar25-lais-oliveira_1080x1350.jpg","lais_01"),
  (P+"01 - Bazaar Moda/41 - Harper's Bazaar - Chanel - Cenografia Grand Palais/videos/01_DPejyTpEW5c.mp4","chanel"),
 ],
 "havaianas": [
  (P+"02 - Havaianas/17 - Havaianas - Filme Full 3D + IA/havaianas-filme.mp4","filme"),
  (P+"02 - Havaianas/04 - Havaianas/01_cena-1.mp4","cena1"),
  (P+"02 - Havaianas/04 - Havaianas/02_cena-2.mp4","cena2"),
  (P+"02 - Havaianas/04 - Havaianas/03_cena-3.mp4","cena3"),
  (P+"02 - Havaianas/04 - Havaianas/04_cena-4.mp4","cena4"),
 ],
 "esmebras": [(P+"03 - Esmebras/28 - Esmebras - Stills de joias/imagens/"+f, "esm_0%d"%(i+1)) for i,f in enumerate([
  "01_esmebras-aneis-pedra-azul.png","02_esmebras-anel-orquidea.png","03_esmebras-macro-pedra-verde.png","04_esmebras-anel-e-esbocos.png","05_esmebras-conjunto-joias.png"])],
 "bvlgari": [(P+"04 - BVLGARI/15 - Bvlgari - Processo Fragrância/"+f, n) for f,n in [
  ("01_2160x2880.jpg","bv_01"),("06_video.mp4","bv_v1"),("02_3072x4096.jpg","bv_02"),("09_video.mp4","bv_v2"),("03_3072x4096.jpg","bv_03"),
  ("12_video.mp4","bv_v3"),("05_2160x2880.jpg","bv_05"),("13_video.mp4","bv_v4"),("07_2160x2880.jpg","bv_07"),("10_2160x2880.jpg","bv_10")]],
 "unni": [(P+"05 - Unni Studio/13 - Unni Studio - Identidade Visual/"+f, n) for f,n in [
  ("01_1440x1788.jpg","unni_01"),("02_video.mp4","unni_v1"),("04_1440x1788.jpg","unni_04"),("03_video.mp4","unni_v2"),
  ("05_1440x1788.jpg","unni_05"),("06_video.mp4","unni_v3"),("videos/01_unni-studio-adesivos-animados.mp4","adesivos")]],
 "google": [(P+"07 - Google AI/08 - Google AI Community - Doodles/google-ai-community-doodles.mp4","doodles")],
 "spfw": [(P+"08 - SPFW/07 - Senac - Backstage SPFW/senac-backstage-spfw.mp4","backstage")],
 "buddemeyer": [(P+"09 - Buddemeyer/24 - Buddemeyer - Vision + UltraSoft/vision/buddemeyer-vision.mp4","vision"),
  (P+"09 - Buddemeyer/24 - Buddemeyer - Vision + UltraSoft/ultrasoft/buddemeyer-ultrasoft.mp4","ultrasoft")],
 "index": [(P+"10 - Kleber Matheus Studio/37 - Index Conectada - Logo e identidade visual/videos/01_DUtYQFPjr40.mp4","index")],
 "bravio": [(P+"11 - Botteh Tapetes + Bravio/11 - Bravio Studios - Ilustração + Desenho Esquemático/"+f, n) for f,n in [
  ("post1_01_1440x1800.jpg","bravio_01"),("post1_02_1440x1800.jpg","bravio_02"),("post1_03_1440x1800.jpg","bravio_03"),("post1_04_1440x1800.jpg","bravio_04"),
  ("post2_01_1440x1800.jpg","esq_01"),("post2_02_video.mp4","esq_v"),("post2_03_1440x1799.jpg","esq_03"),("post2_04_1440x1800.jpg","esq_04")]],
 "extras": [
  (U+"02 - Playground/09 - Jeph GTA/30 - JK Iguatemi - Sequência com estética de videogame/videos/01_jk-iguatemi-carro-e-compras.mp4","jk_gta"),
  (X+"01 - O Boticário - The Blend Saffron/filme_the-blend-saffron.mp4","saffron"),
  (X+"01 - O Boticário - The Blend Saffron/01_saffron-macro.webp","saffron_macro"),
  (X+"02 - Nubank Ultravioleta - Copa do Mundo 2026/filme_nubank-ultravioleta-copa-2026.mp4","nubank"),
  (X+"02 - Nubank Ultravioleta - Copa do Mundo 2026/01_cenario.webp","nubank_cenario"),
  (X+"03 - Cidade Jardim - Itaú Personnalité + Faber-Castell/filme_cidade-jardim-imersivo.mp4","cj_imersivo"),
  (X+"05 - O Boticário - Institucional/filme_boticario-institucional.mp4","boti_inst"),
  (X+"06 - Harper's Bazaar Interiors - Caos e Ordem/bazaar-interiors-caos-e-ordem.mp4","caos_ordem"),
  (X+"10 - Lupo - Motion Design + SFX/lupo-motion-sfx.mp4","lupo"),
  (X+"12 - MBOOM - Vídeo IA + 3D/mboom.mp4","mboom"),
  (X+"16 - Porsche x Louis Vuitton - Campanha Fictícia/porsche-x-lv.mp4","porsche_lv"),
  (X+"18 - Food Experiments - IA + 3D (Workshop Munique)/01_1696x2137.jpg","food_01"),
  (X+"18 - Food Experiments - IA + 3D (Workshop Munique)/04_video.mp4","food_v"),
  (X+"18 - Food Experiments - IA + 3D (Workshop Munique)/08_3250x4096.jpg","food_08"),
  (X+"19 - Studio Reveal Chapter 2/studio-reveal-ch2.mp4","reveal"),
  (X+"20 - Prada Paradoxe - Snapchat Lenses/01_1080x1440.jpg","prada_01"),
  (X+"20 - Prada Paradoxe - Snapchat Lenses/03_video.mp4","prada_v"),
  (X+"21 - Balance - Equilíbrio/balance.mp4","balance"),
  (X+"22 - Balenciaga - Try-on IA/balenciaga-try-on.mp4","balenciaga"),
  (X+"23 - Shopping Cidade Jardim - Revista CJ72 Moda Festa/01_cj72_968x1280.jpg","cj72_01"),
  (X+"23 - Shopping Cidade Jardim - Revista CJ72 Moda Festa/04_cj72_968x1280.jpg","cj72_04"),
  (X+"25 - Revista Quem - Capa Xuxa/01_quem-xuxa_1080x1440.jpg","quem_xuxa"),
  (X+"27 - EQUILIBRIVM II - Álbum Visual (Bezier)/01_equilibrivm-ii.mp4","equilibrivm"),
  (X+"31 - Volvo - Lago ao anoitecer/videos/01_carro-lago-ao-anoitecer.mp4","volvo"),
  (X+"32 - Composição de objetos em equilíbrio/imagens/01_objetos-equilibrio-roda-e-tenis.png","equilibrio_still"),
  (X+"33 - Oasis - Mockups de identidade visual/mockups/01_oasis-caixas-na-areia.png","oasis_01"),
  (X+"33 - Oasis - Mockups de identidade visual/mockups/02_oasis-sacola-a-beira-mar.png","oasis_02"),
  (X+"34 - Achei Primeiro - Stills de luxo/imagens/03_dior-bolsa-saddle-cinza.webp","achei_dior"),
  (X+"34 - Achei Primeiro - Stills de luxo/imagens/06_prada-bolsa-azul.webp","achei_prada"),
  (X+"45 - Eudora - Texturas da campanha - Âmbar e baunilha/texturas/Close Up Amber.png","eudora_ambar"),
 ],
}
def run(c): subprocess.run(c, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
for folder, items in M.items():
    d = os.path.join(OUT, folder); os.makedirs(d, exist_ok=True)
    for src, name in items:
        if src.endswith(".mp4"):
            o = os.path.join(d, name + ".mp4")
            if not os.path.exists(o):
                run(["ffmpeg","-y","-i",src,"-an","-vf","scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))',scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=30",
                     "-c:v","libx264","-preset","slow","-crf","27","-maxrate","2.2M","-bufsize","4M","-pix_fmt","yuv420p","-movflags","+faststart",o])
            p = os.path.join(d, name + "_poster.jpg")
            if not os.path.exists(p):
                run(["ffmpeg","-y","-ss","1","-i",o,"-frames:v","1","-q:v","3",p])
        else:
            o = os.path.join(d, name + ".jpg")
            if not os.path.exists(o):
                run(["convert",src+"[0]","-auto-orient","-resize","1600x1600>","-strip","-quality","84",o])
        print(folder, name, flush=True)
