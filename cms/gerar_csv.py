import csv, json
B="https://framerusercontent.com/images/"
P=[
("orbis","Orbis","ORB","Branding, Motion","2025","A Orbis nasce como um núcleo de inovação, inaugurado na Design Week 2025, em São Paulo, com o propósito de criar experiências transformadoras. O projeto atua na interseção entre narrativas digitais, inteligência artificial, Web3, mobilidade e educação, desenvolvendo experiências imersivas que moldam o futuro.",
 ["64vAqRCnOGKEZ57grcuMV69e0.jpg:4x5","VEMX3vsSu9fF7vFFghzyNj3AU.jpg:4x3","Lv0v4SWBbiYRIy19xRjqyOzmK5o.jpg:4x3","k0QK21SOTg7x4oYVN972nEnRE.jpg:4x3","tY1N391KBFGTyUEnpjFVV6G3jI.jpg:4x3"]),
("ema-studio","Ema Studio","EMA","Branding","2025","A Ema Studio é uma produtora audiovisual que traduz criatividade em movimento. O nome carrega leveza, ritmo e brasilidade, remetendo ao pássaro que, embora não voe, percorre grandes distâncias com personalidade única. A identidade combina uma tipografia amigável e de leitura direta com o ícone ilustrado da ema, criando uma marca lúdica e fácil de reconhecer.",
 ["doBXAmpt2Vp9ryROgDdZQSgDI.jpg:4x5","8fedU2sdkaY6fUXXDrQnH3YTas.jpg:1x1","5TcupH7eO5gRuMuxeD9wBzwwXc.jpg:4x3","VNVY2WddnmcrAnMhU3tl2Gj8A.jpg:4x3"]),
("easy-diagnostics","Easy Diagnostics","EDX","Branding","2024","A Easy Diagnostics surgiu com o objetivo de liderar inovações no campo dos diagnósticos, transformando a forma como o mercado de saúde, bem-estar e estética se conecta com seus clientes no Brasil e no mundo. A logomarca reflete essa visão, com elementos que transmitem modernidade e inovação.",
 ["aQ8msFKEMLxyuv4ywdoNAzfpI28.jpg:4x5","kRA4TI9eZwJJjmTYwe5LvHLR0o.jpg:4x3","Lwo81sXJimbmnAKZ7YqFfPBqn8.jpg:4x3","4Y4j15cE4KcUjLpUZpkpgHWsXbc.jpg:4x3"]),
("clinica-lys","Clínica LYS","LYS","Rebranding","2024","Rebranding da Clinic LYS e do Institute LYS. O ícone foi projetado para transmitir sofisticação e exclusividade: um monograma elegante em que as letras L, Y e S se entrelaçam de forma harmoniosa, criando uma identidade forte e marcante.",
 ["SswiMlpcoRgdm2VXOycgb7bQkis.jpg:4x5","iSBgxIYRN6Ra0XdMyoRBFyEwvQA.jpg:4x3","ScbwW3njy5xVXWpJt3LnVa5EA.jpg:4x3","ruiqJfUMbBlcdE7S0efuqbrPd0.jpg:4x3","1YlsELsItNmgVNEqATt96kycNOw.jpg:4x3"]),
("botteh-tapetes","Botteh Tapetes","BTH","Ilustração","2024","Ilustração de texturas e bolsas para a Bravio Studio, em parceria com a Botteh Tapetes. As estampas foram desenvolvidas para dialogar com a materialidade dos produtos, unindo desenho autoral e aplicação em peças físicas.",
 ["N3VBDDMjTNS3XkVzE9G5MBGPQ.jpg:4x5","YxJXAuuNnHmjwHB3r92VRivxpc.jpg:4x3"]),
("aysu","Aysù","AYS","Identidade visual","2023","A nova identidade visual da Aysù foi criada para conectar a marca ao público europeu, com um toque descontraído e refinado. Marca brasileira agora disponível em Paris, a Aysù combina a essência latina com o cenário europeu, levando a autenticidade do Brasil além das fronteiras.",
 ["THvxkjpfh76YJaiavsT0ubQWtY.jpg:4x5","QbHdfcOEXrbupcNsNmsJnk70ZYE.jpg:4x3","NiS7jLnWpFSx66BeFGY14HKa9sA.jpg:4x3","NTGjWHN0WdigYg2NMeou628sos.jpg:4x3"]),
("mescla","Mescla","MSC","Rebranding, Direção de arte","2023","Rebranding da marca de slow fashion Mescla. A mudança foi motivada pelo novo momento da marca, em expansão e buscando se posicionar de forma mais impactante e leve. A nova identidade visual foi desenvolvida com ilustrações em aquarela e intervenções de pintura digital.",
 ["Imv5lxlMc4Mvtiqf97a5nc.jpg:4x5","SdmLA3M0qiEo1kZXSAqOpYzgmps.jpg:4x3","vJOME45gDyMdzV579ItqICttDQ.jpg:4x3","x6lqXPWvw7mqfDCXxufeIRJHSHA.jpg:4x3"]),
("flavia-aranha","Flávia Aranha","FLA","Design gráfico","2023","Peças gráficas para a marca Flávia Aranha, incluindo e-mails de marketing e artes para campanhas. Os visuais refletem a proposta de moda sustentável e artesanal da marca, com campanhas pensadas para engajar o público e comunicar novidades e valores de forma coesa nas plataformas digitais.",
 ["z4jZr1EW6plmyJRu3jXBjp1c.jpg:4x5","vqYQtm9pAMGtlGKuMHSlFzINs.jpg:4x3"]),
("surrealismo-tropical","Surrealismo Tropical","SRT","Direção criativa","2022","Moodboard para a campanha da Mescla, uma celebração do Carnaval sob o tema Surrealismo Tropical. A campanha explora a fusão entre elementos oníricos e a riqueza cultural brasileira, com cores intensas, formas inusitadas e uma estética que mistura o real e o imaginário.",
 ["wgI9aJFpvwkv65gFhLIVv8JQys.jpg:4x5","EUYkk3wV0lLCkeSewBdq4Zr23Bo.jpg:4x3","j4hmT7FeBLRQXG0EBCxxE3uqUlY.jpg:4x3","s9IM3pQv2i9M6TkfoQWtaVftk6s.jpg:4x3","rJGQWDzGtRX5Vm05R2Ep0YIjJVU.jpg:4x3","L7RntvMtPj4T1sgbgwrTtikRhQ.jpg:4x3"]),
("best-amuse","Best Amuse","BAM","Identidade visual","2022","A logomarca da Best Amuse foi criada para refletir sofisticação e modernidade, incorporando o encanto atemporal da roda-gigante e do carrossel. O ícone central simboliza a diversão que a empresa oferece, tornando a marca tão memorável quanto as experiências vividas nos brinquedos.",
 ["cVvdR63417XRy28KGQFEqLOkCg.jpg:4x5","xckhrm58PIRIVihyQ4hUp1KA.jpg:4x3","yoSzfvXFuhykv1XlkaLTqOqZhj8.jpg:4x3","vBMNK51iYgDnPEH4Wh4Q64bnzk.jpg:4x3"]),
]
N=6
hdr=["Title","Slug","Category","Year","Info"]
for i in range(1,N+1):
    hdr+=[f"Image {i}", "Image Caption" if i==1 else f"Image Caption {i}", f"Content {i} - Aspect Ratio"]
rows=[]
for s,t,c,cat,y,info,imgs in P:
    r=[t,s,cat,y,info]
    for i in range(N):
        if i<len(imgs):
            idn,ar=imgs[i].split(":")
            r+=[B+idn, f"{c}_{i+1:02d}.JPG", ar]
        else:
            r+=["","",""]
    rows.append(r)
with open("lio_projetos.csv","w",newline="",encoding="utf-8") as f:
    w=csv.writer(f); w.writerow(hdr); w.writerows(rows)
print(open("lio_projetos.csv").read()[:600])
json.dump(open("lio_projetos.csv",encoding="utf-8").read(), open("csv.json","w"))
