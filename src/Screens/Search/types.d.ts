interface SongResType{
  id: string
  name: string
  type: string
  year: string
  releaseDate: any
  duration: number
  label: string
  explicitContent: boolean
  playCount: number
  language: string
  hasLyrics: boolean
  lyricsId: any
  url: string
  copyright: string
  album: {
    id: string
    name: string
    url: string
  }
  artists: {
    primary: Array<{
      id: string
      name: string
      role: string
      image: Array<{
        quality: string
        url: string
      }>
      type: string
      url: string
    }>
    featured: Array<{
      id: string
      name: string
      role: string
      image: Array<any>
      type: string
      url: string
    }>
    all: Array<{
      id: string
      name: string
      role: string
      image: Array<{
        quality: string
        url: string
      }>
      type: string
      url: string
    }>
  }
  image: Array<{
    quality: string
    url: string
  }>
  downloadUrl: Array<{
    quality: string
    url: string
  }>
}

interface ArtistResType{
    id: string
    name: string
    role: string
    image:{quality: string,url: string}[],
    type: string
    url: string
}

interface AlbumResType{
    id: string
    name: string
    url: string
    type: string
    language: string
    explicitContent: false,
    image:{quality: string,url: string}[],
}

interface SongListType{
  album:string
  duration:number
  name:string
  artists:string
  image:string
  id:string
  url:string
}
