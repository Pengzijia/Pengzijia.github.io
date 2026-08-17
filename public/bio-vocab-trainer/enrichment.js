// Complete context sentences and morphology breakdowns for the expanded library.
// Hand-curated examples in data.js always take priority over generated context.

const MORPHEME_RULES = [
  { id:"bio", form:"bio-", meaning:"生命", origin:"希腊语 bios，意为生命", color:"#47A36B", pattern:/bio/i },
  { id:"cyto", form:"cyto-", meaning:"细胞", origin:"希腊语 kytos，意为容器、细胞", color:"#5D87D8", pattern:/cyto/i },
  { id:"nucle", form:"nucle-", meaning:"核", origin:"拉丁语 nucleus，意为小核、核心", color:"#9B72CF", pattern:/nucle/i },
  { id:"gen", form:"gen- / gene-", meaning:"产生、基因", origin:"希腊语 genos，意为出生、种类", color:"#E18B55", pattern:/(?:^|\s)(?:gene|genetic|genomic)|genesis|genic/i },
  { id:"chrom", form:"chrom-", meaning:"颜色、染色", origin:"希腊语 chroma；染色体因易着色得名", color:"#D46178", pattern:/chrom/i },
  { id:"phago", form:"phago-", meaning:"吞噬、吃", origin:"希腊语 phagein，意为吃", color:"#CE9C38", pattern:/phago/i },
  { id:"lysis", form:"-lysis / lyso-", meaning:"分解、溶解", origin:"希腊语 lysis，意为松开、分解", color:"#3D9E9A", pattern:/(?:lysis|lyso)/i },
  { id:"poly", form:"poly-", meaning:"多、聚合", origin:"希腊语 polys，意为多", color:"#7476D6", pattern:/poly/i },
  { id:"endo", form:"endo-", meaning:"内部、向内", origin:"希腊语 endon，意为在内", color:"#5FA17E", pattern:/(?:^|\s)endo/i },
  { id:"exo", form:"exo- / ex-", meaning:"外部、向外", origin:"希腊语 exo，意为在外", color:"#C47B5B", pattern:/(?:^|\s)exo/i },
  { id:"micro", form:"micro-", meaning:"微小", origin:"希腊语 mikros，意为小", color:"#4F91A8", pattern:/micro/i },
  { id:"homo", form:"homo-", meaning:"相同", origin:"希腊语 homos，意为相同", color:"#8C7BCA", pattern:/(?:^|\s)homo/i },
  { id:"hetero", form:"hetero-", meaning:"不同", origin:"希腊语 heteros，意为另一个、不同", color:"#C6818F", pattern:/(?:^|\s)hetero/i },
  { id:"acro", form:"acro-", meaning:"顶端、末端", origin:"希腊语 akros，意为最高处、末端", color:"#C56D67", pattern:/acro/i },
  { id:"adeno", form:"adeno-", meaning:"腺", origin:"希腊语 aden，意为腺体", color:"#B878A4", pattern:/adeno/i },
  { id:"amino", form:"amino-", meaning:"氨基", origin:"化学构词单位，指含氮的氨基基团", color:"#6F8BC7", pattern:/amino/i },
  { id:"angio", form:"angio-", meaning:"血管、导管", origin:"希腊语 angeion，意为容器、血管", color:"#C86969", pattern:/(?:angio|vascular)/i },
  { id:"anti", form:"anti-", meaning:"抗、反对", origin:"希腊语 anti，意为相对、抵抗", color:"#D07868", pattern:/(?:^|\s)anti/i },
  { id:"auto", form:"auto-", meaning:"自身", origin:"希腊语 autos，意为自己", color:"#9180C8", pattern:/(?:^|\s)auto/i },
  { id:"blast", form:"blast-", meaning:"芽、胚性细胞", origin:"希腊语 blastos，意为芽、萌发", color:"#DD8F68", pattern:/blast/i },
  { id:"cardio", form:"cardio-", meaning:"心脏", origin:"希腊语 kardia，意为心脏", color:"#D55B6A", pattern:/(?:cardio|cardiac)/i },
  { id:"chem", form:"chem- / chemo-", meaning:"化学", origin:"用于表示化学物质或化学作用", color:"#6A91B8", pattern:/chem/i },
  { id:"chloro", form:"chloro-", meaning:"绿色、氯", origin:"希腊语 chloros，意为黄绿色", color:"#69A85E", pattern:/chloro/i },
  { id:"derm", form:"derm-", meaning:"皮肤、胚层", origin:"希腊语 derma，意为皮肤", color:"#C18A70", pattern:/(?:derm|dermal)/i },
  { id:"eco", form:"eco-", meaning:"环境、家园", origin:"希腊语 oikos，意为家园、环境", color:"#5E9C72", pattern:/(?:^|\s)eco/i },
  { id:"electro", form:"electro-", meaning:"电、电活动", origin:"希腊语 elektron，现代构词中表示电", color:"#5B8FAE", pattern:/electro/i },
  { id:"glyco", form:"glyco-", meaning:"糖、甜", origin:"希腊语 glykys，意为甜", color:"#C5964D", pattern:/(?:glyco|gluco)/i },
  { id:"hem", form:"hem- / hemat-", meaning:"血液", origin:"希腊语 haima，意为血", color:"#C45D66", pattern:/(?:hemo|haemo|hemat)/i },
  { id:"hepato", form:"hepato-", meaning:"肝脏", origin:"希腊语 hepar，意为肝脏", color:"#9E7657", pattern:/hepato/i },
  { id:"hydro", form:"hydro-", meaning:"水", origin:"希腊语 hydor，意为水", color:"#5199B5", pattern:/hydro/i },
  { id:"immun", form:"immun-", meaning:"免疫、保护", origin:"拉丁语 immunis，意为免除、受保护", color:"#5F9A75", pattern:/immun/i },
  { id:"karyo", form:"karyo-", meaning:"细胞核", origin:"希腊语 karyon，意为核、果仁", color:"#8E70BB", pattern:/karyo/i },
  { id:"lipo", form:"lipo-", meaning:"脂肪", origin:"希腊语 lipos，意为脂肪", color:"#C69555", pattern:/(?:lipo|lipid)/i },
  { id:"macro", form:"macro-", meaning:"大、宏观", origin:"希腊语 makros，意为大、长", color:"#5E88A1", pattern:/(?:^|\s)macro/i },
  { id:"meta", form:"meta-", meaning:"改变、超越", origin:"希腊语 meta，表示改变、之后或超越", color:"#8375B9", pattern:/(?:^|\s)meta/i },
  { id:"mito", form:"mito-", meaning:"线、丝", origin:"希腊语 mitos，意为线；见于线粒体、有丝分裂", color:"#B6748F", pattern:/(?:mito|mitosis)/i },
  { id:"morph", form:"morph-", meaning:"形态、形状", origin:"希腊语 morphe，意为形状", color:"#A47BBA", pattern:/morph/i },
  { id:"neuro", form:"neuro-", meaning:"神经", origin:"希腊语 neuron，意为神经、腱", color:"#7A78C3", pattern:/neuro/i },
  { id:"onco", form:"onco-", meaning:"肿瘤、肿块", origin:"希腊语 onkos，意为肿块", color:"#B76872", pattern:/onco/i },
  { id:"osteo", form:"osteo-", meaning:"骨", origin:"希腊语 osteon，意为骨", color:"#A88D6D", pattern:/osteo/i },
  { id:"patho", form:"patho-", meaning:"疾病、病变", origin:"希腊语 pathos，意为痛苦、疾病", color:"#B75D68", pattern:/patho/i },
  { id:"photo", form:"photo-", meaning:"光", origin:"希腊语 phos/photos，意为光", color:"#D0A342", pattern:/photo/i },
  { id:"phospho", form:"phospho-", meaning:"磷酸、磷酸基", origin:"化学构词单位，表示含磷酸基团", color:"#AE8A4C", pattern:/phospho/i },
  { id:"phylo", form:"phylo-", meaning:"类群、演化谱系", origin:"希腊语 phylon，意为族、类群", color:"#668F6F", pattern:/phylo/i },
  { id:"proto", form:"proto-", meaning:"最初、原始", origin:"希腊语 protos，意为第一", color:"#B98462", pattern:/(?:^|\s)proto/i },
  { id:"pseudo", form:"pseudo-", meaning:"假、类似但非真正", origin:"希腊语 pseudes，意为假的", color:"#9A8299", pattern:/(?:^|\s)pseudo/i },
  { id:"ribo", form:"ribo-", meaning:"核糖、核糖体", origin:"来自 ribose，在分子生物学中常见", color:"#7887B8", pattern:/ribo/i },
  { id:"soma", form:"som- / soma-", meaning:"身体、体", origin:"希腊语 soma，意为身体", color:"#7C9A87", pattern:/(?:soma|somatic|some$)/i },
  { id:"thermo", form:"thermo-", meaning:"热、温度", origin:"希腊语 therme，意为热", color:"#D07955", pattern:/thermo/i },
  { id:"troph", form:"troph-", meaning:"营养、生长", origin:"希腊语 trophe，意为营养", color:"#799A58", pattern:/troph/i },
  { id:"zoo", form:"zoo-", meaning:"动物", origin:"希腊语 zoon，意为动物", color:"#8A8B62", pattern:/(?:^|\s)zoo/i },
  { id:"ase", form:"-ase", meaning:"酶", origin:"生化命名后缀，通常表示催化酶", color:"#4D8D93", pattern:/(?:ase|ases)$/i },
  { id:"itis", form:"-itis", meaning:"炎症", origin:"医学后缀，表示炎症状态", color:"#C45F64", pattern:/itis$/i },
  { id:"logy", form:"-logy", meaning:"……学、研究", origin:"希腊语 logos，意为论述、研究", color:"#667FA4", pattern:/(?:logy|logical)$/i },
  { id:"oma", form:"-oma", meaning:"肿块、肿瘤", origin:"医学后缀，常表示肿瘤或肿块", color:"#B86470", pattern:/oma$/i },
  { id:"osis", form:"-osis", meaning:"过程、状态", origin:"希腊语名词后缀，表示过程或状态", color:"#9276A5", pattern:/osis$/i },
  { id:"ome", form:"-ome / -omics", meaning:"整体集合、组学", origin:"现代生物学后缀，表示完整集合及其研究", color:"#6D78B5", pattern:/(?:ome|omics)$/i },
  { id:"tomy", form:"-tomy", meaning:"切开、切割", origin:"希腊语 tome，意为切割", color:"#A4746A", pattern:/tomy$/i }
];

const COMPONENT_GLOSSARY = {
  cell:"细胞", cellular:"细胞的", protein:"蛋白质", proteins:"蛋白质", gene:"基因", genetic:"遗传的",
  genome:"基因组", genomic:"基因组的", dna:"DNA", rna:"RNA", membrane:"膜", receptor:"受体", factor:"因子",
  pathway:"通路", pathways:"通路", system:"系统", response:"反应", structure:"结构", function:"功能", synthesis:"合成",
  development:"发育", differentiation:"分化", growth:"生长", division:"分裂", cycle:"循环", metabolism:"代谢",
  metabolic:"代谢的", enzyme:"酶", activity:"活性", binding:"结合", site:"位点", transport:"运输", signal:"信号",
  signaling:"信号传导", immune:"免疫的", immunity:"免疫", bacterial:"细菌的", bacteria:"细菌", viral:"病毒的",
  virus:"病毒", fungal:"真菌的", organism:"生物体", organisms:"生物体", species:"物种", population:"种群",
  community:"群落", ecological:"生态的", ecosystem:"生态系统", embryonic:"胚胎的", embryo:"胚胎", stem:"干",
  tissue:"组织", organ:"器官", analysis:"分析", experimental:"实验的", experiment:"实验", control:"对照、控制",
  study:"研究", design:"设计", model:"模型", method:"方法", sequencing:"测序", expression:"表达", regulation:"调控",
  regulatory:"调控的", mutation:"突变", variation:"变异", replication:"复制", transcription:"转录", translation:"翻译",
  chain:"链", acid:"酸", amino:"氨基", molecular:"分子的", biological:"生物学的", biotechnology:"生物技术"
};

const CATEGORY_CONTEXT = {
  "基本概念":"core biological structures and life processes", "细胞生物学":"cellular organization, transport, and signaling",
  "遗传学":"inheritance, genome function, and gene expression", "分子生物学":"the flow and regulation of genetic information",
  "生物化学":"molecular reactions, enzymes, and metabolism", "细胞信号":"receptor activation and intracellular signaling",
  "生态学":"organisms, populations, and ecosystems", "生物技术":"experimental manipulation and biotechnology applications",
  "微生物学":"microbial growth and host interactions", "免疫学":"immune recognition, response, and memory",
  "研究方法":"study design, data analysis, and interpretation", "生理学与生物物理":"organ function and physiological regulation",
  "发育生物学":"embryonic development, patterning, and cell fate", "微生物学与免疫学":"microbial growth, infection, and immune responses"
};

function sentenceCaseTerm(value) {
  if (/^[A-Z0-9-]{2,}$/.test(value)) return value;
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function generatedContext(term) {
  const subject = sentenceCaseTerm(term.en);
  const topic = CATEGORY_CONTEXT[term.category] || "biological structure and function";
  const variant = [...term.en].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 3;
  if (variant === 0) return `The study examined ${subject} to better understand ${topic}.`;
  if (variant === 1) return `Researchers discussed ${subject} while investigating ${topic}.`;
  return `The results highlighted the role of ${subject} in ${topic}.`;
}

function enrichTerms() {
  MORPHEME_RULES.forEach(rule => {
    if (!ROOTS.some(root => root.id === rule.id)) ROOTS.push({ id:rule.id, form:rule.form, meaning:rule.meaning, origin:rule.origin, color:rule.color });
  });

  TERMS.forEach(term => {
    const inferred = MORPHEME_RULES.filter(rule => rule.pattern.test(term.en)).map(rule => rule.id);
    term.roots = [...new Set([...(term.roots || []), ...inferred])];
    term.example = term.example || generatedContext(term);
    term.contextZh = term.contextZh || `在${term.category}语境中，${term.en}表示“${term.zh}”。`;
    const rootParts = term.roots.map(id => {
      const root = ROOTS.find(item => item.id === id);
      return root ? `${root.form}（${root.meaning}）` : "";
    }).filter(Boolean);
    const wordParts = term.en.toLowerCase().replace(/[^a-z0-9-]+/g, " ").split(/\s+/)
      .filter(word => COMPONENT_GLOSSARY[word])
      .map(word => `${word}（${COMPONENT_GLOSSARY[word]}）`);
    term.breakdown = [...new Set([...rootParts, ...wordParts])];
    if (!term.breakdown.length) term.breakdown = [`整体术语 ${term.en}（${term.zh}）`];
  });
}

enrichTerms();
