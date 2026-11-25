import { useState } from 'react'

declare const __AVAILABLE_MEDIA__: string[]

export function hasMedia(path: string) {
  return __AVAILABLE_MEDIA__.includes(path)
}

export function Art({ kind, src, alt = '' }: { kind: string; src?: string; alt?: string }) {
  const [failed, setFailed] = useState('')
  const [loaded, setLoaded] = useState('')
  return <div className={'art art-' + kind}>
    {(!src || failed === src || loaded !== src) && <img src={'/illustrations/' + kind + '.svg'} alt="" loading="lazy" />}
    {src && failed !== src && <img className="personal-photo" src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(src)} onError={() => setFailed(src)} />}
    {kind === 'teacup' && <div className="steam" aria-hidden="true"><i/><i/><i/></div>}
  </div>
}

export const colors = ['#ae685b','#cb9e57','#b47b8a','#8b926b','#9b809d','#d2ac80']

export function Flower({ index }: { index: number }) {
  return <svg viewBox="0 0 80 105" aria-hidden="true">
    <path d="M40 98Q51 74 40 39" stroke="#687a56" strokeWidth="2" fill="none"/>
    <path d="M44 76Q16 76 15 59Q34 58 44 76M44 86Q63 64 72 70Q64 86 44 86" fill="#879273"/>
    {Array.from({length: 6}, (_, petal) => <ellipse key={petal} cx="40" cy="21" rx={index % 2 ? 8 : 11} ry="15" transform={'rotate('+(petal*60)+' 40 41)'} fill={colors[index % colors.length]} />)}
    <circle cx="40" cy="41" r="8" fill="#f4d497"/>
  </svg>
}
