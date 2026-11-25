import "@fontsource/cormorant-garamond/latin-600.css"
import "@fontsource/cormorant-garamond/latin-600-italic.css"
import "@fontsource/cormorant-garamond/latin-700.css"
import "@fontsource/lora/latin-400.css"
import "@fontsource/caveat/latin-600.css"
import "@fontsource/dm-sans/latin-600.css"
import "@fontsource/dm-sans/latin-700.css"
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen, Coffee, CookingPot, DoorOpen, Flower2, House, List, Mail, Menu, Music2, PanelTop, Pause, Play, RotateCcw, Sparkles, Utensils, VolumeX, X } from 'lucide-react'
import { mothersDay as data, type GalleryPhoto } from './data/mothersDay'
import { Art, Flower, hasMedia } from './art'
import { dateLabel, eventDate, saveImage, saveLetter } from './exports'
import './styles.css'

const nav = [
  ['beranda','Beranda'], ['kehangatan','Kehangatan Rumah'], ['masakan','Masakan Ibu'],
  ['resep','Buku Resep'], ['kenangan','Kenangan'], ['doa','Doa untuk Ibu'], ['surat','Surat untuk Ibu'],
]
const tableIcons = [Coffee, Coffee, Utensils, Utensils, CookingPot, BookOpen, PanelTop, House]
const positions = [[81,79],[65,63],[50,77],[16,79],[29,64],[39,48],[31,26],[81,42]]
const publicPreview = data.preview || new URLSearchParams(location.search).get('pratinjau') === '1'

function usePreference<T,>(key: string, initial: T) {
  const storageKey = 'hari-ibu:' + key
  const [value, setValue] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) ?? 'null') ?? initial }
    catch { return initial }
  })
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(value)) } catch { /* Penyimpanan opsional. */ } }, [storageKey, value])
  return [value, setValue] as const
}

function Paragraphs({ values }: { values: string[] }) {
  return <div className="prose-copy">{values.map((line, i) => <p key={i}>{line}</p>)}</div>
}

function Chapter({ id, eyebrow, children, className = '' }: { id: string; eyebrow: string; children: ReactNode; className?: string }) {
  if (data.hidden.includes(id)) return null
  return <motion.section id={id} className={'chapter ' + className} initial="rest" whileInView="show" viewport={{once:true, amount:0.12}}>
    <motion.div className="section-inner" variants={{rest:{opacity:.8, y:12},show:{opacity:1,y:0}}} transition={{duration:.6}}>
      <div className="section-heading"><span className="eyebrow"><span />{eyebrow}</span><h2>{data.chapters[id].title}</h2></div>
      {children}
    </motion.div>
  </motion.section>
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, eventDate.getTime() - Date.now()))
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, eventDate.getTime() - Date.now())), 250)
    return () => window.clearInterval(timer)
  }, [])
  const seconds = Math.ceil(remaining / 1000)
  const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]
  return <div className="countdown" aria-label="Hitung mundur menuju Hari Ibu">{['Hari','Jam','Menit','Detik'].map((label,i) =>
    <div key={label}><strong>{String(values[i]).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>
}

function MediaControls({ kind, src, onPlaying }: { kind: 'audio' | 'video'; src: string; onPlaying?: (value: boolean) => void }) {
  const ref = useRef<HTMLMediaElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const title = kind === 'audio' ? 'rekaman' : 'video'
  const events = {
    src, preload: 'metadata', onPlay: () => { setPlaying(true); onPlaying?.(true) },
    onPause: () => { setPlaying(false); onPlaying?.(false) },
    onEnded: () => { setPlaying(false); onPlaying?.(false) },
    onError: () => { setFailed(true); onPlaying?.(false) },
  }
  useEffect(() => () => onPlaying?.(false), [onPlaying])
  function play(restart = false) {
    const media = ref.current
    if (!media) return
    if (restart) media.currentTime = 0
    void media.play().catch(() => setFailed(true))
  }
  return <div className="media-controls">
    {kind === 'audio' ? <audio {...events} ref={element => {ref.current = element}} /> : <video {...events} playsInline ref={element => {ref.current = element}} />}
    <div className="actions">
      <button type="button" onClick={() => playing ? ref.current?.pause() : play()}>{playing ? <Pause/> : <Play/>}{playing ? 'Jeda ' + title : kind === 'audio' ? 'Dengarkan suaraku' : 'Putar video'}</button>
      <button className="quiet" type="button" onClick={() => play(true)}><RotateCcw/>Putar ulang {title}</button>
    </div>
    {failed && <p role="status">{kind === 'audio' ? 'Rekaman' : 'Video'} belum dapat diputar.</p>}
  </div>
}

function RecipeBook() {
  const [page, setPage] = useState(0)
  const recipe = data.recipes[page]
  if (!recipe) return null
  return <div className="book">
    <AnimatePresence mode="wait">
      <motion.div key={page} className="book-page" initial={{opacity:0,rotateY:-7}} animate={{opacity:1,rotateY:0}} exit={{opacity:0,rotateY:7}}>
        <div>
          <BookOpen size={31} aria-hidden="true"/>
          <span className="eyebrow">Halaman {page + 1} dari {data.recipes.length}</span>
          <h3>{recipe.title}</h3>
          {recipe.photo && <OptionalPhoto photo={{src:recipe.photo, alt:recipe.title, caption:''}}/>}
          {recipe.story && <p className="hand">{recipe.story}</p>}
        </div>
        <div><h4>Bahan-bahan</h4><ul>{recipe.ingredients.map(item => <li key={item}>{item}</li>)}</ul>
          <h4>Cara membuat</h4><p>{recipe.method}</p><p className="hand">{recipe.note}</p>
          {recipe.audio && <MediaControls kind="audio" src={recipe.audio}/>}
          {recipe.video && <MediaControls kind="video" src={recipe.video}/>}
        </div>
      </motion.div>
    </AnimatePresence>
    <div className="actions book-nav"><button disabled={!page} onClick={() => setPage(page-1)}><ArrowLeft/>Sebelumnya</button>
      <button disabled={page === data.recipes.length-1} onClick={() => setPage(page+1)}>Berikutnya<ArrowRight/></button>
    </div>
  </div>
}

function OptionalPhoto({ photo }: { photo: GalleryPhoto }) {
  const [failed,setFailed] = useState(false)
  return failed ? <Art kind="window"/> : <img loading="lazy" src={photo.src} alt={photo.alt} onError={() => setFailed(true)}/>
}

function Gallery() {
  const [photo, setPhoto] = useState<GalleryPhoto | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (photo) dialog.current?.showModal() }, [photo])
  return <><div className="gallery" aria-label="Album kenangan">
    {(data.gallery.length ? data.gallery : data.galleryFallback).map((item, i) => <button className="polaroid" key={i} onClick={() => setPhoto(item)}><OptionalPhoto photo={item}/><span className="hand">{item.caption}</span></button>)}
  </div>
  <dialog ref={dialog} onClose={() => setPhoto(null)} className="photo-dialog" aria-label="Foto kenangan">
    <button className="quiet" onClick={() => dialog.current?.close()}><X/>Tutup foto</button>
    {photo && <><OptionalPhoto photo={photo}/><p className="hand">{photo.caption}</p></>}
  </dialog></>
}

function App() {
  const [entered, setEntered] = usePreference('masuk', false)
  const [found, setFound] = usePreference<number[]>('kenangan', [])
  const [picked, setPicked] = usePreference<number[]>('bunga', [])
  const [read, setRead] = usePreference<number[]>('surat-kecil', [])
  const [volume, setVolume] = usePreference('volume', .38)
  const [muted, setMuted] = usePreference('hening', false)
  const [ready, setReady] = useState(() => Date.now() >= eventDate.getTime())
  const [entering, setEntering] = useState(false)
  const [menu, setMenu] = useState(false)
  const [audioPanel, setAudioPanel] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [voicePlaying, setVoicePlaying] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [tea, setTea] = useState(false)
  const [comparison, setComparison] = useState(1)
  const [activeMemory, setActiveMemory] = useState<number | null>(null)
  const [activePrayer, setActivePrayer] = useState<number | null>(null)
  const [letter, setLetter] = useState(false)
  const [exportError, setExportError] = useState('')
  const [activeNav, setActiveNav] = useState('beranda')
  const bg = useRef<HTMLAudioElement>(null)
  const reduced = useReducedMotion()
  const music = hasMedia(data.audio.background)
  const knock = hasMedia(data.audio.knock)
  const door = hasMedia(data.audio.door)
  const paper = hasMedia(data.audio.paper)
  const morning = hasMedia(data.audio.morning)
  const voice = hasMedia(data.audio.voice)
  const video = hasMedia(data.video)
  const waiting = data.countdown && !publicPreview && !ready
  const navItems = nav.filter(([id]) => !data.hidden.includes(id))
  const previewOpen = Boolean(new URLSearchParams(location.search).get('pratinjau') === '1')
  const showOpening = !entered && (!previewOpen || location.hash === '#pembuka')
  const firstChapter = navItems.find(([id]) => id !== 'beranda')?.[0]
  const customHero = data.images.hero
  const [heroFailed, setHeroFailed] = useState(false)

  useEffect(() => {
    document.title = data.title
    document.querySelector('meta[name="robots"]')?.setAttribute('content', data.privacy.noIndex ? 'noindex,nofollow' : 'index,follow')
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', new URL(data.privacy.previewImage, location.href).href)
    if (ready) return
    const timer = window.setInterval(() => { if (Date.now() >= eventDate.getTime()) setReady(true) }, 250)
    return () => window.clearInterval(timer)
  }, [ready])
  useEffect(() => {
    if (bg.current) {
      bg.current.volume = Math.max(0, Math.min(1, volume * (voicePlaying || videoPlaying ? .18 : 1)))
      bg.current.muted = muted
    }
  }, [volume, muted, voicePlaying, videoPlaying, music])
  useEffect(() => {
    if (waiting || showOpening) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveNav(entry.target.id)
    }, {rootMargin:'-18% 0px -58% 0px'})
    navItems.forEach(([id]) => {const section = document.getElementById(id); if (section) observer.observe(section)})
    return () => observer.disconnect()
  }, [waiting, showOpening])

  function sound(path: string, available: boolean) {
    if (!available || muted) return
    const audio = new Audio(path)
    audio.volume = volume
    void audio.play().catch(() => {})
  }
  function startMusic() {
    void bg.current?.play().catch(() => setPlaying(false))
  }
  function enter(skip: boolean) {
    if (entering) return
    startMusic()
    if (!skip) {
      sound(data.audio.knock, knock)
      setEntering(true)
      window.setTimeout(() => sound(data.audio.door, door), reduced ? 0 : 420)
    }
    window.setTimeout(() => {
      setEntered(true)
      setEntering(false)
      if (location.hash === '#pembuka') history.replaceState(null,'',location.pathname + location.search)
      window.scrollTo(0,0)
    }, skip || reduced ? 0 : 900)
  }
  function reset() {
    bg.current?.pause()
    if (bg.current) bg.current.currentTime = 0
    setEntered(false)
    setFound([])
    setPicked([])
    setRead([])
    setTea(false)
    setLetter(false)
    setActiveMemory(null)
    setActivePrayer(null)
    setComparison(1)
    history.replaceState(null, '', location.pathname + location.search + '#pembuka')
    window.scrollTo({top:0, behavior:'instant'})
  }
  function openMemory(i: number) { setFound(items => items.includes(i) ? items : [...items,i]); setActiveMemory(i) }
  function pick(i: number) { setPicked(items => items.includes(i) ? items : [...items,i]); setActivePrayer(i) }
  function openLetter() { setLetter(true); sound(data.audio.paper, paper) }
  async function download(make: () => Promise<void>) {
    try { setExportError(''); await make() }
    catch { setExportError('Berkas belum bisa disimpan. Silakan coba lagi.') }
  }

  return <MotionConfig reducedMotion="user">
    {music && <audio ref={bg} src={data.audio.background} preload="none" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>}
    {waiting ? <main className="gate waiting"><div className="gate-copy"><span className="eyebrow"><Mail size={16}/> Sebuah hadiah sedang menunggu</span>
      <h1>{data.title}</h1><Paragraphs values={data.waiting}/><Countdown/><p className="gate-date">{dateLabel} · {new Intl.DateTimeFormat('id-ID', {hour:'2-digit', minute:'2-digit', hourCycle:'h23', timeZone:'Asia/Jakarta'}).format(eventDate)} WIB</p>
    </div><Art kind="window" src={data.images.window || '/images/home/jendela.webp'}/></main> :
    showOpening ? <main className={'gate opening ' + (entering ? 'opening-door' : '')}>
      <div className="gate-copy"><span className="eyebrow"><House size={16}/> Selamat datang di rumah</span>
        <div className="opening-lines">{data.opening.slice(0,4).map((line,i) => <motion.p key={line} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : i*.24}}>{line}</motion.p>)}</div>
        <h1>Aku pulang, Bu.</h1><div className="actions"><button disabled={entering} onClick={() => enter(false)}><DoorOpen/>Ketuk pintunya</button><button className="quiet" disabled={entering} onClick={() => enter(true)}>Lewati pembuka</button></div>
      </div><div className="door-scene"><Art kind="door" src={data.images.door}/></div>
    </main> :
    <>
      <a className="skip-link" href="#isi">Langsung ke isi</a>
      <header className="site-header"><div className="header-inner">
        <a className="brand" href={'#'+(navItems[0]?.[0] ?? 'isi')}><span><House size={17}/></span>Rumah Ibu</a>
        <button className="menu-button quiet" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}Menu</button>
        <nav aria-label="Navigasi utama" className={menu ? 'is-open' : ''}>{navItems.map(([id,label]) =>
          <a key={id} href={'#'+id} aria-current={activeNav === id ? 'location' : undefined} onClick={() => setMenu(false)}>{label}</a>)}</nav>
        <div className="audio-tools"><button className="sound-button quiet" aria-expanded={audioPanel} onClick={() => setAudioPanel(!audioPanel)}><Music2 size={16}/> Musik</button>
        {audioPanel && <div className="audio-panel">
          {music ? <><button onClick={() => playing ? bg.current?.pause() : startMusic()}>{playing ? <Pause/> : <Play/>}{playing ? 'Jeda musik' : 'Putar musik'}</button>
            <button className="quiet" onClick={() => setMuted(!muted)}><VolumeX/>{muted ? 'Nyalakan suara' : 'Matikan suara'}</button>
            <label>Volume <input type="range" min="0" max="1" step=".01" value={volume} onChange={event => setVolume(Number(event.currentTarget.value))}/></label></> : <p>Musik belum tersedia.</p>}
        </div>}</div>
      </div></header>
      <main id="isi">
        {!data.hidden.includes('beranda') && <section id="beranda" className="hero">
          <div className="hero-photo" style={{backgroundImage: customHero && !heroFailed ? 'url("' + customHero + '"), url(/images/home/serambi.webp)' : undefined}}/>
          {customHero && <img hidden src={customHero} alt="" onError={() => setHeroFailed(true)}/>}
          <div className="hero-content"><span className="eyebrow"><span/>{dateLabel} &nbsp;·&nbsp; Selamat Hari Ibu</span>
            <h1>{data.title === 'Rumah yang Selalu Kurindukan' ? <>Rumah yang Selalu <em>Kurindukan</em></> : data.title}</h1>
            <p>{data.heroQuote}</p>{firstChapter && <a className="button hero-button" href={'#'+firstChapter}><ArrowDown size={17}/>Yuk, masuk lebih jauh</a>}
          </div>
          <span className="hero-note hand">{data.dedication}</span>
        </section>}
        {!data.hidden.includes('beranda') && <section className="home-intro"><div className="intro-mark"><Sparkles size={22}/></div>
          <blockquote>“{data.mainQuote}”</blockquote>
          <Paragraphs values={data.chapters.beranda.paragraphs}/></section>}
        <Chapter id="kehangatan" eyebrow="Kehangatan rumah" className="split tea-chapter">
          <button className="art-button" aria-expanded={tea} onClick={() => { setTea(!tea); if (!tea) sound(data.audio.morning, morning) }}><Art kind="teacup" src={data.images.tea || '/images/food/teh-pagi.webp'}/><span><Coffee size={17}/>Sentuh gelas tehnya</span></button>
          <div><Paragraphs values={data.chapters.kehangatan.paragraphs}/>{tea && <p className="note hand" role="status">{data.teaMessage}</p>}</div>
        </Chapter>
        <Chapter id="masakan" eyebrow="Masakan Ibu" className="split meal-chapter">
          <Art kind="dining-table" src={data.images.kitchen}/>
          <div><Paragraphs values={data.chapters.masakan.paragraphs}/><blockquote>{data.mealQuote}</blockquote><p className="hand meal-note">{data.supportingQuotes[0]}</p></div>
          <div className="comparison"><div className="actions" aria-label="Bandingkan keseharian">
            {data.comparison.map((item,i) => <button className={comparison === i ? '' : 'quiet'} aria-pressed={comparison === i} onClick={() => setComparison(i)} key={item.title}>{item.title}</button>)}</div>
            <ul aria-live="polite">{data.comparison[comparison].items.map(item => <li key={item}>{item}</li>)}</ul></div>
        </Chapter>
        <Chapter id="meja" eyebrow="Di meja makan">
          <p className="section-description">Sentuh benda di meja atau pilih namanya untuk menemukan cerita kecil dari rumah.</p>
          <div className="table-scene"><Art kind="dining-table" src={data.images.kitchen}/>
            {data.table.map((item,i) => { const Icon = tableIcons[i] ?? Sparkles; const [x,y] = positions[i] ?? [50,50]; return <button className={'hotspot ' + (found.includes(i) ? 'found' : '')} style={{left:x+'%',top:y+'%'}} aria-label={item.title} aria-pressed={activeMemory === i} key={item.title} onClick={() => openMemory(i)}><Icon size={19}/></button> })}
          </div>
          <details className="table-list"><summary><List size={18}/>Pilih lewat daftar benda</summary><div className="actions">{data.table.map((item,i) => <button className="quiet" key={item.title} aria-pressed={activeMemory === i} onClick={() => openMemory(i)}>{item.title}</button>)}</div></details>
          <p className="progress" role="status">{found.length} dari {data.table.length} kenangan ditemukan.</p>
          {activeMemory !== null && <div className="note" role="status"><h3>{data.table[activeMemory].title}</h3><p>{data.table[activeMemory].text}</p></div>}
          {found.length === data.table.length && <p className="hand centered">{data.notes.tableDone}</p>}
        </Chapter>
        <Chapter id="kamus" eyebrow="Kamus bahasa sayang">
          <p className="section-description">{data.notes.dictionary}</p>
          <div className="dictionary">{data.dictionary.map((item,i) => <details className="paper-card" key={item.title}><summary><small>{['Yang Ibu katakan','Yang Ibu lakukan','Yang Ibu lakukan','Yang aku lihat'][i]}</small><strong>{item.title}</strong><span>Singkap maknanya <ArrowDown size={15}/></span></summary><p>{item.text}</p></details>)}</div>
          <blockquote>{data.dictionaryNote}</blockquote>
        </Chapter>
        <Chapter id="resep" eyebrow="Buku resep Ibu"><p className="section-description">{data.notes.recipe}</p><RecipeBook/></Chapter>
        <Chapter id="mengaji" eyebrow="Ayat-ayat kebaikan" className="split quran-chapter">
          <Art kind="quran" src={data.images.quran}/><div><Paragraphs values={data.chapters.mengaji.paragraphs}/><blockquote>{data.quranPrayer[0]}</blockquote><p className="hand">{data.quranPrayer[1]}</p></div>
        </Chapter>
        <Chapter id="rantau" eyebrow="Jalan pulang" className="split travel-chapter">
          <Art kind="journey"/><div><Paragraphs values={data.chapters.rantau.paragraphs}/><blockquote>{data.travelQuote}</blockquote></div>
        </Chapter>
        <Chapter id="kenangan" eyebrow="Album kenangan"><Paragraphs values={data.chapters.kenangan.paragraphs}/><Gallery/><p className="hand centered">{data.supportingQuotes[2]}</p></Chapter>
        <Chapter id="surat-kecil" eyebrow="Kotak kenangan"><p className="section-description">{data.notes.small}</p>
          <div className="small-letters">{data.smallLetters.map((item,i) => <details className="paper-card" key={item.title} onToggle={event => {
            if (event.currentTarget.open) {setRead(items => items.includes(i) ? items : [...items,i]); sound(data.audio.paper,paper)}
          }}><summary><Mail size={23}/><strong>{item.title}</strong><span>Buka surat <ArrowDown size={15}/></span></summary><Paragraphs values={item.text.split('\n')}/></details>)}</div>
          {read.length === data.smallLetters.length && <p className="hand centered" role="status">{data.notes.lettersDone}</p>}
        </Chapter>
        <Chapter id="doa" eyebrow="Sebuket doa untuk Ibu"><p className="section-description">{data.notes.garden}</p>
          <div className="garden">{data.prayers.map((item,i) => <button key={item.title} aria-pressed={picked.includes(i)} onClick={() => pick(i)}>{!picked.includes(i) ? <motion.span layoutId={'flower-'+i}><Flower index={i}/></motion.span> : <span className="picked-mark"><Flower2/></span>}<span>{item.title}</span></button>)}</div>
          <p className="progress" role="status">{picked.length} dari {data.prayers.length} bunga telah dipetik.</p>
          {activePrayer !== null && <div className="note" role="status"><h3>{data.prayers[activePrayer].title}</h3><p>{data.prayers[activePrayer].text}</p></div>}
          {picked.length > 0 && <div className="bouquet"><div className="bouquet-flowers">{picked.map((i,index) => <motion.span key={i} layoutId={'flower-'+i} style={{rotate:(index-(picked.length-1)/2)*13}}><Flower index={i}/></motion.span>)}</div><span className="ribbon" aria-hidden="true">୨୧</span></div>}
          {picked.length === data.prayers.length && <Paragraphs values={data.bouquetNote}/>}
          <div className="actions centered"><button disabled={!picked.length} onClick={() => download(() => saveImage('buket',picked))}>Simpan buket doa</button></div>
        </Chapter>
        <Chapter id="surat" eyebrow="Dari anak perempuanmu">
          <div className={'envelope-wrap ' + (letter ? 'unfolded' : '')}><Art kind="envelope"/><div><p className="hand">Untuk {data.motherName || 'Ibu'},<br/>Dari anak perempuanmu yang jarang bilang sayang.</p>
            <button aria-expanded={letter} aria-controls="isi-surat" onClick={letter ? () => setLetter(false) : openLetter}><Mail/>{letter ? 'Tutup surat' : 'Buka suratnya, Bu.'}</button></div></div>
          <AnimatePresence>{letter && <motion.article id="isi-surat" className="letter-paper" initial={{opacity:0,y:-18,scaleY:.95}} animate={{opacity:1,y:0,scaleY:1}} exit={{opacity:0}}>
            <p className="eyebrow">{dateLabel}</p><Paragraphs values={data.letter.map((p,i) => !i && data.motherName ? 'Untuk ' + data.motherName + ' tersayang,' : p)}/>
            {data.daughterName && <p className="hand">{data.daughterName}</p>}
            {voice && <MediaControls kind="audio" src={data.audio.voice} onPlaying={setVoicePlaying}/>}
            <div className="actions"><button onClick={() => download(saveLetter)}>Simpan surat</button><button className="quiet" onClick={() => {setLetter(false); document.querySelector<HTMLButtonElement>('.envelope-wrap button')?.focus()}}>Tutup surat</button></div>
          </motion.article>}</AnimatePresence>
        </Chapter>
        {video && <Chapter id="video" eyebrow="Satu hal lagi"><Paragraphs values={data.chapters.video.paragraphs}/><MediaControls kind="video" src={data.video} onPlaying={setVideoPlaying}/></Chapter>}
        {!data.hidden.includes('penutup') && <motion.section id="penutup" className="ending" initial="rest" whileInView="show" viewport={{once:true,amount:.23}}>
          <div className="ending-photo">{data.images.ending && <OptionalPhoto photo={{src:data.images.ending,alt:'Foto penutup Hari Ibu',caption:''}}/>}</div>
          <div className="ending-copy"><motion.div className="prose-copy" variants={{ show: { transition: { staggerChildren: reduced ? 0 : .16 } } }}>{data.chapters.penutup.paragraphs.map(line => <motion.p key={line} variants={{ rest: {opacity:.65}, show: {opacity:1} }}>{line}</motion.p>)}</motion.div><h2>{data.chapters.penutup.title}.</h2><p className="eyebrow">{dateLabel}</p>
            <div className="ending-quote">{data.endingLines.map(line => <p key={line}>{line}</p>)}</div>
            <p>{data.finalNote}</p><p>{data.endingPrayer[0]}</p><p className="hand">{data.supportingQuotes[4]}</p><p className="hand">{data.endingPrayer[1]}</p>
            <p>Dibuat dengan sepenuh hati,<br/>{data.daughterName || 'Oleh anak perempuanmu.'}</p>
            <div className="actions centered">{!data.hidden.includes('beranda') && <a className="button quiet" href="#beranda"><ArrowUp/>Kembali ke awal</a>}{!data.hidden.includes('surat') && <a className="button quiet" href="#surat" onClick={openLetter}>Baca surat lagi</a>}{!data.hidden.includes('doa') && <a className="button quiet" href="#doa">Lihat buket doa</a>}<button onClick={() => download(() => saveImage('kartu'))}>Simpan kartu ucapan</button></div>
          </div>
        </motion.section>}
      </main>
      <footer><span><House size={16}/> Rumah Ibu</span><button className="quiet" onClick={reset}><RotateCcw/>Mulai dari awal</button></footer>
      {exportError && <div className="toast" role="alert">{exportError}<button className="quiet" aria-label="Tutup pesan" onClick={() => setExportError('')}><X/></button></div>}
    </>}
  </MotionConfig>
}

createRoot(document.getElementById('root')!).render(<App/>)
