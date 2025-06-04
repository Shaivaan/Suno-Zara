interface AlbumPlaylistResponse {
  id: string
  name: string
  description: string
  type: string
  year: number
  playCount: any
  language: string
  explicitContent: boolean
  url: string
  songCount: number
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
    featured: Array<any>
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
  songs: Array<{
    id: string
    name: string
    type: string
    year: string
    releaseDate: string
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
      featured: Array<any>
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
  }>
}
